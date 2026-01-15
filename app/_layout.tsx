import "react-native-reanimated";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuthStore } from "@/state/authStore";
import { tokenStorage } from "@/state/storage";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import { refetchUser, refresh_tokens } from "@/service/authService";
import * as Location from "expo-location";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Geolocation.setRNConfiguration({
//   skipPermissionRequests: false,
//   authorizationLevel: "always",
//   enableBackgroundLocationUpdates: true,
//   locationProvider: "auto",
// });

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Location permission denied");
  }
};

interface DecodedToken {
  exp: number;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  console.log("hello from the app");

  const { user, setUser } = useAuthStore();
  console.log(user);

  const router = useRouter();

  const tokenCheck = async () => {
    const accessToken = (await tokenStorage.getItem("accessToken")) as string;
    const refreshToken = (await tokenStorage.getItem("refreshToken")) as string;

    console.log("checking the tokens", accessToken, refreshToken);
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        router.replace("/(auth)/login");
        Alert.alert("Session Expired", "Please login again");
        return false;
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          await refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {}
        console.log(error);
        Alert.alert("There was an error in refreshing token!");
        return false;
      }

      if (user?.role === "Customer") {
        router.replace("/(customer)");
      } else {
        router.replace("/(delivery)");
      }
      return true;
    }
    router.replace("/(auth)/login");
    return false;
  };

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  useEffect(() => {
    const appStartup = async () => {
      try {
        // GeoLocation.requestAuthorization();
        await requestLocationPermission();
        await tokenCheck();
        SplashScreen.hideAsync();
      } catch (error) {
        Alert.alert(
          "Permission Required",
          "Sorry we need location service to give you better shopping experience"
        );
      }
    };

    const timeoutId = setTimeout(appStartup, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(delivery)" options={{ headerShown: false }} />
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
