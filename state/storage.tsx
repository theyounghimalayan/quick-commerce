// import { MMKV } from "react-native-mmkv";

// export const tokenStorage = new MMKV({
//   id: "token-storage",
//   encryptionKey: "some_secret_key",
// });

// export const storage = new MMKV({
//   id: "my-app-storage",
//   encryptionKey: "some_secret_key",
// });

// export const mmkvStorage = {
//   setItem: (key: string, value: string) => {
//     storage.set(key, value);
//   },
//   getItem: (key: string) => {
//     const value = storage.getString(key);
//     return value ?? null;
//   },
//   removeItem: (key: string) => {
//     storage.delete(key);
//   },
// };

import * as SecureStore from 'expo-secure-store';

// Token storage functions
export const tokenStorage = {
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error saving to SecureStore:', error);
      throw error;
    }
  },
  
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error reading from SecureStore:', error);
      return null;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error deleting from SecureStore:', error);
      throw error;
    }
  },
};

// General app storage (same implementation - SecureStore for all sensitive data)
export const storage = {
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error saving to SecureStore:', error);
      throw error;
    }
  },
  
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error reading from SecureStore:', error);
      return null;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error deleting from SecureStore:', error);
      throw error;
    }
  },
};

// Helper for storing objects (like your original mmkvStorage)
export const secureStorage = {
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  
  getItem: async (key: string) => {
    const value = await SecureStore.getItemAsync(key);
    return value ?? null;
  },
  
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
