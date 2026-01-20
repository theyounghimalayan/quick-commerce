import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/utils/Constants";
import { useCartStore } from "@/state/cartStore";
import CustomText from "@/components/CustomText";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const cartItems = useCartStore((state) => state.cart);
  const totalItems = cartItems?.reduce(
    (total, cartItem) => total + cartItem?.count,
    0
  );
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
          <Image
            source={require("@/assets/assets/icons/clock.png")}
            style={styles.img}
          />
        </View>
        <View>
          <CustomText variant="h5" style={{ fontWeight: 600 }}>
            Delivery in 12 minutes
          </CustomText>
          <CustomText variant="h8" style={{ opacity: 0.5, fontWeight: 600 }}>
            Shipment of {totalItems || 0} item
          </CustomText>
        </View>
      </View>

      {cartItems?.map((item) => {
        return <OrderItem key={item?._id} item={item}/>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default OrderList;
