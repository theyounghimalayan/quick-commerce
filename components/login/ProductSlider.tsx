import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC, memo, useMemo } from "react";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { imageData } from "@/utils/dummyData";
import { screenWidth, screenHeight } from "@/utils/Scaling";

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);
  return (
    <View pointerEvents="none">
      <AutoScroll duration={5000} endPaddingWidth={0} style={styles.autoScroll}>
        <View style={styles.gridContainer}>
          {rows?.map((row: any, rowIndex: number) => {
            return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

export default ProductSlider;

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row?.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imageIndex}
            style={[
              styles.itemContainer,
              { transform: [{ translateX: horizontalShift }] },
            ]}
          >
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = memo(Row);

const styles = StyleSheet.create({
  autoScroll: {
    // position: "absolute",
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: "center",
    overflow: "visible",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    backgroundColor: "green",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
});
