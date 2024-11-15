import RichEdtor from "@/components/editor";
import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const titleRef = useRef<TextInput>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = React.useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <RichEdtor />
    </SafeAreaView>
  );
}
