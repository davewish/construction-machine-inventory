import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";

import { store, persistor } from "./store/redux/store";
import CategoryScreen from "./screens/CategoryScreen";
import ManagedCategory from "./screens/ManagedCategory";

import { PersistGate } from "redux-persist/integration/react";

import CustomeDrawer from "./components/Drawer";
import MachineTypeDetails from "./screens/MachineTypeDetail";
import MachineTypeDetail from "./screens/MachineTypeDetail";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Category"
              drawerContent={(props) => <CustomeDrawer {...props} />}
            >
              <Drawer.Screen name="Category" component={CategoryScreen} />

              <Drawer.Screen
                name="ManagedCategory"
                component={ManagedCategory}
              />
              <Drawer.Screen
                name="MachineTypeDetail"
                component={MachineTypeDetail}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
