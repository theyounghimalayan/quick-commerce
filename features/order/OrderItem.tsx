import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/utils/Constants";
import CustomText from "@/components/CustomText";
import UniversalAdd from "@/components/UniversalAdd";

const OrderItem: FC<{ item: any }> = ({ item }) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item?.item?.image }} style={styles.img} />
      </View>

      <View style={{ width: "55%" }}>
        <CustomText numberOfLines={2} variant="h8" style={{ fontWeight: 500 }}>
          {item?.item?.name}
        </CustomText>
        <CustomText variant="h9">{item?.item?.quantity}</CustomText>
      </View>

      <View style={{ width: "20%", alignItems: "flex-end" }}>
        <UniversalAdd item={item.item} />
        <CustomText
          variant="h8"
          style={{
            alignSelf: "flex-end",
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          ₹{item?.count * item?.item?.price}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: "17%",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 0.6,
    borderTopColor: Colors.border,
  },
});

export default OrderItem;
