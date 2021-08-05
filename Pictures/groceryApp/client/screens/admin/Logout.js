import React from "react";
import { View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout(props) {
  const LogoutBtn = () =>
    Alert.alert("Confirm Logout!", "Are you sure you want to Logout", [
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("item");
          props.navigation.navigate("Admin Login");
        },
        style: "cancel",
      },
    ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      {LogoutBtn()}
    </View>
  );
}
