import React from "react";
import constants from "expo-constants";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Welcome = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 70 }}>
        <Image style={styles.img} source={require("../assets/cartLogo.png")} />
      </View>
      <Text style={styles.logo}>AUTO GROCERY</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Admin")}
        style={styles.loginBtn}
      >
        <Text>Login Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("User")}
        style={styles.loginBtn}
      >
        <Text>Login User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
    marginTop:constants.statusBarHeight,
  
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 45,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  signup: {
    color: "white",
    fontSize: 15,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  img: { height: 200, width: 240 },
});

export default Welcome;
