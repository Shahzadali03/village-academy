from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from Model.authentication import User
from schemas.authentication import UserLogin, UserResponse
from config.db import get_db
from services.auth.utils import verify_password, create_access_token

auth_router = APIRouter(
    tags = ['Authentication']
)

@auth_router.post("/login")
def login(user_login: UserLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter( User.email == user_login.email).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user_login.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    token = create_access_token(
        {
            "user_id": user.id,
            "email": user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserResponse(
            id=user.id,
            email=user.email,
            username=user.email.split("@")[0],
        ),
    }
    
@auth_router.put("/users/{user_id}/change-password")
def change_password(user_id: int, new_password: str, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.password = new_password
        db.commit()
        return {"message": "Password changed successfully"}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))