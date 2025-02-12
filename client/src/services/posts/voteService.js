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

// Vote for a post
export const votePost = async (postId, voteType) => {
    try {
        const response = await axios.post(
            `${API_URL}/votes/vote`,
            { postId, voteType },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error voting:", error);
        throw error;
    }
};

// Unvote a post
export const unvotePost = async (postId) => {
    try {
        const response = await axios.delete(`${API_URL}/votes/unvote/${postId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error unvoting:", error);
        throw error;
    }
};

// Update vote (change from upvote to downvote or vice versa)
export const updateVote = async (postId, voteType) => {
    try {
        const response = await axios.put(
            `${API_URL}/votes/update`,
            { postId, voteType },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error updating vote:", error);
        throw error;
    }
};

// Get user's vote on a specific post
export const getUserVote = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/votes/get-user-vote/${postId}`, getAuthHeaders());
        return response.data; // Returns the user's vote type if exists
    } catch (error) {
        console.error("Error fetching user vote:", error);
        throw error;
    }
};


