// app/_layout.tsx
import { router, Tabs } from 'expo-router';
import { Ionicons, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '@react-navigation/elements';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#c2e600',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#0f6da9',
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        header: ({options}) => (
          <SafeAreaView className="flex-row justify-between bg-[#0f6da9] py-3 px-4" edges={['top', 'left', 'right']}>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../../../../assets/images/light-logo.png')}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-[#d4e600]">{options.title === "Dashboard" ? 'Light Support' : options.title}</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <TouchableOpacity onPress={() => {router.push("/consumer/stats" as any)}}>
                <Ionicons name="stats-chart" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {router.push("/consumer/notifications" as any)}}>
                <Ionicons name="notifications-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={size} color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="chat-bubble-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="list-alt" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
