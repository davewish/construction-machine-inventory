import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface CustomButtonProps {
  addNewCategoryForm: any;
  width?: string;
  label: string;
}
const CustomButton = ({
  addNewCategoryForm,
  width,
  label,
}: CustomButtonProps) => {
  return (
    <View style={[styles.addCategoryBtnContainer, { width }]}>
      <Pressable onPress={addNewCategoryForm} style={styles.addCategoryBtn}>
        <View style={styles.addCategoryInnerContainer}>
          <Text style={styles.addCategoryText}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  addCategoryBtnContainer: {
    padding: 4,
    marginBottom: 10,
  },
  addCategoryBtn: {},
  addCategoryInnerContainer: {
    padding: 10,
    backgroundColor: "#0E1BA3",
    borderRadius: 8,
  },
  addCategoryText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
});
