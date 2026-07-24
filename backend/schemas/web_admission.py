from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class WebAdmissionCreate(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=255)
    father_name: str = Field(..., min_length=2, max_length=255)
    phone: str = Field(..., min_length=7, max_length=20)
    email: str | None = None
    address: str | None = None
    admission_category: Literal['tuition', 'professional']
    class_applying: str | None = None
    course_name: str | None = None
    preferred_batch: str | None = None
    previous_school: str | None = None
    message: str | None = None


class WebAdmissionResponse(BaseModel):
    id: int
    student_name: str
    father_name: str
    phone: str
    email: str | None = None
    address: str | None = None
    admission_category: str
    class_applying: str | None = None
    course_name: str | None = None
    preferred_batch: str | None = None
    previous_school: str | None = None
    message: str | None = None
    isActive: bool
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
