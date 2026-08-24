import { useState } from "react";
import { AuthContext } from "./auth";

const getSavedAuth = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return token && user ? { user, token } : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getSavedAuth);

  const login = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ user, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, isAuthenticated: Boolean(auth.user && auth.token), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
