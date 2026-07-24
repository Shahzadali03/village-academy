from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, joinedload
from config.db import get_db
from Model.student import Student
from Model.admission import Admission
from Model.inquiry import Inquiry
from schemas.dashboard import DashboardResponse
from Model.classes import Classes
from services.auth.dependencies import get_current_user

dashboard_router = APIRouter(
    tags = ['Dashboard']
)

@dashboard_router.get('/dashboard-stats', response_model=DashboardResponse)
def get_dashboard_stat(db:Session = Depends(get_db), current_user=Depends(get_current_user),):
    try:
        class_count = db.query(Classes).count()
        student_count = db.query(Student).filter(Student.isActive == True).count()
        admission_count = db.query(Admission).filter(Admission.isActive == True).count()
        inquiry_count = db.query(Inquiry).filter(Inquiry.isActive == True).count()
        recent_inquiries = (
            db.query(Inquiry)
            .filter(Inquiry.isActive == True)
            .options(joinedload(Inquiry.classes))
            .order_by(Inquiry.created_at.desc())
            .limit(5)
            .all()
        )
        recent_admissions = (
            db.query(Admission)
            .filter(Admission.isActive == True)
            .options(joinedload(Admission.student).joinedload(Student.classes))
            .order_by(Admission.id.desc())
            .limit(5)
            .all()
        )
        return {
            "total_students" : student_count,
            "total_classes" : class_count,
            "total_inquiries" : inquiry_count,
            "total_admission" : admission_count,
            "recent_inquiries": recent_inquiries,
            "recent_admissions": recent_admissions,
        }
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))