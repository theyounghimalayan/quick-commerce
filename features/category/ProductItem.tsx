import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import { screenHeight } from "@/utils/Scaling";
import { Colors } from "@/utils/Constants";
import CustomText from "@/components/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import UniversalAdd from "@/components/UniversalAdd";

const ProductItem: FC<{ item: any; index: number }> = ({ index, item }) => {
  const isSecondColumn = index % 2 === 0;
  return (
    <View style={[styles.container, { marginRight: isSecondColumn ? 10 : 0 }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require("@/assets/assets/icons/clock.png")}
            style={styles.clockIcon}
          />
          <CustomText fontSize={RFValue(7)} style={{ fontWeight: 500 }}>
            16 MINS
          </CustomText>
        </View>

        <CustomText
          variant="h8"
          numberOfLines={2}
          style={{ marginVertical: 4, fontWeight: 500 }}
        >
          {item?.name}
        </CustomText>

        <View style={styles.priceContainer}>
          <View>
            <CustomText variant="h8" style={{ fontWeight: 500 }}>
              ₹{item?.price}
            </CustomText>
            <CustomText
              variant="h8"
              style={{
                opacity: 0.8,
                textDecorationLine: "line-through",
                fontWeight: 500,
              }}
            >
              ₹{item?.discountPrice}
            </CustomText>
          </View>

          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: 10,
    overflow: "hidden",
  },
  imageContainer: {
    height: screenHeight * 0.12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  image: {
    height: "100%",
    width: "100%",
    aspectRatio: 1 / 1,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 4,
    alignItems: "center",
    gap: 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: "flex-start",
  },
  clockIcon: {
    height: 15,
    width: 15,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: "auto",
  },
});

export default ProductItem;
