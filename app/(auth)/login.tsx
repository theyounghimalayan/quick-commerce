// import { View, Text, StyleSheet, TextInput } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Login = () => {
//   return (
//     <SafeAreaView
//       style={{
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor:"lightpurple"
//       }}
//     >
//       <Text style={styles.title}>Login</Text>
//       <TextInput style={styles.textInput} placeholder="enter your username" />
//       <TextInput
//         style={[styles.textInput, { marginTop: 20 }]}
//         placeholder="enter your password"
//       />
//     </SafeAreaView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 28,
//     textAlign: "center",
//     fontWeight: 500,
//   },
//   textInput: {
//     textAlign: "center",
//     marginHorizontal: "auto",
//     marginTop: 50,
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 8,
//     padding: 8,
//     width: "80%",
//   },
// });

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomText from "@/components/CustomText";
import ProductSlider from "@/components/login/ProductSlider";
import { customerLogin } from "@/service/authService";
import { Colors, lightColors } from "@/utils/Constants";
import { resetAndNavigate } from "@/utils/NavigationUtils";
import useKeyboardOffsetHeight from "@/utils/useKeyboardOffsetHeight";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  Animated,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const bottomColors = [...lightColors].reverse();

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    router.replace("/");
    if (!username.trim() || !password.trim()) {
      // Alert.alert("Error", "Please enter both username and password");
      return;
    }

    // Add your login logic here (API call, navigation, etc.)
    // Alert.alert("Success", `Welcome, ${username}!`);
  };

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNumber);
      console.log("Login successfull");
      router.replace("/(customer)" as any);
    } catch (error) {
      Alert.alert("Login Failed", "Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >

    // <KeyboardAwareScrollView
    //   bounces={false}
    //   contentContainerStyle={[
    //     styles.scrollContent,
    //     { paddingTop: insets.top, paddingBottom: insets.bottom },
    //   ]}
    //   enableAutomaticScroll={false}
    //   // keyboardDismissMode="on-drag"
    //   keyboardShouldPersistTaps="handled"
    // >
    <ScrollView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 80,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <ProductSlider />

      <Animated.ScrollView
        bounces={false}
        style={{ transform: [{ translateY: animatedValue }] }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.subContainer}
      >
        <LinearGradient
          colors={bottomColors as [string, string, ...string[]]}
          style={styles.gradient}
        />
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/logo.jpeg")}
            style={styles.logo}
          />
          <CustomText variant="h2">Grocery Delivery App</CustomText>
          <CustomText variant="h5" style={styles.text}>
            Log in or Sign up
          </CustomText>
          <CustomInput
            onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
            value={phoneNumber}
            placeholder="Enter phone number"
            inputMode="numeric"
            onClear={() => setPhoneNumber("")}
            left={
              <CustomText style={styles.phoneText} variant="h6">
                +91
              </CustomText>
            }
            style={{
              paddingLeft: 10,
              marginLeft: 10,
            }}
          />
          <CustomButton
            disabled={phoneNumber?.length != 10}
            onPress={() => handleAuth()}
            loading={loading}
            title="continue"
          />
        </View>
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} >
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} >
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} >
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} >
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} >
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} >
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <CustomText
            fontSize={10}
            style={{ textAlign: "center", paddingBottom: 20 }}
          >
            By Continuing, you agree to our Terms of Service & Privacy Policy
          </CustomText>
        </View>
      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.absoluteSwitch}
        onPress={() => router.replace("/(auth)/delivery-login")}
      >
        <MaterialCommunityIcons
          name="bike-fast"
          color="#000"
          size={RFValue(20)}
        />
      </TouchableOpacity>
    </ScrollView>
  );
  {
    /* </KeyboardAwareScrollView> */
  }
  {
    /* </KeyboardAvoidingView> */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    // marginBottom: 80,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeText: {
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  gradient: {
    width: "100%",
    paddingTop: 60,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  footer: {
    width: "100%",
    borderColor: Colors.border,
    borderTopWidth: 0.8,
    padding: 10,
    // zIndex: 22,
    // position: "absolute",
    bottom: 0,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneText: {
    marginLeft: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  absoluteSwitch: {
    position: "absolute",
    // top: Platform.OS === "ios" ? 40 : 10,
    right: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: 50,
    zIndex: 99,
  },
});
