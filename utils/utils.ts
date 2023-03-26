import { Dimensions } from "react-native";

export const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

export const groupDataByCategory = (data: any) => {
  const groupedData: any = {};

  data.forEach((item: any) => {
    if (!groupedData[item.categoryName]) {
      groupedData[item.categoryName] = [];
    }
    groupedData[item.categoryName].push(item);
  });

  return groupedData;
};
