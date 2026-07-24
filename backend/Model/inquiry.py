from sqlalchemy import String, Integer, Column, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from config.db import Base

class Inquiry(Base):
    __tablename__ = 'inquiries'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(255), nullable=False)
    father_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)
    class_id = Column(Integer, ForeignKey('classes.id'), nullable= False)
    phone_number = Column(String(11), nullable=False)
    address = Column(String(255), nullable=True)
    source = Column(String(255), nullable=False)
    previous_school = Column(String(255), nullable=True)
    isActive = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    classes = relationship(
        "Classes",
        back_populates="Inquiry"
    )