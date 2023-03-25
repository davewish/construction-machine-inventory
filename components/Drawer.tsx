import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCategories } from "../store/redux/hooks";

const Drawer1 = ({ navigation }) => {
  const { drawerItem } = useCategories();
  return (
    <View style={styles.container}>
      {drawerItem.map((item) => (
        <Pressable
          key={item.id}
          style={[
            styles.item,
            // category.id === selectedCategory?.id && styles.selectedItem,
          ]}
          onPress={() => navigation.navigate(item.drawerName)}
        >
          <Text style={styles.name}>{item.drawerName}</Text>
          {/* <Image style={styles.image} source={{ uri: category.image }} /> */}
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

export default Drawer1;
