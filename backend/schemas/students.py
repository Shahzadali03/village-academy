from pydantic import BaseModel, ConfigDict
from datetime import datetime
from schemas.classes import ClassesResponse

class StudentBase(BaseModel):
    name: str
    father_name: str
    age: int
    gender: str
    class_id: int
    phone_number: str
    address: str

class StudentResponse(StudentBase):
    id: int
    isActive: bool = True
    created_at: datetime
    updated_at: datetime
    classes : ClassesResponse

    model_config = ConfigDict(from_attributes=True)

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass