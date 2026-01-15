import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { FC, useEffect } from "react";
import { useAuthStore } from "@/state/authStore";
import * as Location from "expo-location";
import { reverseGeocode } from "@/service/mapService";
import CustomText from "../CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  const { user, setUser } = useAuthStore();

  const updateUserLocation = () => {
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //   },
    //   (err) => console.log(err),
    //   {
    //     enableHightAccuracy:false,
    //     timeout:15000,
    //   }
    // );

    const getCurrentLocation = async () => {
      // Request permission
      try {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === "denied") {
          Alert.alert(
            "Location required",
            "Please enable location from settings"
          );
        } else if (status !== "granted") {
          throw new Error("Location permission denied");
        }

        // Get location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 15000, // Android only
        });

        const { latitude, longitude } = location.coords;

        return { latitude, longitude };
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const coords: { latitude: number; longitude: number } | null =
      getCurrentLocation();

    if (coords && coords?.latitude && coords?.longitude) {
      reverseGeocode(coords.latitude, coords.longitude, setUser);
    }
  };

  useEffect(() => {
    updateUserLocation();
  }, []);

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText variant="h2" style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText fontSize={RFValue(5)} style={{ color: "#3b4886" }}>
              🌧️Rain
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.flexRow}>
          <CustomText variant="h8" numberOfLines={1} style={styles.text2}>
            {user?.address || "knowhere, Somewhere 😅"}
          </CustomText>
          <MaterialCommunityIcons
            name="menu-down"
            color="#fff"
            size={RFValue(20)}
            style={{ bottom: -1 }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(customer)/profile")}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={RFValue(36)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  text2: {
    color: "#fff",
    width: "90%",
    textAlign: "center",
  },
  flexRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    width: "70%",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    // paddingTop: Platform.OS === "android" ? 10 : 5,
    justifyContent: "space-between",
  },
  flexRowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: "#e8eaf5",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});

export default Header;
