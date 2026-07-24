from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.students import router
from routes.admission import router as admission_router
from routes.inquiry import router as inquiry_router
from routes.auth.authentication import auth_router
from routes.dashboard import dashboard_router
from routes.classes import class_router
from routes.session import session_router
from routes.fee import fee_router
from routes.web_admission import router as web_admission_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(class_router)
app.include_router(session_router)
app.include_router(router)
app.include_router(inquiry_router)
app.include_router(admission_router)
app.include_router(fee_router)
app.include_router(web_admission_router)