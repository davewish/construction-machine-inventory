import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.rootScreen}>
      <Text style={styles.noFoundText}>No Category Found</Text>
    </View>
  );
};
export default NotFound;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFoundText: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 10,
  },
});
