from pydantic import BaseModel, ConfigDict
from schemas.inquiry import InquiryResponse
from schemas.admission import AdmissionResponse

class DashboardResponse(BaseModel):
    total_classes: int
    total_students: int
    total_inquiries: int
    total_admission: int
    recent_inquiries: list[InquiryResponse]
    recent_admissions: list[AdmissionResponse]

    model_config = ConfigDict(from_attributes=True)