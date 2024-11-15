import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "index",
  search: {
    initialRouteName: "search",
  },
  inbox: {
    initialRouteName: "inbox",
  },
  createNote: {
    initialRouteName: "createNote",
  },
};

export default function DynamicLayout() {
  const router = useRouter();

  function onGoBack() {
    if (router.canGoBack()) {
      router.back();
    }
  }
  return (
    <Stack
      screenOptions={{
        // animation: "none",
        // gestureEnabled: false,
        headerShown: true,
        // statusBarColor: Theme.background,
        headerTitleAlign: "left",
        // headerTitleStyle: {
        //   color: "#fff",
        // },
        // title: "",

        // headerLeft: () => (
        //   <Pressable className="p-3" onPress={onGoBack}>
        //     <Ionicons name="arrow-back" size={24} color={"#"} />
        //   </Pressable>
        // ),
      }}
    />
  );
}
