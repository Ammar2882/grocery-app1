import React, { useEffect, useState } from "react";
import constants from "expo-constants";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../../global";
import store from "./store";

export default function History(props) {
  const [state, setState] = useState({
    arrayData: [],
    jarName: props.route.params.key,
    dateTimeArr: "",
    loading: true,
    edit: false,
    iotToken : '',
  });
  var jarName = props.route.params.key;
  var iotToken = props.route.params.iotToken;
  useEffect(() => {
    fetchData(0, jarName,iotToken);
  }, []);

  store.subscribe(() => {
    jarName = store.getState().jarname;
    iotToken = store.getState().iotToken;
    fetchData(2, store.getState().jarname,store.getState().iotToken);
  });




  const fetchData = (no, jarName_main,iotToken) => {
    setState((prevState) => {
      return { ...prevState, loading: true, arrayData: [] ,iotToken:iotToken};
    });

    fetch(`${global.ipAddress}:3001/history/` + jarName_main + '/'+iotToken)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        var values = resJson.status;

        if (no == 2) {
          setState((prevState) => {
            return {
              ...prevState,
              arrayData: [{ value: values, dateTime: new Date() }],
              loading: false,
            };
          });
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              arrayData: [
                ...state.arrayData,
                { value: values, dateTime: new Date() },
              ],
              loading: false,
            };
          });
        }

        console.log("Array data is " + JSON.stringify(state));
      })
      .catch((e) => console.log(e));
  };

  const getValues = (val) => {
    if (val >= 0 && val <= 10) {
      return <Text>high</Text>;
    } else if (val >= 11 && val <= 16) {
      return <Text>Medium</Text>;
    } else if (val >= 17) {
      return <Text>low</Text>;
    }
  };

  const getDateTime = (dt) => {
    const dateTime = dt.toUTCString();
    return <Text style={styles.dateStyle}>{dateTime}</Text>;
  };

  const handleRefresh = () => {
    fetchData(0, jarName,iotToken);
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
        data={state.arrayData}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity style={styles.card}>
              <View style={styles.jarNameContainer}>
                <Text style={styles.jarText}>{jarName}</Text>
                {getDateTime(item.dateTime)}
                <View style={styles.pill}>{getValues(item.value)}</View>
              </View>
            </TouchableOpacity>
          </>
        )}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => index.toString()}
        refreshing={state.loading}
        onRefresh={handleRefresh}
      />
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
  dateStyle: {
    flex: 3,
    fontSize: 12,
    color: "#777",
    marginLeft: 15,
    marginTop: 3,
  },
  jarNameContainer: { flexDirection: "row", marginVertical: 30 },
  jarText: { flex: 0.6, marginLeft: 20, fontWeight: "bold" },
});
