import os
from dotenv import load_dotenv

load_dotenv()  # loads .env in this folder

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    if not SQLALCHEMY_DATABASE_URI:
        raise RuntimeError("DATABASE_URL is missing in .env")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
