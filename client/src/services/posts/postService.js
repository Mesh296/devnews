import axios from "axios";

const API_URL = 'http://localhost:3000/api';

export const getAllPost = async() => {
    const posts = await axios.get(`${API_URL}/posts/all`)
    return posts.data
}

export const getPostsByUser = async(userId) => {
    const posts = await axios.get(`${API_URL}/posts/user/${userId}`)
    return posts.data
}

export const deletePost = async (postId) => {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("No authentication token found");

    return await axios.delete(`${API_URL}/posts/delete/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
};