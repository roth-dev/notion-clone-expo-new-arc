import DraggableListNotes from "@/components/home/DraggableListNotes";
import RecentNotes from "@/components/home/RecentNotes";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NestableScrollContainer>
        <RecentNotes />
        <DraggableListNotes />
      </NestableScrollContainer>
    </SafeAreaView>
  );
}
