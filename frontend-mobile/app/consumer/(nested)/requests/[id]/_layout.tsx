import { router, Stack, useLocalSearchParams, useSegments } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RequestDetailsLayout() {
  const id = useLocalSearchParams().id;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#0f6da9' },
        headerTintColor: '#fff',
    }}>
      <Stack.Screen
        name="datails"
        options={{
          title: 'Request Details',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: 'Request',
          header: ({ options }) => (
            <View className="flex-row items-center justify-between bg-[#0f6da9] px-4 pt-16 pb-5">
              <View className="flex-row gap-3">
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text className="text-white font-semibold text-2xl">Request {id}</Text>
              </View>
              <Pressable className='flex flex-row gap-2' onPress={() => router.push(`/consumer/(nested)/requests/${id}/datails` as any)}>
                <Text className="text-xs text-[#0f6da9] font-semibold text-center bg-[#a8ca38] px-2 py-1 rounded-full w-16 mt-1">ongoing</Text>
                <Feather name="info" size={24} color="white" />
              </Pressable>
            </View>
          )
        }} />
    </Stack>
  );
}