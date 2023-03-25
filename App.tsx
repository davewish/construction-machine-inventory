import React from "react";
import { StatusBar } from "expo-status-bar";

import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";

import { store } from "./store/redux/store";
import CategoryScreen from "./screens/CategoryScreen";
import ManagedCategory from "./screens/ManagedCategory";
import { useCategories } from "./store/redux/hooks";
import Drawer1 from "./components/Drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="category"
            drawerContent={(props) => <Drawer1 {...props} />}
          >
            <Drawer.Screen name="category" component={CategoryScreen} />

            <Drawer.Screen name="managedCategory" component={ManagedCategory} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
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
