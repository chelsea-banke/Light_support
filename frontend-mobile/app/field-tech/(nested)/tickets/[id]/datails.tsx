import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TicketDetailsScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white h-full">
      {/* Ticket Status */}
      <View className="bg-blue-100 px-4 py-5">
        <Text className="text-blue-800 font-semibold mb-4">Ticket 1</Text>

        <View className="flex-row justify-between items-center">
          {['Assignment', 'Surveyance', 'Resolving', 'Reviewing', 'Approved'].map((label, index) => (
            <View key={index} className="items-center">
              <View
                className={`w-10 h-10 rounded-full border-2 ${index < 3 ? 'bg-blue-100 border-blue-600' : 'bg-white border-gray-300'} flex items-center justify-center`}
              >
                <Text className={`font-bold ${index < 3 ? 'text-blue-800' : 'text-gray-500'}`}>{index + 1}</Text>
              </View>
              <Text className={`text-xs mt-1 ${index < 3 ? 'text-blue-800' : 'text-gray-500'}`}>{label}</Text>
            </View>
          ))}
        </View>

        <Pressable className="mt-6 bg-[#0f6da9] py-3 rounded-full">
          <Text className="text-white font-bold text-center">Next</Text>
        </Pressable>
      </View>

      {/* Title & Description */}
      <View className="p-4">
        <Text className="text-lg font-bold text-blue-800">
          Transformer down due to rainfall at kuseri and no electricity
        </Text>

        <Text className="font-bold mt-4 mb-1">Description</Text>
        <Text className="text-gray-700 text-sm">
          Following heavy rainfall in the Kuseri area on the evening of May 3rd, 2025, the local transformer servicing the neighborhood experienced a failure and is currently non-functional. As a result, there is a complete power outage affecting households and small businesses in the vicinity. Preliminary reports from field technicians suggest that water ingress may have caused internal damage or short-circuiting within the transformer unit. No signs of fire or explosion were observed.
        </Text>

        <View className="border-t border-gray-300 mt-4 mb-2" />

        {/* Dates & Status */}
        <Text className="text-sm">Reported on: <Text className="font-medium">01/05/2025 (13 days ago)</Text></Text>
        <Text className="text-sm">Assigned on: <Text className="font-medium">02/05/2025 (13 days ago)</Text></Text>

        <View className="bg-lime-300 px-2 py-1 rounded-md w-16 mt-1">
          <Text className="text-xs text-white font-semibold text-center">ongoing</Text>
        </View>

        {/* Tools */}
        <Text className="font-bold mt-5">Tools</Text>
        <View className="mt-2 ml-2">
          {Array(4).fill('Electric wire (500m)').map((tool, index) => (
            <View key={index} className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-700">• {tool}................................................
              </Text>
              <Ionicons name="checkmark-circle" size={18} color="green" />
            </View>
          ))}
        </View>

        <Pressable className="mt-5 border-2 border-[#0f6da9] rounded-full py-2">
          <Text className="text-center text-[#0f6da9] font-semibold">Request Tools</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
