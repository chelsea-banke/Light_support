import { router, Stack, useLocalSearchParams, useSegments } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AssetsLayout() {
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
          title: 'Ticket Details',
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
                <Text className="text-white font-semibold text-2xl">Ticket {id}</Text>
              </View>
            </View>
          )
        }} />
    </Stack>
  );
}