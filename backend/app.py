from flask import Flask, jsonify
from config import Config
from db import db
from routes.job_routes import job_bp
from flask_cors import CORS
from models.job import Job  # ensure model is registered before create_all()

def create_app() -> Flask:
    app = Flask(__name__)
    # CORS(app)
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)

    db.init_app(app)

    with app.app_context():
        db.create_all()  # creates the 'jobs' table if not present

    app.register_blueprint(job_bp)

    @app.get("/")
    def health():
        return jsonify({"status": "ok", "service": "bitbash-backend"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
