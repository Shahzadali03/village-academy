from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from config.db import get_db
from services.auth.dependencies import get_current_user
from Model.session import Session
from schemas.session import SessionCreate, SessionResponse, SessionUpdate

session_router = APIRouter(
    tags = ['Session']
)

@session_router.get('/session')
def get_session(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        result = db.query(Session).all()
        return {
            "session" : result,
            "message" : "Session Retrive Successfuly"
        }
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@session_router.post("/session")
def add_session(sessions : SessionCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        print(type(sessions))
        print(sessions)
        newSession = Session(
            session = sessions.session
        )

        db.add(newSession)
        db.commit()
        db.refresh(newSession)
        
        return {"message" : "Session Create Successfully"}

    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@session_router.put('/session/{id}')
def update_classes(id : int, session : SessionUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        getSession = db.query(Session).filter(Session.id == id).first()

        if not getSession:
            raise HTTPException(status_code = 404, detail = 'Session not found')

        getSession.session = session.session
        db.commit()

        return {"message" : "Session Update Successfully"}
    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@session_router.delete('/session/{id}')
def delete_classes(id : int, db : Session= Depends(get_db), current_user = Depends(get_current_user)):
    try:
        getSession = db.query(Session).filter(Session.id == id).first()
        if not getSession:
            raise HTTPException(status_code = 404, detail = "Session not found")
        
        db.delete(getSession)
        db.commit()

        return {"message" : "Session delete successfully"}

    except SQLAlchemyError as e:
        raise HTTPException(status_code = 500, detail = str(e))