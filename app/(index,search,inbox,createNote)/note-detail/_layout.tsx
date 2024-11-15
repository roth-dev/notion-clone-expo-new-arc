import Edtor from "@/components/editor";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, Text } from "react-native";

export default function Layout() {
  const router = useRouter();
  const param = useLocalSearchParams<{ title: string }>();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Stack.Screen
        options={{
          title: " ",
          headerBackTitle: param.title,
          headerLeft: (props) => {
            return (
              <Pressable
                onPress={() => router.back()}
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Ionicons name="chevron-back-sharp" size={24} />
                <Text style={{ fontSize: 16 }}>{props.label}</Text>
              </Pressable>
            );
          },
        }}
      />
      <Edtor />
    </SafeAreaView>
  );
}
