import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const deleteComment = async (commentId) => {
    try {   
        return await axios.delete(`${API_URL}/comments/delete/${commentId}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

export const createComment = async (postId, body) => {
    try {
        const response = await axios.post(`${API_URL}/comments/create`,
            {postId, body},
            getAuthHeaders()
        )
        return response.data
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}

export const getAllCommentsOfPost = async (postId) => {
    try {
        const response = await axios.post(`${API_URL}/all-comments/${postId}`,
            getAuthHeaders()
        )
        return response.data
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}