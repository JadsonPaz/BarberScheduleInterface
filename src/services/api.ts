import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { notifySessionExpired, SESSION_EXPIRED_MESSAGE } from "./sessionEvents";

const API_BASE_URL = "https://barberschedule-og01.onrender.com";
const AUTH_STORAGE_KEY = "auth";

type StoredAuth = {
  token?: string;
  refreshToken?: string;
  user?: unknown;
};

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

async function getStoredAuth(): Promise<StoredAuth | null> {
  const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  return storedAuth ? JSON.parse(storedAuth) : null;
}

async function saveStoredAuth(auth: StoredAuth) {
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

function getErrorMessage(error: AxiosError) {
  const data = error.response?.data as { body?: { text?: string; message?: string }; message?: string } | undefined;
  return data?.body?.text ?? data?.body?.message ?? data?.message ?? '';
}

function isUnauthorizedError(error: AxiosError) {
  return error.response?.status === 401;
}

function shouldTryRefresh(error: AxiosError, request?: RetriableRequestConfig) {
  const url = request?.url ?? '';
  return isUnauthorizedError(error)
    && !request?._retry
    && !url.includes('/auth/login')
    && !url.includes('/auth/signup')
    && !url.includes('/auth/refresh')
    && !url.includes('/auth/forgot-password')
    && !url.includes('/auth/reset-password');
}

async function clearSession(message = SESSION_EXPIRED_MESSAGE) {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  notifySessionExpired(message);
}

let refreshPromise: Promise<StoredAuth | null> | null = null;

async function refreshAuthToken() {
  const storedAuth = await getStoredAuth();

  if (!storedAuth?.refreshToken) {
    return null;
  }

  const response = await axios.post(API_BASE_URL + '/auth/refresh', {
    refreshToken: storedAuth.refreshToken,
  });

  const body = response.data?.body;

  if (!body?.token) {
    return null;
  }

  const nextAuth: StoredAuth = {
    ...storedAuth,
    token: body.token,
    refreshToken: body.refreshToken ?? storedAuth.refreshToken,
    user: body.user ?? storedAuth.user,
  };

  await saveStoredAuth(nextAuth);
  return nextAuth;
}

api.interceptors.request.use(async (config) => {
  const auth = await getStoredAuth();

  if (auth?.token) {
    config.headers.Authorization = 'Bearer ' + auth.token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (shouldTryRefresh(error, originalRequest)) {
      originalRequest!._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAuthToken().finally(() => {
            refreshPromise = null;
          });
        }

        const refreshedAuth = await refreshPromise;

        if (refreshedAuth?.token && originalRequest) {
          originalRequest.headers.Authorization = 'Bearer ' + refreshedAuth.token;
          return api(originalRequest);
        }
      } catch (refreshError) {
        const refreshStatus = (refreshError as AxiosError).response?.status;

        if (refreshStatus === 400 || refreshStatus === 401) {
          await clearSession();
        }

        return Promise.reject(error);
      }
    }

    if (isUnauthorizedError(error)) {
      await clearSession(getErrorMessage(error) || SESSION_EXPIRED_MESSAGE);
    }

    return Promise.reject(error);
  }
);

export default api;
