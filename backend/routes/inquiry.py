from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import SQLAlchemyError
from config.db import get_db
from Model.inquiry import Inquiry
from schemas.inquiry import InquirySchema, InquiryAdd, InquiryResponse, InquiryUpdate
from services.auth.dependencies import get_current_user
from Model.student import Student

router = APIRouter(
    tags = ['Inquiries']
)

@router.get('/inquiries')
def get_inquiries(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        inquiries = db.query(Inquiry).filter(Inquiry.isActive == True).options(joinedload(Inquiry.classes)).all()
        return inquiries
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@router.post('/inquiries')
def create_inquiry(inquiry: InquiryAdd, db:Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        new_inquiry = Inquiry(
            name = inquiry.name,
            father_name = inquiry.father_name,
            age = inquiry.age,
            gender = inquiry.gender,
            class_id = inquiry.class_id,
            phone_number = inquiry.phone_number,
            address = inquiry.address,
            source = inquiry.source,
            previous_school = inquiry.previous_school,
            isActive = True
        )
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)

        return {'message' : 'Inquiry created successfully'}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code= 500, detail= str(e))
    
# @router.get('/inquiries/{id}')
# def get_inquiry_by_id(id: int):
#     try:
#         inquiry = connection.execute(Inquiry.__table__.select().where(Inquiry.id == id))
#         result = inquiry.fetchone()
#         if result:
#             return dict(result._mapping)
#     except SQLAlchemyError as e:
#         raise HTTPException(status_code= 500, detail= str(e))
    
@router.put('/inquiries/{id}')
def update_inquiry(id: int, inquiry: InquiryUpdate, db:Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        result = db.query(Inquiry).filter(Inquiry.id == id).first()
        if not result:
            raise HTTPException(status_code=404, detail='Inquiry not found')
        
        result.name = inquiry.name
        result.father_name = inquiry.father_name
        result.age = inquiry.age
        result.gender = inquiry.gender
        result.class_id = inquiry.class_id
        result.phone_number = inquiry.phone_number
        result.address = inquiry.address
        result.previous_school = inquiry.previous_school
        db.commit()

        return {'message' : 'Inquiry updated successfully'}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code= 500, detail= str(e))

@router.delete('/inquiries/{id}')
def delete_inquiry(id: int, db:Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        get_student = db.query(Inquiry).filter(Inquiry.id == id).first()
        
        if not get_student:
            raise HTTPException(status_code=404, detail='Inquiry not found')
            
        get_student.isActive = False
        db.commit()
        return {'message' : 'Inquiry deleted successfully'}
    except SQLAlchemyError as e:
        raise HTTPException(status_code= 500, detail= str(e))