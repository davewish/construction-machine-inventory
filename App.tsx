import React from "react";
import { StatusBar } from "expo-status-bar";

import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { store } from "./store/redux/store";
import CategoryScreen from "./screens/CategoryScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "left",
              flexGrow: 1,
            },
          }}
        >
          <Drawer.Screen
            name="category"
            component={CategoryScreen}
            options={{
              title: "Dashboard",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
