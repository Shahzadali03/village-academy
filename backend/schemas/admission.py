from datetime import date, datetime
from schemas.students import StudentResponse, StudentCreate
from pydantic import BaseModel, ConfigDict

class AdmissionBase(BaseModel):
    admission_date: date
    previous_school: str | None = None
    guardian_name: str
    guardian_number: str

class AdmissionResponse(AdmissionBase):
    id: int
    isActive: bool
    student: StudentResponse
    created_at: datetime
    updated_at: datetime    

    model_config = ConfigDict(from_attributes=True)
    
class AdmissionCreate(AdmissionBase):
    student: StudentCreate
    pass

class AdmissionUpdate(AdmissionBase):
    student: StudentCreate
    pass


