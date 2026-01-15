import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { navigate } from "expo-router/build/global-state/routing";
import ProductDashboard from "@/features/dashboard/ProductDashboard";
import { Colors } from "@/utils/Constants";
import { tokenStorage } from "@/state/storage";

export default function TabOneScreen() {
  const checkTokens = async () => {
    const accessToken = (await tokenStorage.getItem("accessToken")) as string;
    const refreshToken = (await tokenStorage.getItem("refreshToken")) as string;
    console.log(accessToken);
    console.log(refreshToken);
  };
  return (
    <View style={styles.container}>
      <ProductDashboard />
      {/* <View className="flex-row justify-center items-center gap-4">
        <TouchableOpacity
          onPress={() => {
            navigate("/login");
          }}
          style={{
            marginTop: 45,
            padding: 12,
            backgroundColor: Colors.primary,
            borderRadius: 22,
          }}
        >
          <Text style={{ textAlign: "center" }}>Go to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={checkTokens}
          style={{
            marginTop: 45,
            padding: 12,
            backgroundColor: Colors.primary,
            borderRadius: 22,
          }}
        >
          <Text style={{ textAlign: "center" }}>Check Tokens</Text>
        </TouchableOpacity>
      </View> */}
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
