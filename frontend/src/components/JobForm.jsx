// src/components/JobForm.jsx
import { useState, useEffect } from "react";
import "../styles/form.css";

const JobForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    posting_date: "",
    job_type: "",
    tags: "",
    link: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        posting_date: initialData.posting_date
          ? initialData.posting_date.split("T")[0]
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
    <form onSubmit={handleSubmit} className="job-form">
      <h2>{initialData ? "Edit Job" : "Add Job"}</h2>

      <label>Job Title</label>
      <input name="title" value={formData.title} onChange={handleChange} required />

      <label>Company</label>
      <input name="company" value={formData.company} onChange={handleChange} required />

      <label>Location</label>
      <input name="location" value={formData.location} onChange={handleChange} required />

      <label>Job Type</label>
      <input name="job_type" value={formData.job_type} onChange={handleChange} placeholder="Full-time / Part-time" />

      <label>Link</label>
      <input name="link" value={formData.link} onChange={handleChange} placeholder="https://example.com" />

      <label>Posting Date</label>
      <input type="date" name="posting_date" value={formData.posting_date} onChange={handleChange} />

      <label>Tags</label>
      <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Pricing, Python" />



      <div className="form-buttons">
        <button type="submit">{initialData ? "Update" : "Add"}</button>
        <button type="button" className="cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default JobForm;
