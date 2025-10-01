// src/components/JobForm.jsx
import { useState, useEffect } from "react";
import "../styles/form.css";

const JobForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    date_posted: "",
    job_type: "",
    tags: "",
    link: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date_posted: initialData.date_posted
          ? initialData.date_posted.split("T")[0]
          : "",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <div className="modal-wrapper">
    <form onSubmit={handleSubmit} className="job-form">
      <h2>{initialData ? "Edit Job" : "Add Job"}</h2>

      {/* Full width */}
      <div className="form-group full">
        <label>Job Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Row: Company + Location */}
      <div className="form-group">
        <label>Company</label>
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {/* Row: Job Type + Posting Date */}
      <div className="form-group">
        <label>Job Type</label>
        <input
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          placeholder="Full-time / Part-time"
        />
      </div>

      <div className="form-group">
        <label>Posting Date</label>
        <input
          type="date"
          name="date_posted"
          value={formData.date_posted}
          onChange={handleChange}
        />
      </div>

      {/* Row: Link + Tags */}
      <div className="form-group">
        <label>Link</label>
        <input
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="form-group">
        <label>Tags</label>
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="JavaScript, Python"
        />
      </div>

      <div className="form-buttons full">
        <button type="submit">{initialData ? "Update" : "Add"}</button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
    </div>
  );
};

export default JobForm;
