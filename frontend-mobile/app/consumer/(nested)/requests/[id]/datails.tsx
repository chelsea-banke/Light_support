import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Request() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white h-full px-2 pt-4">
      {/* Title & Description */}
      <View className="p-4">
        <Text className="text-xl font-bold text-[#0f6da9]">
          Transformer down due to rainfall at kuseri and no electricity
        </Text>

        <Text className="font-semibold mt-4 mb-1 text-xl">Description</Text>
        <Text className="text-gray-700 text-sm">
          Following heavy rainfall in the Kuseri area on the evening of May 3rd, 2025, the local transformer servicing the neighborhood experienced a failure and is currently non-functional. As a result, there is a complete power outage affecting households and small businesses in the vicinity. Preliminary reports from field technicians suggest that water ingress may have caused internal damage or short-circuiting within the transformer unit. No signs of fire or explosion were observed.
        </Text>

      <View className="border-t border-gray-300 mt-4 mb-2 flex justify-between flex-row" />
        <View className='w-8/12'>
          <Text className="text-sm">Reported on: <Text className="font-medium">01/05/2025 (13 days ago)</Text></Text>
          <Text className="text-sm">Assigned on: <Text className="font-medium">02/05/2025 (13 days ago)</Text></Text>
        </View>
        <Text className="text-xs text-white font-semibold text-center bg-[#a8ca38] px-2 py-1 rounded-full w-16 mt-1">ongoing</Text>
      </View>
    </ScrollView>
  );
}
