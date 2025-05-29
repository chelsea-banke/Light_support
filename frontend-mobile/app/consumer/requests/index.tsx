import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function RequestsScreen() {
  const requests = [
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

      <TouchableOpacity className="flex-row items-center space-x-2 absolute bottom-4 right-4">
        <Text className="text-[#0f6da9] font-bold text-4xl mr-1">New</Text>
        <View className="bg-[#0f6da9] rounded-full p-4">
          <Feather name="plus" size={28} color="white"  />
        </View>
      </TouchableOpacity>

      {/* List of Requests */}
      <ScrollView className="space-y-3">
        {requests.map((req) => (
          <View
            key={req.id}
            className="bg-white p-3 rounded-lg border border-b-2 border-gray-200 shadow-sm my-1"
          >
            <View className="flex-row justify-between items-start mb-1">
              <Text className="font-semibold text-base text-black w-4/5">
                {req.title}
              </Text>
              <Text className="bg-[#b3e700] text-xs text-white font-semibold px-2 rounded-full">
                {req.status}
              </Text>
            </View>
            <Text className="text-sm text-gray-700 leading-snug">
              {req.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
