from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from config.db import Base

class Admission(Base):
    __tablename__ = 'admissions'

    id = Column(Integer, primary_key=True, nullable=False)
    student_id = Column(Integer, ForeignKey('students.id'), nullable=False)
    admission_date = Column(Date, nullable=False)
    previous_school = Column(String(255), nullable=True)
    guardian_name = Column(String(255), nullable=False)
    guardian_number = Column(String(20), nullable=False)
    isActive = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    student = relationship(
        "Student",
        back_populates="admissions"
    )