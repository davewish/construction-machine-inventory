import React from "react";
import { Menu } from "react-native-paper";
interface MenuItemProps {
  type: string;
  onPress: any;
}

const MenuItem = ({ type, onPress }: MenuItemProps) => {
  const menuItemHandler = () => {
    onPress(type);
  };
  return <Menu.Item onPress={menuItemHandler} title={type} />;
};
export default MenuItem;
