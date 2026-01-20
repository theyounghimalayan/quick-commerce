import { View, Text, StyleSheet } from "react-native";
import React, { FC, useEffect } from "react";
import { useAuthStore } from "@/state/authStore";
import LottieView from "lottie-react-native";
import { screenWidth } from "@/utils/Scaling";
import { Colors } from "@/utils/Constants";
import CustomText from "@/components/CustomText";
import { router } from "expo-router";

const OrderSuccess: FC = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace("/(customer)/map");
    }, 2300);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/confirm.json")}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.LottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        variant="h8"
        style={[styles.orderPlaceText, { fontWeight: 600 }]}
      >
        ORDER PLACED
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          style={[styles.deliveryText, { fontWeight: 600 }]}
        >
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        variant="h8"
        style={[styles.addressText, { fontWeight: 500 }]}
      >
        {user?.address || "Somewhere, Knowhere😁"}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  LottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    width: "80%",
    textAlign: "center",
    marginTop: 10,
  },
});

export default OrderSuccess;
