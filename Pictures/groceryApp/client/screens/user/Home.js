import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../../global";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      arrayData: "",
      currlevel: "",
      adminID: "",
    };
  }

  componentDidMount = () => {
    this.getAdminId();
    // this.getDataUsingGet();
    this.setState({ loading: false });
  };

  getAdminId = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem("uitem"));
    const adminId = afterParse.adminId;
    this.setState({ adminID: adminId });
    this.fetchData();
  };

  fetchData = () => {
    this.setState({ loading: true });
    fetch(`${global.ipAddress}:3001/getHomeData/` + this.state.adminID)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        this.setState({ arrayData: resJson });
        this.setState({ loading: false });
      })
      .catch((e) => console.log(e));
  };


  handleRefresh = () => {
    this.setState({ loading: false }, () => {
      this.fetchData();
      console.log(this.state.arrayData);
    });
  };

  renderSeparator = () => (
    <View
      style={{
        marginBottom: -10,
      }}
    />
  );

  render() {
    return (
      <FlatList
        data={this.state.arrayData}
        renderItem={({ item,index }) => (
          <TouchableOpacity key={index+1} style={styles.card}>
            <View style={styles.jarTextContainer}>
              <Text style={styles.jarText}>{item.key}</Text>
              <View style={styles.pill}>
                <Text>{item.value}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={this.renderSeparator}
       // keyExtractor={(item) => item.jars}
        refreshing={this.state.loading}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "100%",
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
    maxWidth: 60,
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
  addWrapper: {
    display: "flex",
    flexDirection: "row",
  },
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
  inputText: {
    height: 45,
    color: "#000",
  },
  jarTextContainer: { flexDirection: "row", marginVertical: 30 },
  jarText: { flex: 1, fontSize: 16, marginLeft: 20 },
});
