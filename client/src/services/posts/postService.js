import axios from "axios";

const API_URL = 'http://localhost:3000/api';

export const getAllPost = async() => {
    const posts = await axios.get(`${API_URL}/posts/all`)
    return posts.data
}