import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import { Colors } from "@/utils/Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrderList from "./OrderList";
import CustomText from "@/components/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import BillDetails from "./BillDetails";
import { useCartStore } from "@/state/cartStore";
import { useAuthStore } from "@/state/authStore";
import { hocStyles } from "@/styles/GlobalStyles";
import ArrowButton from "@/components/ArrowButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createOrder } from "@/service/OrderService";
import { router } from "expo-router";

const ProductOrder = () => {
  const { cart, clearCart, getTotalPrice } = useCartStore();
  const { user, setCurrentOrder, currentOrder } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);

  const bottomSheetRef = useRef(null);

  // const openSheet = () => bottomSheetRef.current?.present();
  // const closeSheet = () => bottomSheetRef.current?.close();

  const totalItemPrice = getTotalPrice();
  const insets = useSafeAreaInsets();

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
      Alert.alert("Let your first order to be delivered");
      return;
    }

    const formattedData = cart.map((item) => ({
      id: item._id,
      item: item,
      count: item.count,
    }));

    if (formattedData.length === 0) {
      Alert.alert("Add any items to place order");
      return;
    }
    setLoading(true);
    try {
      const data = await createOrder(formattedData, totalItemPrice);

      if (data != null) {
        setCurrentOrder(data);
        clearCart();
        router.push("/(customer)/success");
      } else {
        Alert.alert("There was an error");
        router.push("/(customer)/success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />

        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require("@/assets/assets/icons/coupon.png")}
              style={{ width: 25, height: 25 }}
            />
            <CustomText variant="h6" style={{ fontWeight: 600 }}>
              Use Coupons
            </CustomText>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={RFValue(16)}
            color={Colors.text}
          />
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />

        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant="h8" style={{ fontWeight: 600 }}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={[styles.cancelText, { fontWeight: 600 }]}
            >
              Orders cannot be cancelled once packed for delivery, In case of
              unexpected delays, refund will be provided, if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>

      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require("@/assets/assets/icons/home.png")}
                style={{ width: 20, height: 20 }}
              />
              <View style={{ width: "75%" }}>
                <CustomText variant="h8" style={{ fontWeight: 500 }}>
                  Delivering to Home
                </CustomText>
                <CustomText
                  variant="h9"
                  numberOfLines={2}
                  style={{ opacity: 0.6 }}
                >
                  {user?.address}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity>
              <CustomText
                variant="h8"
                style={{ color: Colors.secondary, fontWeight: 500 }}
              >
                Change {/* Open a popup to change address */}
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentGateway}>
            <View style={{ width: "30%" }}>
              <CustomText fontSize={RFValue(6)}>💶 PAY USING</CustomText>
              <CustomText variant="h9" style={{ marginTop: 2 }}>
                Cash on Delivery
              </CustomText>
            </View>

            <View style={{ width: "70%" }}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title="Place Order"
                onPress={handlePlaceOrder}
              />
            </View>
          </View>

          {/* <View>
            <Button title="Open Modal" onPress={openSheet} />
            <BottomSheetModal ref={bottomSheetRef} snapPoints={["100%"]}>
              <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
                <Text>Bottom Sheet Content</Text>
              </View>
            </BottomSheetModal>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  flexRowBetween: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    borderRadius: 15,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  paymentGateway: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
    paddingTop: 10,
  },
  addressContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === "ios" ? 30 : 10,
  },
});

export default ProductOrder;
