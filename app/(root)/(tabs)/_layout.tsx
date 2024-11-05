import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ tabBarActiveTintColor = "white" }}
    ></Tabs>
  );
};

export default Layout;
