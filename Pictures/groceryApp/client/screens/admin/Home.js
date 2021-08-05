import React, { useEffect, useState } from "react";
import constants from "expo-constants";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../../global";
import { useDispatch } from "react-redux";

export default function Home(props) {
  const [state, setState] = useState({
    loading: true,
    edit: false,
    jarNames: "",
    currlevel: "",
    jarname: "",
    adminID: "",
    iotToken:''
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getAdminId();
  }, []);

  const getAdminId = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem("item"));
    const adminId = afterParse.adminId;
    const iotToken = afterParse.iotToken;
    console.log("Admin ID: " + adminId);
    console.log("Iot Token: " + iotToken);
    setState((prevState) => {
      return { ...prevState, adminID: adminId,iotToken:iotToken};
    });
    fetchData(adminId);
  };

  const fetchData = (adminId) => {
    setState((prevState) => {
      return { ...prevState, loading: true };
    });
    fetch(`${global.ipAddress}:3001/getHomeData/` + adminId)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setState((prevState) => {
          return { ...prevState, jarNames: resJson, loading: false };
        });

        console.log("Loading is " + state.loading);
      })
      .catch((e) => console.log(e));
  };

  const getValues = (val) => {
    if (val >= 0 && val <= 10) {
      SendMail();
      return <Text>high</Text>;
    } else if (val >= 11 && val <= 16) {
      return <Text>Medium</Text>;
    } else if (val >= 17 && val <=22) {
      return <Text>low</Text>;
    }
    else { return <Text >Invalid</Text> }
  };

  const onAddJar = () => {
    setState((prevState) => {
      return { ...prevState, jarname: "" };
    });
    fetch(`${global.ipAddress}:3001/addJar/` + state.adminID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jarName: state.jarname,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        console.log("added");
      })
      .catch((e) => console.log(e));
  };

  const SendMail = () => {
    fetch(`${global.ipAddress}:3001/sendMail/` + state.adminID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((resJson) => {
        console.log(resJson);
      });
  };

  const onDelete = (jarName) => {
    setState((prevState) => {
      return { ...prevState, edit: false };
    });

    fetchData();
    fetch(
      `${global.ipAddress}:3001/deleteJarItem/` + state.adminID + "/" + jarName,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      })
      .catch((e) => console.log(e));
  };

  const handleRefresh = () => {
    getAdminId();
  };

  const renderSeparator = () => (
    <View
      style={{
        marginBottom: -10,
      }}
    />
  );

  return (
    <>
      <FlatList
        refreshing={state.loading}
        onRefresh={handleRefresh}
        data={state.jarNames}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              dispatch({ type: "navigate", payload: { jarname: item.key , iotToken: item.iotToken } });
              props.navigation.navigate("History", item);
            }}
            onLongPress={() =>
              setState((prevState) => {
                return { ...prevState, edit: true };
              })
            }
            style={styles.card}
          >
            <View style={styles.jarNameContainer}>
              <Text style={styles.jarText}>{item.key}</Text>
              <View style={styles.pill}>{getValues(item.value)}</View>
              {state.edit ? (
                <Icon
                  onPress={() => onDelete(item.jars)}
                  style={{ marginRight: 20 }}
                  name="close"
                  size={19}
                  color="red"
                />
              ) : null}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.addWrapper}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Add New Jar"
            placeholderTextColor="#888"
            value={state.jarname}
            onChangeText={(text) =>
              setState((prevState) => {
                return { ...prevState, jarname: text };
              })
            }
          />
        </View>
        <TouchableOpacity onPress={() => onAddJar()} style={styles.addBtnShr}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "100%",
    marginTop:constants.statusBarHeight,
  },
  card: {
    width: "95%",
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    margin: 10,
  },
  pill: {
    flex: 2,
    backgroundColor: "lightgreen",
    padding: 5,
    borderRadius: 5,
    maxWidth: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  addBtn: {
    backgroundColor: "#fb5b5a",
    width: "90%",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addBtnShr: {
    backgroundColor: "#fb5b5a",
    height: 50,
    width: "20%",
    padding: 1,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    margin: 20,
    justifyContent: "center",
  },
  addWrapper: { display: "flex", flexDirection: "row" },
  inputView: {
    width: "65%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fb5b5a",
    height: 50,
    marginVertical: 20,
    marginLeft: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: { height: 45, color: "#000" },
  jarNameContainer: { flexDirection: "row", marginVertical: 30 },
  jarText: { flex: 1, fontSize: 16, marginLeft: 20 },
});
