from Model.authentication import User
from services.auth.utils import hash_password
from config.db import SessionLocal
from config.settings import ADMIN_EMAIL, ADMIN_PASSWORD

db = SessionLocal()

new_user = User(
    email=ADMIN_EMAIL,
    password=hash_password(ADMIN_PASSWORD),
)

db.add(new_user)
db.commit()
