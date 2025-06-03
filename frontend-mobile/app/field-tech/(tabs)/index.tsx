import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from '@expo/vector-icons';
import { router } from 'expo-router';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-[#0f6da9]">
        {/* Welcome + Stats */}
        <View className="bg-[#cce8ff] px-4 py-6">
          <Text className="text-xl font-bold text-gray-800">
            Welcome to your{"\n"}support Dashboard
          </Text>

          {/* Stat Boxes */}
          <View className="flex-row justify-between mt-6 space-x-4 relative">
            <View className="flex-1 items-center bg-white py-4 rounded-lg mr-2">
              <Text className="text-2xl font-bold text-[#0f6da9]">00</Text>
              <Text className="text-xs mt-1 text-gray-700">Assigned Tickets</Text>
            </View>
            <View className="flex-1 items-center bg-white py-4 rounded-lg ml-2">
              <Text className="text-2xl font-bold text-[#0f6da9]">00</Text>
              <Text className="text-xs mt-1 text-gray-700">Resolved Tickets</Text>
            </View>
          </View>

          {/* Request Support */}
          <TouchableOpacity className="bg-[#0f6da9] py-3 rounded-full items-center mt-6" onPress={() => {router.push(`/field-tech/register-new-asset` as any)}}>
            <Text className="text-white font-semibold">Register Asset</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Requests */}
        <View className="px-4 pt-6 bg-white flex-1">
          <Text className="text-base font-semibold text-[#0f6da9]">Recent Tickets</Text>

          <View className="items-center justify-center flex-1">
            <Image
              source={require('../../../assets/images/no-requests.png')} // Add your own illustration
              className="w-44 h-44"
              resizeMode="contain"
            />
            <Text className=" text-gray-600 text-center">
              You have not been assigned{"\n"}any ticket yet
            </Text>
          </View>
        </View>
    </View>
  );
}