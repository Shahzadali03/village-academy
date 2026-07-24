from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from config.db import Base

class Session(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key = True, nullable = False)
    session = Column(String(255), nullable = False)

    classes = relationship(
        "Classes",
        back_populates = "session"
    )