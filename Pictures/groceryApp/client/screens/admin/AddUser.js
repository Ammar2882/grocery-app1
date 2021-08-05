import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../../global";

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [getAdminID, setAdminId] = useState("");

  useEffect(() =>{
  getAdminId();
}, []);

  const getAdminId = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem("item"));
    const adminId = afterParse.adminId;
    setAdminId(adminId);
  };

  const UserCred = async () => {

    fetch(
      `${global.ipAddress}:3001/createUser/` + getAdminID ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          contact: phone,
          password: password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data !== "undefined" && data !== "" && data !== null) {
                  console.log(data);
                  props.navigation.navigate("User List");
                  ToastAndroid.show("User Added Successfully!", ToastAndroid.SHORT);
                } else {
                  console.log("invalid");
                }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AUTO GROCERY</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="UserName..."
          placeholderTextColor="#003f5c"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contact No..."
          placeholderTextColor="#003f5c"
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
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={() => UserCred()} style={styles.loginBtn}>
        <Text style={styles.loginText}>ADD USER</Text>
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

export default AddUser;
