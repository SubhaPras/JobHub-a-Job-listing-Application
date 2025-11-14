import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // ✅ Needed for cookies
});

export const logout = async () => {
  try {
    await API.post("/auth/logout");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

export const checkAuth = async () => {
  try {
    const res = await API.get("/auth/check"); 
    return res.data.user;
  } catch {
    return null;
  }
};
