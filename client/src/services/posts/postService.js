import axios from "axios";

const API_URL = 'http://localhost:3000/api';

export const getAllPost = async () => {
    const posts = await axios.get(`${API_URL}/posts/all`);
    return posts.data;
};

export const getPostsByUser = async (userId) => {
    const posts = await axios.get(`${API_URL}/posts/user/${userId}`);
    return posts.data;
};

export const getPostById = async (postId) => {
    const post = await axios.get(`${API_URL}/posts/post/${postId}`);
    return post.data;
};

export const searchPosts = async (query) => {
    const posts = await axios.get(`${API_URL}/posts/search?q=${query}`);
    return posts.data;
};

export const createPost = async (postData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.post(`${API_URL}/posts/create`, postData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const updatePost = async (postId, postData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.put(`${API_URL}/posts/update/${postId}`, postData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const deletePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    return await axios.delete(`${API_URL}/posts/delete/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};