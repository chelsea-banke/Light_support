import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../global.css"
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View className={`flex-1 bg-[#cce8ff] relative`}>
      {/* Top Section with Logo */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View className="items-center h-[50%] mt-20">
        {/* Placeholder for light bulb headset icon */}
        <Image
          source={require('../assets/images/light-logo.png')} // Replace with your actual image path
          className="w-100 h-100"
          resizeMode="contain"
        />

        <Text className="mt-4 text-lg font-medium text-black">
          <Text className="italic">Welcome To </Text>
          <Text className="text-[#7b9d00] font-bold">Light Support</Text>
        </Text>

        <Text className="mt-1 text-base">By</Text>

        <Image
          source={require("../assets/images/eneo-logo.png")} // Replace with your actual logo
          className="w-[150px] h-[150px] mt-[-50px]"
          resizeMode="contain"
        />

        {/* <Text className="text-xs text-gray-600 mt-1">The energy of Cameroon</Text> */}
      </View>

      {/* Diagonal Shape Background */}
      <View className="bottom-0 w-full h-[50%]">
        <View className="absolute w-full h-[250%] bottom-[-66%] bg-[#99c23b] -rotate-[75deg] left-[-50%] z-0" />
        <View className="absolute h-full w-[250%] bottom-[-20%] bg-[#0f6da9]  -rotate-[15deg] right-[-25%] z-10" />
      </View>

      {/* Buttons Section */}
      <View className="absolute bg-[r#0f6da9] py-28 bottom-20 bottom-[0%] w-full px-6 z-20">
        <TouchableOpacity className="bg-[#cce8ff] py-3  w-[80%] m-auto rounded-full items-center" onPress={()=>{router.push("/login-screen")}}>
          <Text className="text-[#0f6da9] font-semibold">Login Into Your Account</Text>
        </TouchableOpacity>

        <Text className="text-center text-[#c2e600] font-bold my-5">
          or don’t have an account ?
        </Text>

        <TouchableOpacity className="bg-[#cce8ff] py-3 w-[80%] m-auto rounded-full items-center" onPress={()=>{router.push("/create-account-screen" as any)}}>
          <Text className="text-[#0f6da9] font-semibold">Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
