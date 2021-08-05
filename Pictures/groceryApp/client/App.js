import React from "react";

import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

import Welcome from "./screens/Welcome";

import AdminLogin from "./screens/admin/Login";
import ForgotPassword from "./screens/admin/ForgotPassword";
import Signup from "./screens/admin/Signup";
import AdminHome from "./screens/admin/Home";
import History from "./screens/admin/History";
import UserList from "./screens/admin/UserList";
import AddUser from "./screens/admin/AddUser";
import AdminLogout from "./screens/admin/Logout";

import Login from "./screens/user/Login";
import Home from "./screens/user/Home";
import UserLogout from "./screens/user/Logout";

import { Provider } from "react-redux";
import store from "./screens/admin/store";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Welcome"
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="User" component={UserStack} />
          <Stack.Screen name="Admin" component={AdminStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function AdminStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Admin Login">
      <Stack.Screen
        name="Admin Login"
        component={AdminLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={AdminDrawer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AdminDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Admin Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#fb5b5a" },
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 20 }}
            size={25}
            name="menu"
          />
        ),
      }}
      drawerContent={(props) => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              (routeName) => routeName !== "History"
            ),
            routes: props.state.routes.filter(
              (route) => route.name !== "History"
            ),
          },
        };
        return (
          <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Stack.Screen
        name="Admin Home"
        component={AdminHome}
        options={{
          headerTitle: "Admin Home",
          headerRight: () => (
            <Icon
              onPress={() => navigation.navigate("User List")}
              style={{ marginRight: 20 }}
              size={24}
              name="user-plus"
            />
          ),
        }}
      />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="User List" component={UserList} />
      <Stack.Screen
        name="Add User"
        component={AddUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Logout" component={AdminLogout} />
    </Drawer.Navigator>
  );
}

function UserStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="User Login"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#fb5b5a" },
      }}
    >
      <Stack.Screen
        name="User Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User Home"
        component={UserDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function UserDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#fb5b5a" },
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 20 }}
            size={25}
            name="menu"
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Logout" component={UserLogout} />
    </Drawer.Navigator>
  );
}
