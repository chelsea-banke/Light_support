// app/_layout.tsx
import { Tabs } from 'expo-router';
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
          <SafeAreaView className="flex-row items-center justify-between bg-[#0f6da9] px-4 pt-3">
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../../assets/images/light-logo.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Text className="text-lg font-bold text-[#d4e600]">{options.title ?? 'Light Support'}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </SafeAreaView>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Light Support',
          tabBarIcon: ({ color, size }) => <Entypo name="grid" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="requests/index"
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
