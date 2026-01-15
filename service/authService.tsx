import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@/state/storage";
import { useAuthStore } from "@/state/authStore";
import { router } from "expo-router";
import { appAxios } from "./apiInterceptors";

export const customerLogin = async (phone: string) => {
  try {
    console.log("sending request");
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    console.log("login request successful");
    const { accessToken, refreshToken, customer } = response.data;
    console.log("tokens", accessToken, refreshToken);
    // tokenStorage.set("accessToken", accessToken);
    // tokenStorage.set("refreshToken", refreshToken);
    await tokenStorage.setItem("accessToken", accessToken);
    await tokenStorage.setItem("refreshToken", refreshToken);
    console.log("saved tokens");
    const { setUser } = useAuthStore.getState();
    setUser(customer);
    console.log(customer);
  } catch (error) {
    console.log(error);
    console.error("Login Error", error);
    throw Error("error");
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    console.log("login request successful");
    const { accessToken, refreshToken, deliveryPartner } = response.data;
    // tokenStorage.set("accessToken", accessToken);
    // tokenStorage.set("refreshToken", refreshToken);
    await tokenStorage.setItem("accessToken", accessToken);
    await tokenStorage.setItem("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.error("Login Error", error);
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = await tokenStorage.getItem("refreshToken");
    console.log(refreshToken);
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    await tokenStorage.setItem("accessToken", new_access_token);
    await tokenStorage.setItem("refreshToken", new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log("REFRESH TOKEN ERROR", error);
    await tokenStorage.removeItem("accessToken");
    await tokenStorage.removeItem("refreshToken");
    router.replace("/(auth)/login");
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get("/user");
    setUser(response.data.user);
  } catch (error) {
    console.log("Login error", error);
  }
};

export const updateUserLocation = async (data: any, setUser: any) => {
  try {
    const response = await appAxios.patch("/user", data);
    await refetchUser(setUser);
  } catch (error) {
    console.log("update User Location Error", error);
  }
};
