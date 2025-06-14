import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationScreen() {
  return (
    <SafeAreaView className="h-full flex-start justify-center bg-[#0f6da9]">
          <Image
            source={require('../../assets/images/verified-account-illustration.png')} // Your asset here
            className="w-[250px] h-[250px] mx-auto mt-[-100px]"
            resizeMode="contain"
          />
          <Text className="text-center text-[#c2e600] font-bold my-2 w-[80%] mx-auto">
            A verification message has been sent to your email, Follow the steps that follows in it and login to your accout
          </Text>
          {/* Login Button */}
          <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center w-[80%] mx-auto mt-5" onPress={()=>{router.replace("/login")}}>
            <Text className="text-[#0f6da9] font-semibold">Login Into Your Account</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}
