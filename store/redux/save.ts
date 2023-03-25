import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveStateToAsyncStorage = async (state) => {
  try {
    const serializedState = JSON.stringify(state);

    await AsyncStorage.setItem("category", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const loadStateFromAsyncStorage = async () => {
  try {
    const serializedState = await AsyncStorage.getItem("category");

    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
