import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const createPost = (postData, token) => axios.post(`${API_URL}/posts`, postData, { headers: { Authorization: token } });
export const getPosts = () => axios.get(`${API_URL}/posts`);
export const editPost = (postId, postData, token) => axios.put(`${API_URL}/posts/${postId}`, postData, { headers: { Authorization: token } });
export const commentOnPost = (postId, commentData, token) => axios.post(`${API_URL}/posts/${postId}/comment`, commentData, { headers: { Authorization: token } });
