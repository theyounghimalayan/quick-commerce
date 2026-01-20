import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
import { useAuthStore } from "@/state/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "@/components/CustomText";

const LiveHeader: FC<{
  type: "Customer" | "Delivery";
  title: string;
  secondTitle: string;
}> = ({ type, title, secondTitle }) => {
  const isCustomer = type === "Customer";

  const { currentOrder, setCurrentOrder } = useAuthStore();
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (isCustomer) {
              router.push("/(customer)");
              if (currentOrder?.status === "delivered") {
                setCurrentOrder(null);
              }
              return;
            }
            router.push("/(delivery)");
          }}
        >
          <Ionicons
            name="chevron-back"
            size={RFValue(16)}
            color={isCustomer ? "#fff" : "#000"}
          />
        </Pressable>

        <CustomText
          variant="h8"
          style={[
            isCustomer ? styles.titleTextWhite : styles.titleTextBlack,
            { fontWeight: 500 },
          ]}
        >
          {title}
        </CustomText>

        <CustomText
          variant="h4"
          style={[
            isCustomer ? styles.titleTextWhite : styles.titleTextBlack,
            { fontWeight: 600 },
          ]}
        >
          {secondTitle}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  titleTextBlack: {
    color: "black",
  },
  titleTextWhite: {
    color: "white",
  },
});

export default LiveHeader;
