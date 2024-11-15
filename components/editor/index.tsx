import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

export default function Edtor() {
  const richText = React.useRef<RichEditor>(null);
  const titleRef = useRef<TextInput>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [text, setText] = React.useState("");

  return (
    <>
      <ScrollView
        nestedScrollEnabled
        className="bg-white p-5 gap-5"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ flexDirection: "row", padding: 10, gap: 10 }}>
          <Text>Add icon</Text>
          <Text>Add cover</Text>
          <Text>Add commnet</Text>
        </View>
        <View className="flex-1 gap-2">
          <TextInput
            value={title}
            ref={titleRef}
            // autoFocus
            placeholder="New page"
            placeholderTextColor="#CCC"
            onChangeText={setTitle}
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginHorizontal: 10,
            }}
          />
          <RichEditor
            ref={richText}
            // useContainer={false}
            autoCorrect
            scrollEnabled={false}
            initialHeight="100%"
            initialContentHTML={content}
            placeholder="Tab here to continue"
            onError={(err) => console.log(err)}
            onChange={setContent}
            style={{ backgroundColor: "transparent", opacity: 1 }}
          />
        </View>
      </ScrollView>
      <KeyboardAccessoryView inSafeAreaView alwaysVisible={false}>
        <ScrollView
          horizontal
          contentContainerStyle={{ flex: 1, backgroundColor: "#FFF" }}
        >
          <RichToolbar
            style={{
              backgroundColor: "#FFF",
            }}
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.code,
              actions.blockquote,
              actions.table,
              actions.checkboxList,
              actions.keyboard,
              actions.insertOrderedList,
              actions.undo,
              actions.redo,
            ]}

            // iconMap={{ [actions.heading1]: handleHead }}
          />
        </ScrollView>
      </KeyboardAccessoryView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
