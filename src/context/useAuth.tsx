import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import Constants from "expo-constants";
import { useRouter } from "next/router";
import { IDecodedToken, IUser } from "@/types";
import APIEndPoints from "@/lib/constants/APIEndPoints";

interface AuthContextType {
  isLoggedIn: boolean;
  user: IUser | null;
  accessToken: string | null;
  login: (userData: IUser, accessToken: string) => void;
  logout: () => void;
  decodedCurrenToken: IDecodedToken | null;
  isLoading: boolean;
  isInitialized: boolean;
  isValidToken: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [decodedCurrenToken, setDecodedCurrentToken] =
    useState<IDecodedToken | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);

  const router = useRouter();

  const login = async (userData: IUser, accessToken: string) => {
    try {
      setIsLoading(true);
      setIsLoggedIn(true);
      setUser(userData);
      setAccessToken(accessToken);

       localStorage.setItem("user", JSON.stringify(userData));
       localStorage.setItem("accessToken", accessToken);
      console.log("setItem accessToken", accessToken);

      const decode = jwtDecode(accessToken);
      setDecodedCurrentToken(decode as IDecodedToken);
      setIsValidToken(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setIsLoggedIn(false);
      setUser(null);
      setAccessToken(null);
      setDecodedCurrentToken(null);

       localStorage.removeItem("user");
       localStorage.removeItem("accessToken");
      setIsValidToken(false);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (token: string): Promise<string | null> => {
    console.log("refreshToken called with token:", token ? "exists" : "null");

    if (!token) {
      console.log("No token provided to refreshToken");
      return null;
    }

    try {
      const response = await axios.post(
        `${
          Constants.expoConfig?.extra?.apiUrl ?? "https://api.grip-academy.ir"
        }${APIEndPoints.postRefreshTokenEndpoint}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-source": "client-native",
            "x-lang": "fa",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Refresh successful", response.data);
        const result = response.data.result;
        console.log("Refresh successful", result?.isValid);

        return result?.isValid || token;
      }
      return null;
    } catch (error: any) {
      console.log("Error in refresh token:", error.message);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const [storedUserData, storedAccessToken] = await Promise.all([
          localStorage.getItem("user"),
          localStorage.getItem("accessToken"),
        ]);

        console.log("storedAccessToken", storedAccessToken);

        if (!storedAccessToken || !storedUserData) {
          console.log("No token or user data found, logging out");
          await logout();
          return;
        }

        // Validate the token
        const isTokenValid = await refreshToken(storedAccessToken);
        console.log("isTokenValid", isTokenValid);

        if (!isTokenValid) {
          console.log("Token is invalid, logging out");
          await logout();
          return;
        }

        // Token is valid, set up the auth state
        try {
          const parsedUser = JSON.parse(storedUserData);
          if (parsedUser) {
            setIsLoggedIn(true);
            setUser(parsedUser);
            setAccessToken(storedAccessToken);
            const decode = jwtDecode(storedAccessToken);
            setDecodedCurrentToken(decode as IDecodedToken);
            setIsValidToken(true); // This is the key line!
            console.log("Auth initialized successfully");
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          await logout();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        await logout();
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Navigation effect - only run after initialization
  useEffect(() => {
    if (isInitialized) {
      console.log("isValidToken22", isValidToken);
      if (isValidToken && isLoggedIn) {
        router.push("/");
      } else {
        router.push("auth-user");
      }
    }
  }, [isValidToken, isInitialized, isLoggedIn]);

  // Debug log (optional)
  useEffect(() => {
    console.log("Auth State:", { isLoggedIn, user, isInitialized, isLoading });
  }, [isLoggedIn, user, isInitialized, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        accessToken,
        decodedCurrenToken,
        isLoading,
        isInitialized,
        isValidToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
