import { router, Stack, useLocalSearchParams, useSegments } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          header: () => (
            <SafeAreaView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#0f6da9',
                paddingVertical: 15,
                paddingHorizontal: 16,
              }}
              edges={['top', 'left', 'right']}
            >
              <View style={{ flexDirection: 'row', gap: 12 }} className='items-center'>
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Ticket {id}</Text>
              </View>
            </SafeAreaView>
          ),
        }} />
    </Stack>
  );
}