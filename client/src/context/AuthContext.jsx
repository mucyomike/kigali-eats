import { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("kigalieats_token");
    const savedUser = localStorage.getItem("kigalieats_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { token: newToken, _id, name, role } = response.data;

    const userData = { _id, name, email, role };

    localStorage.setItem("kigalieats_token", newToken);
    localStorage.setItem("kigalieats_user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);

    return userData;
  };

  // Register function
  const register = async (name, email, password, phone) => {
    const response = await authAPI.register({ name, email, password, phone });
    const { token: newToken, _id, role } = response.data;

    const userData = { _id, name, email, role, phone };

    localStorage.setItem("kigalieats_token", newToken);
    localStorage.setItem("kigalieats_user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);

    return userData;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("kigalieats_token");
    localStorage.removeItem("kigalieats_user");
    setUser(null);
    setToken(null);
  };

  // Computed value: is user an admin?
  const isAdmin = user?.role === "admin";

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
