import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Colors } from "@/utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import RollingBar from "react-native-rolling-bar";
import CustomText from "../CustomText";
import CustomInput from "../CustomInput";

const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const searchItems = [
    `Search Sweets`,
    `Search milk`,
    "Search for ata, dal, coke",
    `Search "chips"`,
    `Search "pooja thali"`,
  ];

  useEffect(() => {
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setShowSearchBar(false);
      setSearchValue("");
    });

    return () => {
      hideListener.remove();
    };
  }, []);

  return (
    <>
      {showSearchBar ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            marginHorizontal: 10,
            paddingHorizontal: 10,
          }}
        >
          <CustomInput
            onChangeText={(text) => setSearchValue(text.slice(0, 10))}
            value={searchValue}
            placeholder="Search..."
            autoFocus
            left={false}
            onClear={() => setSearchValue("")}
            style={[styles.textContainer]}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.8}
          onPress={() => setShowSearchBar(true)}
        >
          <Ionicons name="search" color={Colors.text} size={RFValue(20)} />
          <RollingBar
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}
          >
            {searchItems.map((item) => (
              <CustomText variant="h6">{item}</CustomText>
            ))}
          </RollingBar>
          <View style={styles.divider} />
          <Ionicons name="mic" color={Colors.text} size={RFValue(20)} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f4f7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "90%",
    paddingLeft: 10,
    height: 50,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
});
