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
          <SafeAreaView className="flex-row items-center justify-between bg-[#0f6da9] px-4 h-fit pt-4">
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../../../assets/images/light-logo.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-[#d4e600]">{options.title === "Dashboard" ? 'Light Support' : options.title}</Text>
            </View>
            <TouchableOpacity onPress={() => {router.push("/consumer/notifications-modal" as any)}}>
              <Ionicons name="notifications-outline" size={28} color="white" />
            </TouchableOpacity>
          </SafeAreaView>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="chat-bubble-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="news/index"
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
