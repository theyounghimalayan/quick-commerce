import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { navigate } from "expo-router/build/global-state/routing";
import ProductDashboard from "@/features/dashboard/ProductDashboard";
import { Colors } from "@/utils/Constants";

export default function TabOneScreen() {
  return (
    <View>
      <ProductDashboard />
      <TouchableOpacity
        onPress={() => {
          navigate("/delivery-login");
        }}
        style={{
          marginTop: 45,
          marginHorizontal: "auto",
          padding: 24,
          backgroundColor: Colors.primary,
          borderRadius: 22,
          width: "80%",
        }}
      >
        <Text>Go to Delivery Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate("/(auth)/login");
        }}
        style={{
          marginTop: 45,
          marginHorizontal: "auto",
          padding: 24,
          backgroundColor: Colors.primary,
          borderRadius: 22,
          width: "80%",
        }}
      >
        <Text>Go to Customer Login</Text>
      </TouchableOpacity>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
