from pydantic import BaseModel, ConfigDict

class SessionSchema(BaseModel):
    session : str

class SessionCreate(SessionSchema):
    pass

class SessionResponse(SessionSchema):
    id: int

    model_config = ConfigDict(from_attributes=True)

class SessionUpdate(SessionSchema):
    id: int