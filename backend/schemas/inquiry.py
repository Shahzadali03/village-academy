from pydantic import BaseModel, ConfigDict
from datetime import datetime
from schemas.classes import ClassesResponse

class InquirySchema(BaseModel):
    name: str
    father_name: str
    age: int
    gender: str
    class_id: int
    phone_number: str
    address: str 
    source: str
    previous_school: str | None = None
    isActive: bool = True

class InquiryAdd(InquirySchema):
    pass

class InquiryResponse(InquirySchema):
    id: int
    classes: ClassesResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class InquiryUpdate(InquirySchema):
    pass