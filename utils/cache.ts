import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "./token.interface";

const createTokenCache = (): TokenCache => {
  return {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (err) {
        console.error("SecureStore set item error: ", err);
      }
    },
    async clearToken(key: string) {
      try {
        await SecureStore.deleteItemAsync(key);
        console.log(`Token cleared for key: ${key}`);
      } catch (err) {
        console.error("SecureStore delete item error: ", err);
      }
    },
  };
};

const tokenCache = Platform.OS === "web" ? undefined : createTokenCache();

export default tokenCache;
