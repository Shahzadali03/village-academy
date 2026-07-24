from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from config.db import get_db
from Model.web_admission import WebAdmission
from schemas.web_admission import WebAdmissionCreate, WebAdmissionResponse
from services.auth.dependencies import get_current_user

router = APIRouter(tags=['Web Admissions'])


@router.post('/web-admissions/public', response_model=dict)
def create_web_admission(application: WebAdmissionCreate, db: Session = Depends(get_db)):
    try:
        if application.admission_category == 'tuition' and not application.class_applying:
            raise HTTPException(status_code=400, detail='Class applying is required for tuition admissions')

        if application.admission_category == 'professional':
            if not application.course_name:
                raise HTTPException(status_code=400, detail='Course name is required for professional admissions')
            if not application.preferred_batch:
                raise HTTPException(status_code=400, detail='Preferred batch is required for professional admissions')

        new_application = WebAdmission(
            student_name=application.student_name.strip(),
            father_name=application.father_name.strip(),
            phone=application.phone.strip(),
            email=application.email,
            address=application.address,
            admission_category=application.admission_category,
            class_applying=application.class_applying,
            course_name=application.course_name,
            preferred_batch=application.preferred_batch,
            previous_school=application.previous_school,
            message=application.message,
            isActive=True,
        )

        db.add(new_application)
        db.commit()
        db.refresh(new_application)

        return {
            'message': 'Admission application submitted successfully',
            'id': new_application.id,
        }
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/web-admissions', response_model=list[WebAdmissionResponse])
def get_web_admissions(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        applications = (
            db.query(WebAdmission)
            .filter(WebAdmission.isActive == True)
            .order_by(WebAdmission.created_at.desc())
            .all()
        )
        return applications
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/web-admissions/{application_id}', response_model=WebAdmissionResponse)
def get_web_admission_by_id(
    application_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        application = (
            db.query(WebAdmission)
            .filter(WebAdmission.id == application_id, WebAdmission.isActive == True)
            .first()
        )

        if not application:
            raise HTTPException(status_code=404, detail='Web admission not found')

        return application
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete('/web-admissions/{application_id}')
def delete_web_admission(
    application_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        application = db.query(WebAdmission).filter(WebAdmission.id == application_id).first()

        if not application:
            raise HTTPException(status_code=404, detail='Web admission not found')

        application.isActive = False
        db.commit()

        return {'message': 'Web admission deleted successfully'}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
