from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import SQLAlchemyError
from config.db import get_db
from services.auth.dependencies import get_current_user
from Model.classes import Classes
from schemas.classes import ClassesCreate, ClassesUpdate

class_router = APIRouter(
    tags = ['Classes']
)

@class_router.get('/classes')
def get_classes(db : Session = Depends(get_db), current_user = Depends(get_current_user) ):
    try:
        result = db.query(Classes).options(joinedload(Classes.session)).all()
        return{
        "classes": result,
        "message" : "Classes Retrive Successfully"
        }
    except SQLAlchemyError as e:
        raise HTTPException(state_code = 500 , detail = str(e))
    
@class_router.post('/classes')
def create_classes(classes : ClassesCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        newClass = Classes(
            name = classes.name,
            session_id = classes.session_id
        )
        db.add(newClass)
        db.commit()
        db.refresh(newClass)

        return { "message": "Class Add Successfully" }
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500 ,detail = str(e))
    
@class_router.put('/classes/{id}')
def update_classes(id : int, classes : ClassesUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        getClass = db.query(Classes).filter(Classes.id == id).first()

        if not getClass:
            raise HTTPException(status_code = 404, detail = 'Class not found')

        getClass.name = classes.name
        db.commit()

        return {"message" : "Class Update Successfully"}
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@class_router.delete('/classes/{id}')
def delete_classes(id : int, db : Session= Depends(get_db), current_user = Depends(get_current_user)):
    try:
        getClass = db.query(Classes).filter(Classes.id == id).first()
        if not getClass:
            raise HTTPException(status_code = 404, detail = "Class not found")
        
        db.delete(getClass)
        db.commit()

        return {"message" : "Class delete successfully"}

    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
