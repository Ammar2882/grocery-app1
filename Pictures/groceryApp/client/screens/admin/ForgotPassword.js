import React, { useState } from "react";
import constants from "expo-constants";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import "../../global";

const ForgotPassword = (props) => {
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const forgotFunction = async (props) => {
    fetch(`${global.ipAddress}:3001/forgetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setMessage(data.status);
        setReset(true);
      });
  };

  return reset ? (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={{ color: "#fff" }}>{message}</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Admin Login")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>OK</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.logo}>Enter Your Email...</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          keyboardType="email-address"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => forgotFunction()}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Reset Password</Text>
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
    fontSize: 35,
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
    marginHorizontal: 10,
  },
});

export default ForgotPassword;
