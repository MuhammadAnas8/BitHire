from datetime import datetime, date
from flask import Blueprint, jsonify, request, abort
from models.job import Job
from db import db   

job_bp = Blueprint("jobs", __name__, url_prefix="/jobs")

@job_bp.get("")
def list_jobs():

    query = Job.query

    title = request.args.get("title")
    if title:
        query = query.filter(Job.title.ilike(f"%{title}%"))

    company = request.args.get("company")
    if company:
        query = query.filter(Job.company.ilike(f"%{company}%"))

    location = request.args.get("location")
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    posted_after = request.args.get("posted_after")
    if posted_after:
        try:
            dt = datetime.strptime(posted_after, "%Y-%m-%d").date()
            query = query.filter(Job.date_posted >= dt)
        except ValueError:
            abort(400, description="posted_after must be YYYY-MM-DD")

    # simple pagination (defaults)
    page = int(request.args.get("page", 1))
    per_page = min(int(request.args.get("per_page", 20)), 100)

    pagination = query.order_by(Job.date_posted.desc()) \
                      .paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "items": [item.to_dict() for item in pagination.items],
        "page": pagination.page,
        "per_page": pagination.per_page,
        "total": pagination.total,
        "pages": pagination.pages,
    })

@job_bp.get("/<int:job_id>")
def get_job(job_id: int):
    job = Job.query.get_or_404(job_id)
    return jsonify(job.to_dict())


@job_bp.post("/")
def create_job():
    data = request.get_json(force=True) or {}

    # validate required fields
    for field in ["title", "company", "location", "link"]:
        if field not in data or not str(data[field]).strip():
            abort(400, description=f"Missing required field: {field}")

    # parse date_posted if provided
    if "date_posted" in data:
        try:
            posted_date = datetime.strptime(data["date_posted"], "%Y-%m-%d").date()
        except ValueError:
            abort(400, description="date_posted must be YYYY-MM-DD")
    else:
        posted_date = date.today()

    # create and save
    job = Job(
        title=data["title"].strip(),
        company=data["company"].strip(),
        location=data["location"].strip(),
        link=data["link"].strip(),
        date_posted=posted_date,
    )
    db.session.add(job)
    db.session.commit()

    return jsonify("Success: ",job.to_dict()), 201


# ... list_jobs + get_job + create_job ...

@job_bp.route("/<int:job_id>", methods=["PUT", "PATCH"])
def update_job(job_id: int):
    """
    Update a job by ID.
    Accepts JSON body with any fields to update:
    {
      "title": "Updated Title",
      "company": "New Company",
      "location": "Updated Location",
      "link": "https://new-link.com",
      "date_posted": "2025-09-30"
    }
    """
    job = Job.query.get_or_404(job_id)
    data = request.get_json(force=True) or {}

    if "title" in data:
        job.title = data["title"].strip()
    if "company" in data:
        job.company = data["company"].strip()
    if "location" in data:
        job.location = data["location"].strip()
    if "link" in data:
        job.link = data["link"].strip()
    if "date_posted" in data:
        try:
            job.date_posted = date.fromisoformat(data["date_posted"])
        except ValueError:
            abort(400, description="date_posted must be YYYY-MM-DD")

    db.session.commit()
    return jsonify(job.to_dict())

@job_bp.route("/<int:job_id>", methods=["DELETE"])
def delete_job(job_id: int):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": f"Job {job_id} deleted successfully"})

