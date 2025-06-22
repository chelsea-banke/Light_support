import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import stomp from '@/services/stomp-service';
import wsService from '@/services/ws-service';
import faultService from '@/services/fault-service';
import { useGlobalAlert } from '@/hooks/alert-hook';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
  
export default function faultuestsScreen() {
  const [messages, setMessages] = useState<any[]>([])
  const alert = useGlobalAlert();
  const faultsState = useSelector((state: RootState) => state.faults)

  // useEffect(() => {
  // 	console.log("Connecting to STOMP...");
  // 	wsService.connectWebSocket((msg) => {
  // 		setMessages((prev) => [...prev, msg]);
  // 	}, (error) => {
  // 		console.error("WebSocket error:", error);
  // 	});
  // 	return () => {
  // 		console.log("Disconnecting from STOMP...");
  // 		stomp.disconnectStomp()
  // 	}
  // }, [])

  const handleSend = async () => {
    // wsService.sendMessage("Hello from React Native!");
    // stomp.sendMessage({ content: 'echo', sender: 'user1' })
    // router.push(`/consumer/faultuests/${1}` as any)
    try {
      const response = await faultService.createFault({
        description: 'Transformer is not responding'
      });
        router.push(`/consumer/faultuests/${response.id}` as any);
    } catch (error) {
      alert.showAlert(
        "error",
        "Error creating fault.",
        "Please try again later or contact support if the issue persists."
      );
    }
  };

  const faultuests = [
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

      <TouchableOpacity className="flex-row items-center space-x-2 absolute bottom-4 right-4 z-20" onPress={() => { handleSend() }}>
        <Text className="text-[#0f6da9] font-bold text-4xl mr-1">New</Text>
        <View className="bg-[#0f6da9] rounded-full p-4">
          <Feather name="plus" size={28} color="white" />
        </View>
      </TouchableOpacity>

      {/* List of faultuests */}
      <ScrollView className="space-y-3">
        {faultsState.faults.map((fault) => (
          <Pressable onPress={() => router.push(`/consumer/(nested)/requests/${fault.id}` as any)} key={fault.id}>
            <View
              key={fault.id}
              className="bg-white p-3 rounded-t-lg border-b border-gray-800 my-1"
            >
              <View className="flex-row justify-between items-start mb-1">
                <Text className="font-semibold text-base text-black w-4/5">
                  {fault.id}
                </Text>
                <Text className="bg-[#b3e700] text-xs text-white font-semibold px-2 rounded-full">
                  {fault.status}
                </Text>
              </View>
              <Text className="text-sm text-gray-700 leading-snug">
                {fault.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}