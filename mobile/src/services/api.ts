import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

export const getCourses = async () => {
  const { data } = await api.get('/courses');
  return data;
};

export const getCourseById = async (id: string) => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};
