import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const NUM_ITEMS = 5;
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

export default function RecentNotes() {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Stack.Screen options={{ headerShown: false }} />
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(index)/note-detail",
              params: {
                title: item.label + " " + "React Native",
              },
            })
          }
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem]}
        >
          <View
            style={{
              backgroundColor: item.backgroundColor,
              flex: 1,
              width: "100%",
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
            }}
          ></View>
          <View style={{ padding: 5 }}>
            <Text style={styles.text} numberOfLines={2}>
              {item.label}-React Native
            </Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View className="flex-1">
      <View className="p-3">
        <Text>Jump back in</Text>
      </View>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    backgroundColor: "#fff",
  },
  text: {
    flex: 0,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
});
