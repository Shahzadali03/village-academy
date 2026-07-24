from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, case
from sqlalchemy.orm import joinedload, Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from Model.fee import Fee
from Model.student import Student
from config.db import get_db
from schemas.fee import FeeResponse, FeeUpdate
from services.auth.dependencies import get_current_user

fee_router = APIRouter(
    tags = ['Fees']
)


def ensure_current_month_fees(db: Session, month: int, year: int):
    now = datetime.now()
    if month != now.month or year != now.year:
        return

    students = db.query(Student).filter(Student.isActive == True).all()

    for student in students:
        fee = db.query(Fee).filter(
            Fee.student_id == student.id,
            Fee.month == month,
            Fee.year == year
        ).first()

        if not fee:
            db.add(
                Fee(
                    student_id=student.id,
                    month=month,
                    year=year,
                    amount=4000,
                    isPaid=False
                )
            )

    db.commit()


def get_monthly_fee_stats(db: Session, month: int, year: int):
    collection = (
        db.query(func.sum(Fee.amount))
        .filter(Fee.month == month, Fee.year == year, Fee.isPaid == True)
        .scalar()
    ) or 0

    pending = (
        db.query(func.sum(Fee.amount))
        .filter(Fee.month == month, Fee.year == year, Fee.isPaid == False)
        .scalar()
    ) or 0

    paid_count = (
        db.query(func.count(Fee.id))
        .filter(Fee.month == month, Fee.year == year, Fee.isPaid == True)
        .scalar()
    ) or 0

    total_count = (
        db.query(func.count(Fee.id))
        .filter(Fee.month == month, Fee.year == year)
        .scalar()
    ) or 0

    return {
        "month": month,
        "year": year,
        "collection": int(collection),
        "pending": int(pending),
        "paid_count": int(paid_count),
        "total_count": int(total_count),
    }


@fee_router.get("/fees/monthly", response_model=list[FeeResponse])
def monthly_fees(
    month: int,
    year: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        ensure_current_month_fees(db, month, year)

        fees = (
            db.query(Fee)
            .filter(Fee.month == month, Fee.year == year)
            .options(joinedload(Fee.student).joinedload(Student.classes))
            .all()
        )

        return fees
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@fee_router.get("/fees/current", response_model=list[FeeResponse])
def current_month_fees(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    now = datetime.now()
    return monthly_fees(now.month, now.year, db, current_user)
    
@fee_router.patch("/fees/{id}")
def update_fee(
    id: int,
    update: FeeUpdate = FeeUpdate(),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        fee = db.query(Fee).filter(Fee.id == id).first()

        if not fee:
            raise HTTPException(
                status_code=404,
                detail="Fee not found"
            )

        if update.amount is not None:
            fee.amount = update.amount

        if update.isPaid is not None:
            fee.isPaid = update.isPaid
            fee.paid_at = datetime.now() if update.isPaid else None
        elif update.amount is None:
            fee.isPaid = not fee.isPaid
            fee.paid_at = datetime.now() if fee.isPaid else None

        db.commit()
        db.refresh(fee)

        return {
            "message": "Fee updated successfully",
            "isPaid": fee.isPaid,
            "amount": fee.amount,
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@fee_router.get("/fees/collection")
def monthly_collection(
    month: int,
    year: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_monthly_fee_stats(db, month, year)


@fee_router.get("/fees/collection/months")
def collection_months(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        paid_sum = func.coalesce(
            func.sum(case((Fee.isPaid == True, Fee.amount), else_=0)),
            0
        )
        pending_sum = func.coalesce(
            func.sum(case((Fee.isPaid == False, Fee.amount), else_=0)),
            0
        )

        rows = (
            db.query(
                Fee.month,
                Fee.year,
                paid_sum.label('collection'),
                pending_sum.label('pending'),
                func.count(Fee.id).label('total_count'),
            )
            .group_by(Fee.month, Fee.year)
            .order_by(Fee.year.desc(), Fee.month.desc())
            .all()
        )

        now = datetime.now()
        results = []
        seen = set()

        for row in rows:
            seen.add((row.month, row.year))
            results.append({
                "month": row.month,
                "year": row.year,
                "collection": int(row.collection or 0),
                "pending": int(row.pending or 0),
                "total_count": int(row.total_count or 0),
            })

        if (now.month, now.year) not in seen:
            results.insert(0, {
                "month": now.month,
                "year": now.year,
                "collection": 0,
                "pending": 0,
                "total_count": 0,
            })

        return results
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))