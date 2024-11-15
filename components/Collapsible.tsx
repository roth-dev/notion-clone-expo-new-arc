import { PropsWithChildren, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import useLayoutAnimation from "@/hooks/useLayoutAnimation";

interface CollapsibleProps {
  title: string;
  isChild?: boolean;
}

export function Collapsible({
  children,
  title,
  isChild,
}: PropsWithChildren<CollapsibleProps>) {
  const { configureNext } = useLayoutAnimation();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  function handleCollaps() {
    configureNext();
    setIsOpen((value) => !value);
  }

  const borderStyle: ViewStyle = isChild
    ? {
        paddingTop: 15,
      }
    : {
        borderBottomColor: "#DDD",
        borderBottomWidth: 0.5,
        padding: 10,
        paddingVertical: 15,
      };

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingRight: isChild ? 0 : 10,
        ...borderStyle,
      }}
    >
      <TouchableOpacity
        style={styles.heading}
        onPress={handleCollaps}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
          {title}
        </ThemedText>
        <Pressable>
          <IconSymbol
            name="plus"
            size={18}
            weight="medium"
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
        </Pressable>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
