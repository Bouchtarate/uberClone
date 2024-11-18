import { View, Text, ScrollView, Image } from "react-native";
import React, { useState, useCallback } from "react";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, email, password]);

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
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
          <InputField
            label={"Password"}
            placeholder={"Entre your password"}
            icon={icons.lock}
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>
        <View className="px-5">
          <CustomButton title="Log In" onPress={() => onSignInPress()} />
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
