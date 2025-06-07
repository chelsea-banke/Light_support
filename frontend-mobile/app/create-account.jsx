import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CreateAccountScreen() {
  return (
    <SafeAreaView edges={[]} className="flex-1 pb-[-28] flex-start justify-between bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-10">
        {/* Header with logo and text */}
        <View className="mb-6 flex-row">
          <Image
            source={require('../assets/images/light-logo.png')} // Your asset here
            className="w-[100px] h-[100px]"
            resizeMode="contain"
          />
          <View className="mt-10">
            <Text className="italic text-lg">Register and Create an Acount</Text>
            <Text className="text-[#7b9d00] font-bold text-lg">Light Support</Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="bg-[#0f6da9] rounded-t-2xl flex-1 py-14 px-10">

          {/* First Name */}
          <Text className="text-white font-semibold mb-1">
            First Name<Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            placeholder="John"
            placeholderTextColor="#d4e7f5"
            className="bg-[#6da8cf] text-white px-4 py-3 rounded-lg mb-1"
          />
          <Text className="text-xs text-white mb-4">This is the description area</Text>

          {/* Last Name */}
          <Text className="text-white font-semibold mb-1">
            Last Name<Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            placeholder="Doe"
            placeholderTextColor="#d4e7f5"
            className="bg-[#6da8cf] text-white px-4 py-3 rounded-lg mb-1"
          />
          <Text className="text-xs text-white mb-4">This is the description area</Text>

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
          <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center" onPress={()=>{router.replace("/verification")}}>
            <Text className="text-[#0f6da9] font-semibold">Create Your Account</Text>
          </TouchableOpacity>

          {/* Register Prompt */}
          <Text className="text-center text-[#c2e600] font-bold my-2">
            or already have an account ?
          </Text>

          <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center" onPress={()=>{router.push("/login")}}>
            <Text className="text-[#0f6da9] font-semibold">Login Into Your Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
