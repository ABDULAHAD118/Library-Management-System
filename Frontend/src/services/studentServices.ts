import axios from "axios";
const API_URL = import.meta.env.VITE_REST_API_URL;

const createStudent = async (student: any) => {
  const response = await axios.post(`${API_URL}/users`, student, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data.users.filter((student:any)=>!student.deletedAt);
};

const editStudent = async (student: any) => {
  const response = await axios.put(`${API_URL}/users/${student.id}`, student, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const deleteStudent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

export { createStudent, fetchStudents, editStudent, deleteStudent };
