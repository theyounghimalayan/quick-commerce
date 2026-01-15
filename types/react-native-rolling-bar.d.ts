declare module "react-native-rolling-bar" {
  import { ViewStyle } from "react-native";
  import { ReactNode } from "react";

  interface Props {
    interval?: number;
    defaultStyle?: boolean;
    customStyle?: ViewStyle;
    children?: ReactNode;
  }

  const RollingBar: React.FC<Props>;
  export default RollingBar;
}
