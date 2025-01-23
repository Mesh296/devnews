import axios from "axios";

const API_URL = 'http://localhost:3000/api'; // Update with your backend URL

export const getUserInfo = async (username) => {
    const response = await axios.get(`${API_URL}/users/profile/${username}`)
    return response.data
}