import "../global.css";
import "react-native-reanimated";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { HapticTab } from "@/components/HapticTab";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // // initialize database
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       await initializeDatabase();
  //     } catch {}
  //     setIsLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: BlurTabBarBackground,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: "absolute",
                },
                default: {},
              }),
            }}
          >
            <Tabs.Screen
              name="(index)"
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={28} name="house.fill" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(search)"
              options={{
                title: "Search",
                tabBarIcon: ({ color }) => (
                  <Ionicons size={28} name="search" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(inbox)"
              options={{
                title: "Inbox",
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={28} name="paperplane.fill" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(createNote)"
              options={{
                title: "New",
                tabBarIcon: ({ color }) => (
                  <Ionicons size={28} name="add" color={color} />
                ),
              }}
            />
          </Tabs>
        </ThemeProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}
