import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TicketsScreen() {
  const tickets = [
    {
      id: 1,
      title: 'Transformer down due to...',
      description:
        'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt',
      status: 'ongoing',
    },
    {
      id: 2,
      title: 'Transformer down due to...',
      description:
        'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt',
      status: 'ongoing',
    },
    {
      id: 3,
      title: 'Transformer down due to...',
      description:
        'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt',
      status: 'ongoing',
    },
  ];

  return (
    <View className="flex-1 bg-[#d9efff] px-4 pt-4">
      {/* Search & Filter Bar */}
      <View className="flex-row items-center space-x-2 mb-4">
        <View className="flex-1 flex-row items-center bg-white rounded-md px-3 py-1 mr-1">
          <TextInput
            placeholder="Search"
            className="ml-2 flex-1 text-gray-700"
            placeholderTextColor="#9ca3af"
          />
          <Feather name="search" size={20} color="#9ca3af" />
        </View>

        <TouchableOpacity className="flex-row items-center px-3 py-4 rounded-md border-b">
          <Text className="mr-1 font-medium text-black">Filter</Text>
          <Ionicons name="filter" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* List of tickets */}
      <ScrollView className="space-y-3">
        {tickets.map((ticket) => (
          <Pressable onPress={() => router.push(`/field-tech/(nested)/tickets/${ticket.id}` as any)} key={ticket.id}>
            <View
              key={ticket.id}
              className="bg-white p-3 rounded-t-lg border-b border-gray-800 my-1"
            >
              <View className="flex-row justify-between items-start mb-1">
                <Text className="font-semibold text-base text-black w-4/5">
                  {ticket.title}
                </Text>
                <Text className="bg-[#b3e700] text-xs text-white font-semibold px-2 rounded-full">
                  {ticket.status}
                </Text>
              </View>
              <Text className="text-sm text-gray-700 leading-snug">
                {ticket.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
