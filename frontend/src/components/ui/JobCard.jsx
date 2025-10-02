import React from "react";
import "../../styles/JobCard.css";
 import { FaRegTrashCan,FaLocationDot  } from "react-icons/fa6";
 import { FaRegEdit,FaRegCalendarAlt,FaRegClock,FaRegBuilding  } from "react-icons/fa";

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="job-card">
      {/* Top bar with Edit/Delete */}
      <div className="job-toolbar">
        <button onClick={() => onEdit(job)} className="icon-btn edit"><FaRegEdit /></button>
        <button onClick={() => onDelete(job.id)} className="icon-btn delete"><FaRegTrashCan /></button>
      </div>

      {/* Header */}
      <div className="job-header">
        <h2 className="job-title">{job.title}</h2>
      </div>

      {/* Company + Location */}
      <p className="job-company"><FaRegBuilding />{job.company}</p>
      <p className="job-location"> <FaLocationDot />{`${job.location} | ${job.job_type ?? "Full-time"} `} </p>

      {/* Dates */}
      <div className="job-meta">
        <span><FaRegCalendarAlt /> {job.date_posted}</span>
      </div>

      {/* Tags */}
      <div className="job-tags">
        {job.tags?.map((tag, idx) => (
          <span key={idx} className="tag">{tag}</span>
        ))}
      </div>

      {/* Apply Button */}
      <div className="apply-section">
        <button 
          className="btn apply" 
          onClick={() => window.open(job.link, "_blank")}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;