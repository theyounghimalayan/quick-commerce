import React, { ComponentProps, ComponentPropsWithoutRef, FC } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/utils/Constants";

interface InputProps {
  left: ReactNode;
  onClear?: () => void;
  right?: boolean;
}

// const CustomInput: FC<
//   InputProps & ComponentPropsWithoutRef<typeof TextInput>
// > = ({ left, onClear, right, ...props }) => {
//   return (
//     <View style={styles.flexRow}>
//       {typeof left === "string" || typeof left === "number" ? (
//         <Text style={styles.text}>{left}</Text>
//       ) : (
//         left
//       )}{" "}
//       <TextInput
//         {...props}
//         style={styles.inputContainer}
//         placeholderTextColor="#ccc"
//       />
//       <View style={styles.icon}>
//         {right && !!props?.value?.length && (
//           <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
//             <Ionicons
//               name="close-circle-sharp"
//               size={RFValue(16)}
//               color="#ccc"
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// export default CustomInput;

const CustomInput: FC<
  InputProps & ComponentPropsWithoutRef<typeof TextInput>
> = ({ left, onClear, right, ...props }) => {
  const showClear =
    Boolean(right) && typeof props.value === "string" && props.value.length > 0;

  return (
    <View style={styles.flexRow}>
      {left && typeof left === "string" ? <Text>{left}</Text> : left}

      <TextInput
        {...props}
        style={[styles.inputContainer, props.style]}
        value={String(props.value ?? "")} // ensure string
        placeholderTextColor="#ccc"
      />

      {showClear && (
        <View style={styles.icon}>
          <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
            <Ionicons
              name="close-circle-sharp"
              size={RFValue(16)}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  icon: {
    width: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  inputContainer: {
    width: "90%",
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBottom: 15,
    height: "100%",
    color: Colors.text,
    bottom: -1,
  },
  text: {
    width: "10%",
    marginLeft: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.5,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: Colors.border,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    borderColor: Colors.border,
    // TODO: check the shadow rules and what styling they create
  },
});
