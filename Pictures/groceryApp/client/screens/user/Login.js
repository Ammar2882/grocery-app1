import React, { useState } from "react";
import constants from "expo-constants";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../../global";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLoginCred = async () => {
    fetch(`${global.ipAddress}:3001/userSignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data);
          var items = {
            userId: data[0],
            adminId: data[1],
            token: data[2],
          };
          if (data[2] !== undefined) {
            await AsyncStorage.setItem("uitem", JSON.stringify(items));
            props.navigation.navigate("User Home");
            ToastAndroid.show("Logged in successfully !", ToastAndroid.SHORT);
          } else {
            Alert.alert("Login Failed", "Enter valid credentials");
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AUTO GROCERY</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="white"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
    
      <TouchableOpacity onPress={() => userLoginCred()} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
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
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Login;
