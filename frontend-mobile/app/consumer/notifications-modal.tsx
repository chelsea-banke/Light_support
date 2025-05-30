import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

const notifications = [
  {
    id: '1',
    title: 'Faults status update',
    date: '10/12/2025',
    description:
      'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt',
  },
  // Add more items here if needed
];

export default function NotificationModal () {
  const router = useRouter();

  return (
        <View className="w-full rounded-t-2xl bg-white/40 p-4">
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-white rounded-xl p-4 mb-4 shadow shadow-black/10">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-[#0f6da9] font-semibold text-base">{item.title}</Text>
                  <Text className="text-xs text-gray-500">{item.date}</Text>
                </View>
                <Text className="text-sm text-gray-800">{item.description}</Text>
              </View>
            )}
          />
        </View>
  );
};