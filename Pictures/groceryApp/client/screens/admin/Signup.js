import React, { useState } from "react";
import constants from "expo-constants";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  
} from "react-native";

import "../../global";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [iotToken , setIotToken] = useState('');
  const [jars, setJars] = useState(0);
  const [jarname, setJarname] = useState("");
  const [jarnamesArray, setJarnamesArray] = useState([]);
  

  const AdminCred = async (props) => {
    fetch(`https://stark-dusk-55835.herokuapp.com/adminSignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        contact: phone,
        password: password,
        jars: jarnamesArray,
        iotToken : iotToken
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data);
          ToastAndroid.show("Signed up successfully !", ToastAndroid.SHORT);
          props.navigation.navigate("Admin Login");
        } catch (e) {
          console.log(e);
        }
      });
  };

  const addJar = () => {
    setJarnamesArray((jarnamesArray) => {
      return [...jarnamesArray, jarname];
    });
    ToastAndroid.show("item added", ToastAndroid.SHORT);
    setJars(jars + 1);
    setJarname("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AUTO GROCERY</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="UserName..."
          placeholderTextColor="white"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="white"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contact No..."
          placeholderTextColor="white"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          secureTextEntry={true}
          placeholderTextColor="white"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="IOT Token..."
          placeholderTextColor="white"
          keyboardType="email-address"
          value={iotToken}
          onChangeText={(text) => setIotToken(text)}
        />
      </View>
      
      <TouchableOpacity
        onPress={() => AdminCred(props)}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Admin Login")}
      >
        <Text style={styles.signup}>Login</Text>
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
    marginTop: constants.statusBarHeight,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 45,
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
  jarnameInputView: {
    width: "74%",
    backgroundColor: "#465881",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
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
  jarBtn: {
    width: "20%",
    backgroundColor: "#fb5b5a",
    height: 50,
    alignItems: "center",
    borderRadius: 5,
  },
  jarnamesView: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jarLabel: {
    color: "#000",
    marginTop: 15,
  },
  quantity: {
    display: "flex",
    width: "80%",
    marginBottom: 10,
  },
});

export default Signup;
