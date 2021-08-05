import React, { useState, Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Iconicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../../global";

const Item = ({ userName, index }) => {
  const [edit, setEdit] = useState(false);
  return (
    <TouchableOpacity onLongPress={() => setEdit(true)} style={styles.card}>
      <View style={styles.jarContainer}>
        <Text style={styles.jarIndex}>{index})</Text>
        <Text style={styles.jarText}>{userName}</Text>
        {edit ? (
          <Icon
            onPress={() => {
              setEdit(false);
              ToastAndroid.show(
                "user delete functionality not implemented yet",
                ToastAndroid.LONG
              );
            }}
            style={{ marginRight: 20 }}
            name="close"
            size={19}
            color="red"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: "",
      loading: true,
      edit: false,
      getAdminID: "",
    };
  }

  componentDidMount = () => this.getAdminId();

  getAdminId = async () => {
    const afterParse = JSON.parse(await AsyncStorage.getItem("item"));
    const adminId = afterParse.adminId;
    this.setState({ getAdminID: adminId });
    this.fetchData();
  };

  fetchData = () => {
    this.setState({ loading: true });
    fetch(`${global.ipAddress}:3001/getAdminUsers/` + this.state.getAdminID)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        this.setState({ arrayData: resJson });
        this.setState({ loading: false });
      })
      .catch((e) => console.log(e));
  }

  handleRefresh = () => {
    this.setState({ loading: false }, () => {
      this.fetchData();
    });
  };

  renderItem = ({ item }) => (
    <Item userName={item.userName} index={item.index} />
  );

  renderSeparator = () => (
    <View
      style={{
        marginBottom: -10,
      }}
    />
  );

  render() {
    return (
      <>
        <FlatList
          data={this.state.arrayData}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item) => item.userName}
          refreshing={this.state.loading}
          onRefresh={this.handleRefresh}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Add User")}
          style={styles.addBtn}
        >
          <Text>ADD NEW USER</Text>
          <Iconicons size={25} color="#000" name="md-add" />
        </TouchableOpacity>
      </>
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
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    margin: 10,
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
  jarContainer: { flexDirection: "row", marginTop: 20 },
  jarIndex: { flex: 1, marginLeft: 20 },
  jarText: { flex: 2, fontSize: 16, marginLeft: -130 },
});
