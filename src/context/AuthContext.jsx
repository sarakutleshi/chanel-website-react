
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Keep login state after page refresh
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Login
  const login = (userData = null) => {
    localStorage.setItem("isLoggedIn", "true");

    // Optional: save user information
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }

    setIsLoggedIn(true);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

