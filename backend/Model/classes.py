from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from config.db import Base

class Classes(Base):
    __tablename__ = 'classes'

    id = Column(Integer, primary_key = True, nullable=False)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable= False)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone = True), server_default = func.now(), nullable = False)
    updated_at = Column(DateTime(timezone = True), server_default = func.now(), onupdate = func.now())

    session = relationship(
        'Session',
        back_populates = "classes"
    )

    students = relationship(
        "Student",
        back_populates="classes"
    )

    Inquiry = relationship(
        'Inquiry',
        back_populates="classes"
    )