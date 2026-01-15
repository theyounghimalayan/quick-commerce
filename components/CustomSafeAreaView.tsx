import { View } from "react-native";
import React, { ComponentProps } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomSafeAreaView = ({ style, ...rest }: ComponentProps<typeof View>) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...rest}
    ></View>
  );
};

export default CustomSafeAreaView;
