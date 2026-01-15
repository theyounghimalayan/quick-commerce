import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Animated as RNAnimated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NoticeHeight, screenHeight } from "@/utils/Scaling";
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";
import * as Location from "expo-location";
import { reverseGeocode } from "@/service/mapService";
import { useAuthStore } from "@/state/authStore";
import NoticeAnimation from "./NoticeAnimation";
import Visuals from "@/features/dashboard/Visuals";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "@/components/CustomText";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AnimatedHeader from "./AnimatedHeader";
import Content from "@/components/dashboard/Content";
import StickySearchBar from "./StickySearchBar";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const { scrollY, expand } = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 1, { duration: 300 });

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const slideUp = () => [
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start(),
  ];

  const slideDown = () => [
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start(),
  ];

  useEffect(() => {
    // slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView>
          <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
            <TouchableOpacity
              onPress={() => {
                scrollY.value = 0;
                expand();
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons
                name="arrow-up-circle-outline"
                color="white"
                size={RFValue(12)}
              />
              <CustomText variant="h9" style={{ color: "white" }}>
                Back to top
              </CustomText>
            </TouchableOpacity>
          </Animated.View>

          {/* <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            /> */}

          {/* <CollapsibleScrollView
          nestedScrollEnabled
          style={styles.panelContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: "#f8f8f8", padding: 20 }}>
            <CustomText fontSize={RFValue(32)} style={{ opacity: 0.2 }}>
              Grocery Delivery App🛒
            </CustomText>
            <CustomText
              style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}
            >
              Developed with ❤️ Varun
            </CustomText>
          </View>
        </CollapsibleScrollView> */}

          {/* </CollapsibleHeaderContainer>
        </CollapsibleContainer> */}

          <AnimatedHeader
            showNotice={() => {
              slideDown();
              const timeoutId = setTimeout(() => {
                slideUp();
              }, 3500);
              return () => clearTimeout(timeoutId);
            }}
          />

          <ScrollView>
            <StickySearchBar />
            <Content />

            <View
              style={{
                backgroundColor: "#f8f8f8",
                padding: 20,
              }}
            >
              <CustomText fontSize={RFValue(32)} style={{ opacity: 0.2 }}>
                Grocery Delivery App🛒
              </CustomText>
              <CustomText
                style={{ marginTop: 10, paddingBottom: 30, opacity: 0.2 }}
              >
                Developed with ❤️ Varun
              </CustomText>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    </NoticeAnimation>
  );
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  backToTopButton: {
    position: "absolute",
    alignSelf: "center",
    top: Platform.OS === "ios" ? screenHeight * 0.18 : 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});
