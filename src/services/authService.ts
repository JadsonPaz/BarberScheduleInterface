import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export default function useAuthServices() {
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (formData: any) => {
    try {
      setAuthLoading(true);

      const response = await api.post("/auth/login", formData);
      const result = response.data;

      if (result.success && result.body?.token) {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            token: result.body.token,
            refreshToken: result.body.refreshToken,
            user: result.body.user,
          })
        );

        return result.body;
      }
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (formData: any) => {
    try {
      setAuthLoading(true);

      const response = await api.post("/auth/signup", formData);
      const result = response.data;

      if (result.success && result.body?.token) {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            token: result.body.token,
            refreshToken: result.body.refreshToken,
            user: result.body.user,
          })
        );

        return result.body;
      }
    } catch (error) {
      console.log("Signup error:", error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setAuthLoading(true);

      const response = await api.post("/auth/forgot-password", { email });
      return response.data?.body;
    } catch (error) {
      console.log("Forgot password error:", error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const resetPassword = async (formData: { token: string; newPassword: string }) => {
    try {
      setAuthLoading(true);

      const response = await api.post("/auth/reset-password", formData);
      return response.data?.body;
    } catch (error) {
      console.log("Reset password error:", error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    const data = await AsyncStorage.getItem("auth");
    const refreshToken = data ? JSON.parse(data)?.refreshToken : null;

    await AsyncStorage.removeItem("auth");

    if (refreshToken) {
      api.post("/auth/logout", { refreshToken }).catch(() => undefined);
    }
  };

  const getAuth = async () => {
    const data = await AsyncStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  };

  return { login, signup, forgotPassword, resetPassword, logout, getAuth, authLoading };
}
