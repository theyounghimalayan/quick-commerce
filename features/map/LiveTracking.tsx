import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authStore";
import { getOrderById } from "@/service/OrderService";
import { Colors } from "@/utils/Constants";
import LiveHeader from "./LiveHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "@/components/CustomText";
import OrderSummary from "./OrderSummary";

const LiveTracking = () => {
  const { currentOrder, setCurrentOrder } = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any);
    setCurrentOrder(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  let msg = "Packing your order";
  let time = "Arriving in 10 minutes";
  if (currentOrder?.status === "confirmed") {
    msg = "Arriving Soon";
    time = "Arriving in 6 minutes";
  } else if (currentOrder?.status === "delivered") {
    msg = "Order Delivered";
    time = "Fastest Delivery";
  }

  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={currentOrder?.deliveryPartner ? "phone" : "shopping"}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{ width: "82%" }}>
            <CustomText
              numberOfLines={1}
              variant="h7"
              style={{ fontWeight: 600 }}
            >
              {currentOrder?.deliveryPartner?.name ||
                "We will soon assign a delivery partner"}
            </CustomText>

            {currentOrder?.deliveryPArtner && (
              <CustomText variant="h7" style={{ fontWeight: 500 }}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomText>
            )}

            <CustomText variant="h9" style={{ fontWeight: 500 }}>
              {currentOrder?.deliveryPartner
                ? "For Delivery instructions you can contact here"
                : msg}
            </CustomText>
          </View>
        </View>

        <OrderSummary order={currentOrder} />

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>

          <View style={{ width: "82%" }}>
            <CustomText variant="h7" style={{ fontWeight: 600 }}>
              Do you like our app?
            </CustomText>
            <CustomText variant="h9" style={{ fontWeight: 500 }}>
              Hit the like and subscribe button
            </CustomText>
          </View>
        </View>

        <CustomText
          variant="h6"
          style={{ opacity: 0.6, marginTop: 20, fontWeight: 600 }}
        >
          Reliability Delivery App
        </CustomText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LiveTracking;
