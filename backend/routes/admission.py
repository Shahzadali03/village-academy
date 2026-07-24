from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, joinedload
from config.db import get_db
from Model.admission import Admission
from Model.student import Student
from schemas.admission import AdmissionResponse, AdmissionCreate, AdmissionUpdate
from services.auth.dependencies import get_current_user

router = APIRouter(
    tags = ['Admissions']
)

@router.get('/admissions',response_model=list[AdmissionResponse])
def get_admissions(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        admissions = db.query(Admission).filter(Admission.isActive == True).options(joinedload(Admission.student).joinedload(Student.classes)).all()
        return admissions
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@router.post('/admissions')
def create_admission(admission: AdmissionCreate, db:Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:

        student_result = Student(
                name=admission.student.name,
                father_name=admission.student.father_name,
                age=admission.student.age,
                gender=admission.student.gender,
                class_id=admission.student.class_id,
                phone_number=admission.student.phone_number,
                address=admission.student.address
            )
        
        db.add(student_result)
        db.commit()
        db.refresh(student_result)

        student_id = student_result.id

        new_admission = Admission(
            student_id=student_id,
            admission_date=admission.admission_date,
            previous_school=admission.previous_school,
            guardian_name=admission.guardian_name,
            guardian_number=admission.guardian_number
        )

        db.add(new_admission)
        db.commit()
        db.refresh(new_admission)

        return {'message' : 'Admission created successfully'}
    except SQLAlchemyError as e:
        raise HTTPException(status_code= 500, detail= str(e))
    
@router.put('/admissions/{id}')
def update_admission(id: int, admission: AdmissionUpdate, db:Session=Depends(get_db), current_user=Depends(get_current_user)):
    try:
        student_result = db.query(Student).filter(Student.id == id).first()
        
        student_result.name=admission.student.name
        student_result.father_name=admission.student.father_name
        student_result.age=admission.student.age
        student_result.gender=admission.student.gender
        student_result.class_id=admission.student.class_id
        student_result.phone_number=admission.student.phone_number
        student_result.address=admission.student.address

        db.commit()

        student_id = student_result.id

        admission_result = db.query(Admission).filter(Admission.id == id).first()
        admission_result.student_id=student_id
        admission_result.admission_date=admission.admission_date
        admission_result.previous_school=admission.previous_school
        admission_result.guardian_name=admission.guardian_name
        admission_result.guardian_number=admission.guardian_number
        
        db.commit()
        if admission_result:
            return {'message': 'Admission updated successfully'}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete('/admissions/{id}')
def delete_admission(id: int, db: Session=Depends(get_db), current_user=Depends(get_current_user)):
    try:
        admission_result = db.query(Admission).filter(Admission.id == id).first()
        
        if not admission_result:
            raise HTTPException(status_code=404, detail='Admission not found')
        
        admission_result.isActive = False

        if admission_result.student:
            admission_result.student.isActive = False

        db.commit()
        return {'message': 'Admission deleted successfully'}
    
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))