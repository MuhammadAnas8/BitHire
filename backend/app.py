from flask import Flask, jsonify
from config import Config
from db import db
from routes.job_routes import job_blueprint
from flask_cors import CORS

def create_app() -> Flask:
    app = Flask(__name__)
    # CORS(app)
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)

    db.init_app(app)

    with app.app_context():
        db.create_all()  # creates the 'jobs' table if not present

    app.register_blueprint(job_blueprint)

    @app.get("/")
    def health():
        return jsonify({"status": "ok", "service": "bithire-backend"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
