import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState } from "react";
import { deliveryLogin } from "@/service/authService";
import { useRouter } from "expo-router";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import { screenHeight } from "@/utils/Scaling";
import LottieView from "lottie-react-native";
import CustomText from "@/components/CustomText";
import CustomInput from "@/components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "@/components/CustomButton";

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      router.replace("/(delivery)");
      // await deliveryLogin(email, password);
    } catch (error) {
      Alert.alert("Login Failed", "Please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require("@/assets/animations/delivery_man.json")}
              hardwareAccelerationAndroid
            />
          </View>

          <CustomText variant="h3" style={{ fontWeight: 700 }}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h6" style={styles.text}>
            Faster than Flast⚡
          </CustomText>

          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Ionicons
                name="mail"
                color="#F8890E"
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Ionicons
                name="key-sharp"
                color="#F8890E"
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            placeholder="Password"
            right={false}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!showPassword}
          />
          <View style={{ marginLeft: 10, marginRight: "auto" }}>
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <Ionicons name="eye-off" color="#000" size={RFValue(18)} />
              ) : (
                <Ionicons name="eye" color="#000" size={RFValue(18)} />
              )}
            </TouchableOpacity>
          </View>

          <CustomButton
            disabled={email.length === 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: "100%",
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
