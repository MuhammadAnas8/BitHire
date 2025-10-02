import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
});

export const fetchAllJobs = async (params = {}) => {
  const { data } = await api.get("/jobs", { params });
  return data;
};
export const fetchOneJob = async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
}
export const createJob = async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
}
export const updateJob = async (id, jobData) => {
    console.log(`Update job with ID: ${id} data is: `, jobData);
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
}
export const deleteJob = async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
}
   


