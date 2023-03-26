import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCategories } from "../store/redux/hooks";

const CustomeDrawer = ({ navigation }: { navigation: any }) => {
  const { categoryNames } = useCategories();
  return (
    <View style={styles.container}>
      {categoryNames.map((item) => (
        <Pressable
          key={item.id}
          style={[styles.item]}
          onPress={() => {
            if (
              item.name === categoryNames[0].name ||
              item.name === categoryNames[categoryNames.length - 1].name
            ) {
              navigation.navigate(item.name);
            } else {
              navigation.navigate("MachineTypeDetail", {
                categoryName: item.name,
              });
            }
          }}
        >
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "#e1e1e1",
  },
  name: {
    flex: 1,
    fontSize: 16,
    textTransform: "capitalize",
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default CustomeDrawer;
