import axios from "axios";

const API_URL = import.meta.env.VITE_REST_API_URL;

export const fetchDepartments = async () => {
  const result = await axios.get(`${API_URL}/departments`);
  return result.data.departments.filter(
    (department: any) => !department.deletedAt
  );
};

export const createDepartment = async (department: string) => {
  const result = await axios.post(`${API_URL}/departments`, {
    name: department,
  });
  return result.data;
};

export const deleteDepartment = async (id: string) => {
  const result = await axios.delete(`${API_URL}/departments/${id}`);
  return result.data;
};

export const searchDepartments = async (search: string) => {
  const response = await axios.get(`${API_URL}/departments/search`, {
    params: { search },
  });
  return response.data.departments.filter((dept: any) => !dept.deletedAt);
};
