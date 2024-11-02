import tokenCache from "@/utils/cache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import { useEffect } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
};

function RootLayoutNav() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey!}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
