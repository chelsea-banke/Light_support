import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RegisterNewAssetScreen (){
  const assetTypes = [
    { key: '1', value: 'Input' },
    { key: '2', value: 'Transformer' },
    { key: '3', value: 'Pole' },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      {/* Header is assumed to be a shared custom header */}

      {/* Asset ID Field */}
      <Text className="font-semibold mb-1">
        Asset ID<Text className="text-red-500">*</Text>
      </Text>
      <TextInput
        placeholder="example@gmail.com"
        placeholderTextColor="gray"
        className="text-white px-4 py-3 rounded-lg mb-1 border border-gray-300"
        keyboardType="email-address"
      />
      <Text className="text-xs text-white">This is the description area</Text>
      
      {/* Type Selection */}
      <Text className="text-base font-semibold mb-1">
        Asset Type<Text className="text-red-500">*</Text>
      </Text>
      <View className="mb-2 border border-gray-300 rounded">
        <SelectList
          data={assetTypes}
          setSelected={() => {}}
          placeholder="Input"
          search={false}
          boxStyles={{ borderWidth: 0 }}
          dropdownStyles={{ borderWidth: 0, backgroundColor: '#cce8ff' }}
        />
      </View>
      <Text className="text-sm text-gray-500 mb-4">Enter the type of asset you are registering</Text>

      {/* Capture Coordinate */}
      <View className="flex-row justify-between items-center mb-6 rounded-full bg-gray-200">
        <View className="flex-1 rounded-full bg-gray-200 mr-2" />
        <TouchableOpacity className="border border-[#0f6da9] rounded-full px-4 py-2 bg-white">
          <Text className="text-[#0f6da9] font-medium">Capture Coordinate</Text>
        </TouchableOpacity>
      </View>

      {/* Image Placeholder */}
      <View className="border border-dashed border-gray-400 rounded-xl h-48 mb-4 items-center justify-center">
        <FontAwesome name="image" size={48} color="#ccc" />
      </View>

      {/* Image Thumbnails */}
      <View className="flex-row space-x-2 mb-8">
        <View className="w-10 h-10 bg-gray-200 rounded" />
        <View className="w-10 h-10 bg-gray-200 rounded" />
      </View>

      {/* Register Button */}
      <TouchableOpacity className="bg-[#0f6da9] rounded-full py-3 items-center mb-8" onPress={() => {router.push(`/field-tech/assets/${1}`)}}>
        <Text className="text-white font-semibold">Register Asset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}