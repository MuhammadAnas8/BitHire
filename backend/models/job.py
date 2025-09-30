from datetime import date
from db import db

class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, index=True)
    company = db.Column(db.String(200), nullable=False, index=True)
    location = db.Column(db.String(200), nullable=False, index=True)
    date_posted = db.Column(db.Date, default=date.today, index=True)
    link = db.Column(db.String(500), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "date_posted": self.date_posted.isoformat() if self.date_posted else None,
            "link": self.link,
        }
