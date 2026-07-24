from sqlalchemy import String, Integer, Column, Boolean, DateTime, Text
from sqlalchemy.sql import func
from config.db import Base


class WebAdmission(Base):
    __tablename__ = 'web_admissions'

    id = Column(Integer, primary_key=True, nullable=False)
    student_name = Column(String(255), nullable=False)
    father_name = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255), nullable=True)
    address = Column(String(255), nullable=True)
    admission_category = Column(String(50), nullable=False)
    class_applying = Column(String(255), nullable=True)
    course_name = Column(String(255), nullable=True)
    preferred_batch = Column(String(100), nullable=True)
    previous_school = Column(String(255), nullable=True)
    message = Column(Text, nullable=True)
    isActive = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
