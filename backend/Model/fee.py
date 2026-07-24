from sqlalchemy import Column, Boolean, Integer, ForeignKey, DateTime
from config.db import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Fee(Base):
    __tablename__ = 'Fees'
    id = Column(Integer, primary_key = True, nullable = True)
    student_id = Column(Integer, ForeignKey('students.id'), nullable = False)
    month = Column(Integer, nullable = False)
    year = Column(Integer, nullable = False)
    amount = Column(Integer, nullable=True)
    isPaid = Column(Boolean, default=False)
    paid_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone = True), server_default = func.now())

    student = relationship(
        'Student',
        back_populates = 'fees'
    )