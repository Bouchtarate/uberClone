import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      // console.error(JSON.stringify(err.errors, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: `Verification Failed ${err.errors[0].longMessages}`,
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-2 left-5">
            Create your account Now
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Name"}
            placeholder={"Entre your name"}
            icon={icons.person}
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <InputField
            label={"Email"}
            placeholder={"Entre your Email"}
            icon={icons.email}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <InputField
            label={"Password"}
            placeholder={"Entre your password"}
            icon={icons.lock}
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
        </View>
        <View className="px-5">
          <CustomButton title="Sign Up" onPress={onSignUpPress} />
          <OAuth />
        </View>
        <Link
          href="/sign-in"
          className="text-lg text-center text-general-200 mt-6 font-JakartaSemiBold"
        >
          <Text>Already have an account? </Text>
          <Text className="text-primary-500">Log In</Text>
        </Link>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            verification.state === "success" && setShowSuccessModal(true)
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-4">
              We've sending verification code to {email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => {
                setVerification({ ...verification, code });
              }}
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.code}
              </Text>
            )}
            <CustomButton
              title="Verify email"
              className="mt-4 bg-success-500"
              onPress={onPressVerify}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-center font-JakartaBold text-3xl">
              Verified
            </Text>
            <Text className="font-Jakarta text-center text-gray-400 text-base mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              className="mt-5"
              onPress={() => {
                setShowSuccessModal(false);
                router.replace("/(root)/(tabs)/home");
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
