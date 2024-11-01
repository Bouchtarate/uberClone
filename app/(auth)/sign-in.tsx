import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import customButton from "@/components/CustomButton";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";
const SignIn = () => {
  const OnSignInPress = async () => {};
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-2 left-5">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Email"}
            placeholder={"Entre your email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => {
              setForm({ ...form, email: value });
            }}
          />
          <InputField
            label={"Password"}
            placeholder={"Entre your password"}
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => {
              setForm({ ...form, password: value });
            }}
          />
        </View>
        <View className="px-5">
          <CustomButton title="Sign In" onPress={OnSignInPress} />
          <OAuth />
        </View>
        <Link
          href="/sign-up"
          className="text-lg text-center text-general-200 mt-6 font-JakartaSemiBold"
        >
          <Text>Don't have an account? </Text>
          <Text className="text-primary-500">Sign Up</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignIn;
