import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
});
// export default api;

export const fetchAllJobs = async () => {
    const response = await api.get("/jobs");
    return response.data;
}

export const fetchOneJob = async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
}
export const createJob = async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
}
export const updateJob = async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
}
export const deleteJob = async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
}
   


