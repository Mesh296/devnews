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