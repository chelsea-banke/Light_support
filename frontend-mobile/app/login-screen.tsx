import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <View className="flex-auto flex-start justify-between py-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-10">
        {/* Header with logo and text */}
        <View className="mb-6 flex-row">
          <Image
            source={require('../assets/images/light-logo.png')} // Your asset here
            className="w-[150px] h-[150px]"
            resizeMode="contain"
          />
          <View className=" mt-20">
            <Text className="italic text-2xl">Login into</Text>
            <Text className="text-[#7b9d00] font-bold  text-2xl">Light Support</Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="bg-[#0f6da9] rounded-t-2xl flex-1 py-14 px-10">
          {/* Email Field */}
          <Text className="text-white font-semibold mb-1">
            Email<Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#d4e7f5"
            className="bg-[#6da8cf] text-white px-4 py-3 rounded-lg mb-1"
            keyboardType="email-address"
          />
          <Text className="text-xs text-white mb-4">This is the description area</Text>

          {/* Password Field */}
          <Text className="text-white font-semibold mb-1">
            Password<Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            placeholder="xxxxxxxxxx"
            placeholderTextColor="#d4e7f5"
            className="bg-[#6da8cf] text-white px-4 py-3 rounded-lg mb-1"
            secureTextEntry
          />
          <Text className="text-xs text-white mb-8">This is the description area</Text>

          {/* Login Button */}
          <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center" onPress={() => { router.push("/consumer" as any) }}>
            <Text className="text-[#0f6da9] font-semibold">Login Into Your Account</Text>
          </TouchableOpacity>

          {/* Register Prompt */}
          <Text className="text-center text-[#c2e600] font-bold my-2">
            or don’t have an account ?
          </Text>

          <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center" onPress={()=>{router.push("/create-account-screen" as any)}}>
            <Text className="text-[#0f6da9] font-semibold">Create an Account</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border-2 border-[#cce8ff] py-3 rounded-full items-center mt-5" onPress={()=>{router.push("/field-tech" as any)}}>
            <Text className="text-[#cce8ff] font-semibold">Login As Field Tech</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
