"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthResponse } from "@/services/authService";

interface UserData {
  login_id: number;
  user_id: number;
  full_name: string;
  email: string;
  mobile: string;
  role_id?: number;
  company_name?: string;
  profile_image?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  user: UserData | null;
  login: (token: string, rawUserData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user_data");
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    }
    setIsAuthLoading(false);
  }, []);

  const login = (token: string, rawUserData: any) => {
    // Map backend user object (LoginMaster or User) or accept already mapped UserData
    const mappedUser: UserData = {
      login_id: rawUserData.login_id !== undefined ? rawUserData.login_id : (rawUserData.LoginId || rawUserData.user_id || rawUserData.id || 0),
      user_id: rawUserData.user_id !== undefined ? rawUserData.user_id : (rawUserData.UserId || rawUserData.id || 0),
      full_name: rawUserData.full_name || rawUserData.userName || rawUserData.UserName || "User",
      email: rawUserData.email || rawUserData.EmailId || "",
      mobile: rawUserData.mobile || rawUserData.Mobile || "",
    };

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(mappedUser));
    setIsLoggedIn(true);
    setUser(mappedUser);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
