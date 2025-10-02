from datetime import datetime, date
from flask import Blueprint, jsonify, request, abort
from models.job import Job
from db import db

# Blueprint for job routes
job_blueprint = Blueprint("jobs", __name__, url_prefix="/jobs")


# -------------------------
# GET: List Jobs (with filters + pagination)
# -------------------------
@job_blueprint.get("/")
def list_jobs():
    """List all jobs with optional filters, sorting, and pagination."""
    query = Job.query

    # ---- Filtering ----
    title = request.args.get("title")
    if title:
        query = query.filter(Job.title.ilike(f"%{title}%"))

    company = request.args.get("company")
    if company:
        query = query.filter(Job.company.ilike(f"%{company}%"))

    location = request.args.get("location")
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    job_type = request.args.get("job_type")
    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))

    posted_after = request.args.get("posted_after")
    if posted_after:
        try:
            dt = datetime.strptime(posted_after, "%Y-%m-%d").date()
            query = query.filter(Job.date_posted >= dt)
        except ValueError:
            abort(400, description="posted_after must be YYYY-MM-DD")

    # ---- Sorting ----
    sort_by = request.args.get("sort_by", "date_posted")   # default
    sort_order = request.args.get("sort_order", "desc")    # default

    if sort_by == "title":
        column = Job.title
    else:
        column = Job.date_posted

    if sort_order == "asc":
        query = query.order_by(column.asc())
    else:
        query = query.order_by(column.desc())

    # ---- Pagination ----
    page = int(request.args.get("page", 1))
    per_page = min(int(request.args.get("per_page", 15)), 100)

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "items": [job.to_dict() for job in pagination.items],
        "page": pagination.page,
        "per_page": pagination.per_page,
        "total": pagination.total,
        "pages": pagination.pages,
    })




# -------------------------
# GET: Single Job
# -------------------------
@job_blueprint.get("/<int:job_id>")
def get_job(job_id: int):
    """Get a single job by ID."""
    job = Job.query.get_or_404(job_id)
    return jsonify(job.to_dict())


# -------------------------
# POST: Create Job
# -------------------------
@job_blueprint.post("")
def create_job():
    """Create a new job posting."""
    data = request.get_json(force=True) or {}

    # Normalize tags input (string -> list, list -> cleaned list)
    tags_input = data.get("tags")
    if isinstance(tags_input, str):
        tags_list = [tag.strip() for tag in tags_input.split(",") if tag.strip()]
    elif isinstance(tags_input, list):
        tags_list = [str(tag).strip() for tag in tags_input if str(tag).strip()]
    else:
        tags_list = []

    # Validate required fields
    for field in ["title", "company", "location", "link"]:
        if not str(data.get(field, "")).strip():
            abort(400, description=f"Missing required field: {field}")

    # Parse date_posted
    if "date_posted" in data:
        try:
            posted_date = datetime.strptime(data["date_posted"], "%Y-%m-%d").date()
        except ValueError:
            abort(400, description="date_posted must be YYYY-MM-DD")
    else:
        posted_date = date.today()

    # Create and save job
    job = Job(
        title=data["title"].strip(),
        company=data["company"].strip(),
        location=data["location"].strip(),
        link=data["link"].strip(),
        date_posted=posted_date,
        job_type=data.get("job_type", "").strip() or None,
        tags=tags_list,
    )
    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job created successfully", "job": job.to_dict()}), 201


# -------------------------
# PUT/PATCH: Update Job
# -------------------------
@job_blueprint.route("/<int:job_id>", methods=["PUT", "PATCH"])
def update_job(job_id: int):
    """Update an existing job by ID."""
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
    if "tags" in data:
        job.tags = data["tags"]
    if "job_type" in data:
        job.job_type = data["job_type"]
    

    db.session.commit()
    return jsonify(job.to_dict())


# -------------------------
# DELETE: Remove Job
# -------------------------
@job_blueprint.route("/<int:job_id>", methods=["DELETE"])
def delete_job(job_id: int):
    """Delete a job by ID."""
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return jsonify(
        {
            "message": f"Job {job_id} deleted successfully"
         })
