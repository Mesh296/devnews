import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories/all`)
        return response.data;
    } catch (error) {
        console.error("Error getting categories:", error);
        throw error;
    }
}