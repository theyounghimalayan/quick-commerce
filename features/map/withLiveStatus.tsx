import CustomText from "@/components/CustomText";
import { SOCKET_URL } from "@/service/config";
import { getOrderById } from "@/service/OrderService";
import { useAuthStore } from "@/state/authStore";
import { hocStyles } from "@/styles/GlobalStyles";
import { Colors } from "@/utils/Constants";
import { router, usePathname } from "expo-router";
import { FC, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { io } from "socket.io-client";

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<typeof P>
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = (props) => {
    const { currentOrder, setCurrentOrder } = useAuthStore();
    const routeName = usePathname();
    console.log(routeName);

    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?._id as any);
      setCurrentOrder(data);
    };

    useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ["websocket"],
          withCredentials: true,
        });
        socketInstance.emit("joinRoom", currentOrder?._id);
        socketInstance?.on("liveTrackingUpdates", (updatedOrder) => {
          fetchOrderDetails();
          console.log("RECEIVING LIVE UPDATES 🔴");
        });

        socketInstance?.on("orderConfirmed", (confirmOrder) => {
          fetchOrderDetails();
          console.log("ORDER CONFIRMATION LIVE UPDATES 🔴");
        });

        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />

        {currentOrder && routeName && (
          <View
            style={[
              hocStyles.cartContainer,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require("@/assets/assets/icons/bucket.png")}
                  style={styles.img}
                />
              </View>

              <View style={{ width: "68%" }}>
                <CustomText variant="h7" style={{ fontWeight: 600 }}>
                  Order is {currentOrder?.status}
                </CustomText>
                <CustomText variant="h9" style={{ fontWeight: 500 }}>
                  {currentOrder?.items?.[0]?.item.name +
                    (currentOrder?.items?.length - 1 > 0
                      ? ` and ${currentOrder?.items?.length - 1}+ items`
                      : "")}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(customer)/map")}
              style={styles.btn}
            >
              <CustomText variant="h8" style={{ color: Colors.secondary }}>
                View
               </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return WithLiveStatusComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
  },
});

export default withLiveStatus;
