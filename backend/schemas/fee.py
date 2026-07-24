from pydantic import BaseModel , ConfigDict, Field
from schemas.students import StudentResponse
from datetime import datetime

class FeeSchema(BaseModel):
    month: int
    year: int
    amount: int
    isPaid: bool
    paid_at: datetime | None

class FeeUpdate(BaseModel):
    amount: int | None = Field(default=None, ge=0)
    isPaid: bool | None = None

class FeeResponse(FeeSchema):
    id : int
    student : StudentResponse

    model_config = ConfigDict(from_attributes=True)