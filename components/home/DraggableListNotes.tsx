import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Collapsible } from "../Collapsible";
import { ThemedView } from "../ThemedView";
import { useBottomTabOverflow } from "../ui/TabBarBackground.ios";

const NUM_ITEMS = 10;
export function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

export type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

export const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + "",
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

export default function DraggableListNotes() {
  const paddingBottom = useBottomTabOverflow();
  const [data, setData] = useState(initialData);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      // <ScaleDecorator>
      // <TouchableOpacity
      //   onLongPress={drag}
      //   disabled={isActive}
      //   style={[styles.row]}
      // >
      <Collapsible title="Untitled">
        <Collapsible title="This sub item" isChild>
          <Collapsible title="This sub item" isChild>
            <Collapsible title="This sub item" isChild>
              <Collapsible title="This sub item" isChild>
                <Collapsible title="This sub item" isChild></Collapsible>
              </Collapsible>
            </Collapsible>
          </Collapsible>
        </Collapsible>
      </Collapsible>
      // </TouchableOpacity>
      // </ScaleDecorator>
    );
  };

  return (
    <ThemedView
      lightColor="transparent"
      style={{
        paddingBottom: paddingBottom,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          gap: 10,
        }}
      >
        <Text>Private</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          margin: 10,
          backgroundColor: "#FFF",
        }}
      >
        <DraggableFlatList
          data={data}
          nestedScrollEnabled
          scrollEnabled={false}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: 0.2,
  },
  text: {
    flex: 0,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
});
