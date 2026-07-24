from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, joinedload
from config.db import get_db
from Model.student import Student
from schemas.students import StudentCreate, StudentResponse, StudentUpdate
from services.auth.dependencies import get_current_user

router = APIRouter(
    tags = ['Students']
)

@router.get('/students')
def get_students(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        students = db.query(Student).filter(Student.isActive == True).options(joinedload(Student.classes)).all()
        return students
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))

@router.post('/students')
def create_student(student : StudentCreate, db:Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        new_student = Student(
            name = student.name,
            father_name = student.father_name,
            age = student.age,
            gender = student.gender,
            class_id = student.class_id,
            phone_number = student.phone_number,
            address = student.address,
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return {'message' : 'Student create successfully'}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code= 500, detail= str(e))
    
    
@router.get('/students/{id}')
def get_student_by_id(id: int, db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    try:
        student = db.query(Student).filter(Student.id == id)
        result = student.first()
        if not result:
            raise HTTPException(
                status_code = 404,
                detail = "Student not found"
            )
        return result
    except SQLAlchemyError as e:
        raise HTTPException(status_code= 500, detail= str(e))
    
@router.put('/students/{id}')
def update_student(
    id: int,
    student: StudentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        existing_student = db.query(Student).filter( Student.id == id).first()

        if not existing_student:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        existing_student.name = student.name
        existing_student.father_name = student.father_name
        existing_student.age = student.age
        existing_student.gender = student.gender
        existing_student.class_id = student.class_id
        existing_student.phone_number = student.phone_number
        existing_student.address = student.address

        db.commit()

        return {
            "message": "Student updated successfully"
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    
@router.delete('/students/{id}')
def delete_student(id: int, db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    try:
        filterStudent = db.query(Student).filter(Student.id == id).first()
        if not filterStudent:
            raise HTTPException(status_code=404, detail='Student not found')
        
        filterStudent.isActive = False
        db.commit()
        return {'message' : 'Student deleted successfully'}
    except SQLAlchemyError as e:
        raise HTTPException(status_code= 500, detail= str(e))