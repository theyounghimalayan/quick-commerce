import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { FC } from "react";
import { Colors } from "@/utils/Constants";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

interface ArrowButtonProps {
  title: string;
  onPress?: () => void;
  price: number;
  loading?: boolean;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  title,
  onPress,
  price,
  loading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[
        styles.btn,
        { justifyContent: price !== 0 ? "space-between" : "center" },
      ]}
    >
      {price !== 0 && price && (
        <View>
          <CustomText variant="h7" style={{ color: "white", fontWeight: 500 }}>
            ₹{price + 34}.0
          </CustomText>

          <CustomText variant="h9" style={{ color: "white", fontWeight: 500 }}>
            TOTAL
          </CustomText>
        </View>
      )}

      <View style={styles.flexRow}>
        <CustomText variant="h6" style={{ color: "#fff", fontWeight: 500 }}>
          {title}
        </CustomText>
        {loading ? (
          <ActivityIndicator
            color="white"
            style={{ marginHorizontal: 5 }}
            size="small"
          />
        ) : (
          <MaterialIcons name="arrow-right" color="#fff" size={RFValue(25)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ArrowButton;
