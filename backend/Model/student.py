from sqlalchemy import Column, String, Integer, CheckConstraint, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base
from sqlalchemy.sql import func

class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key = True, nullable=False)
    name = Column(String(255), nullable = False)
    father_name = Column(String(255), nullable = False)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable= False)
    phone_number = Column(String(11), nullable=False)
    address = Column(String(255), nullable=True)
    isActive = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        CheckConstraint("age >= 5 AND age <= 100", name="check_age_range"),
        CheckConstraint("gender IN ('Male', 'Female', 'Other')", name="check_gender")
    )

    admissions = relationship(
        "Admission",
        back_populates="student"
    )

    classes = relationship(
        'Classes',
        back_populates = "students"
    )

    fees = relationship(
        'Fee',
        back_populates="student"
    )