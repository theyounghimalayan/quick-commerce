import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import ScalePress from "../ScalePress";
import { router } from "expo-router";
import CustomText from "../CustomText";

const CategoryContainer: FC<{ data: any }> = ({ data }) => {
  const renderItems = (items: any[]) => {
    return items?.map((item, index) => {
      return (
        <ScalePress
          key={index}
          style={styles.item}
          onPress={() => router.push("/(customer)/categories")}
        >
          <View style={styles.imageContainer}>
            <Image source={item?.image} style={styles.image} />
          </View>
          <CustomText style={[styles.text, { fontWeight: 500 }]} variant="h8">
            {item?.name}
          </CustomText>
        </ScalePress>
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 25,
  },
  text: {
    textAlign: "center",
  },
  item: {
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    backgroundColor: "#esf3f3",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CategoryContainer;
