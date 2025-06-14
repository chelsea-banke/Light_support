import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function NewsScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Carousel Placeholder */}
      <View className="w-full h-64 bg-gray-200 rounded-lg items-center justify-center relative mb-6">
        <TouchableOpacity className="absolute left-4">
          <Text className="text-2xl text-gray-500">{'<'}</Text>
        </TouchableOpacity>
        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-gray-400 mb-2" />
          <View className="w-20 h-10 bg-gray-400 rounded" />
        </View>
        <TouchableOpacity className="absolute right-4">
          <Text className="text-2xl text-gray-500">{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          className="flex-row bg-gray-100 border border-gray-300 rounded-lg mb-4 p-3 mx-4"
        >
          {/* Image */}
          <View className="w-16 h-16 bg-gray-300 rounded mr-4 items-center justify-center">
            <Image
              source={require("../../../../assets/images/image-placeholder.png")} // Replace with your image or icon
              className="w-8 h-8"
              resizeMode="contain"
            />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 mb-1">CARD LEADING</Text>
            <Text className="text-sm font-bold mb-1">
              Horizontal Card with Image & Actions
            </Text>
            <Text className="text-xs text-gray-600">
              Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id.
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
