import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
const Home = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <Redirect href={"/(root)/(tabs)/home"} />
  ) : (
    <Redirect href="/(auth)/welcome" />
  );
};

export default Home;
