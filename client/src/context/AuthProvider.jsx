import React, { createContext, useContext, useState, useEffect } from "react";
import { logout, getUserData } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserData();
                setUser(userData);
            } catch (error) {
                logout();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [])

    const loginUser = (userData) => setUser(userData);
    const logoutUser = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);