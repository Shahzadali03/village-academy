from pydantic import BaseModel, ConfigDict
from schemas.session import SessionResponse
from datetime import datetime

class ClassesSchema(BaseModel):
    name: str

class ClassesCreate(ClassesSchema):
    session_id : int
    pass

class ClassesResponse(ClassesSchema):
    id: int
    session: SessionResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ClassesUpdate(ClassesSchema):
    pass