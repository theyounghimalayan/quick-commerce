import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
import { useCartStore } from "@/state/cartStore";
import { Colors } from "@/utils/Constants";
import CustomText from "./CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const UniversalAdd: FC<{ item: any }> = ({ item }) => {
  const count = useCartStore((state) => state.getItemCount(item._id));
  const { addItem, removeItem } = useCartStore();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: count === 0 ? "#fff" : Colors.secondary },
      ]}
    >
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.add}>
          <CustomText
            variant="h9"
            style={[styles.addText, { fontWeight: 600 }]}
          >
            ADD
          </CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={() => removeItem(item._id)}>
            <MaterialCommunityIcons
              name="minus"
              color="#fff"
              size={RFValue(13)}
            />
          </Pressable>
          <CustomText variant="h8" style={[styles.text, { fontWeight: 600 }]}>
            {count}
          </CustomText>

          <Pressable onPress={() => addItem(item)}>
            <MaterialCommunityIcons
              name="plus"
              color="#fff"
              size={RFValue(13)}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.backgroundSecondary,
    width: 65,
    borderRadius: 8,
  },
  add: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  addText: {
    color: Colors.secondary,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
});

export default UniversalAdd;
