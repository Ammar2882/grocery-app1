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

import '../../global';
const PORT= process.env.PORT || 3001
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AdminLoginCred = async (props) => {
    console.log("before sending request")
    fetch(`https://stark-dusk-55835.herokuapp.com/adminSignin`, {
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
          var items = {
            adminId: data[0],
            token: data[1],
        
          };
          if (data[1] !== undefined) {
            await AsyncStorage.setItem("item", JSON.stringify(items));
            props.navigation.navigate("Home");
            ToastAndroid.show("Logged in successfully !", ToastAndroid.SHORT);
            console.log(data);
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
          keyboardType="email-address"
          placeholderTextColor="white"
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
      <TouchableOpacity onPress={() => props.navigation.navigate('Forgot Password')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => AdminLoginCred(props)}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
        <Text style={styles.signup}>Sign up</Text>
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
