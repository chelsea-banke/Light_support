import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import AntDesign from '@expo/vector-icons/AntDesign';
import { EvilIcons, FontAwesome, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';


export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Spanish' },
    { key: '3', value: 'French' },
  ];

  return (
    <View className="flex-1 h-full bg-white mb-[-100px]">
      {/* Profile Info */}
      <View className="bg-white px-6 pb-4 pt-6 items-center flex-row m-auto h-[20%]">
        <View className="w-32 h-32 rounded-full border-4 border-lime-400 items-center justify-center mb-3">
          <Image
            source={require('../../assets/images/image-placeholder.png')} // Replace with your asset
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>
        <View className='ml-4 flex-1'>
          <View className="flex-row items-center space-x-1">
            <Text className="text-lg font-semibold">John Doe</Text>
            <AntDesign name="edit" size={24} color="black" />
          </View>
          <Text className="text-gray-500">johndoe@gmail.com</Text>
        </View>
      </View>

      {/* Settings Panel */}
      <View className="rounded-t-3xl px-6 pt-16 bg-[#0f6da9] space-y-4 flex-1 gap-4">
        {/* Notifications */}
        <View className="flex-row items-center justify-between bg-[#468fbc] px-8 py-2 rounded-3xl">
          <View className="flex-row items-center space-x-2 gap-2">
            <Ionicons name="notifications-outline" size={26} color="white" />
            <Text className="text-white text-lg font-semibold">Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor="#fff"
            trackColor={{ true: '#8ED1FC', false: '#ccc' }}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
        </View>

        {/* Location Sharing */}
        <View className="flex-row items-center justify-between bg-[#468fbc] px-8 py-2 rounded-3xl">
          <View className="flex-row items-center space-x-2 gap-1">
            <Ionicons name="location-outline" size={26} color="white" />
            <Text className="text-white text-base font-semibold">Location Sharing</Text>
          </View>
          <Switch
            value={locationSharingEnabled}
            onValueChange={setLocationSharingEnabled}
            thumbColor="#fff"
            trackColor={{ true: '#8ED1FC', false: '#ccc' }}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
        </View>

        {/* Language Selection */}
        <View className="flex-row items-center justify-between bg-[#468fbc] px-8 py-2 rounded-3xl">
          <View className="flex-row items-center space-x-2 mb-2 gap-2">
            <FontAwesome name="language" size={26} color="white" />
            <Text className="text-white text-lg font-semibold">Language</Text>
          </View>
          <SelectList
            setSelected={(val: React.SetStateAction<string>) => setSelectedLanguage(val)}
            data={languages}
            save="value"
            boxStyles={{ backgroundColor: '#0f6da9', borderRadius: 32, borderColor: 'transparent' }}
            dropdownStyles={{ backgroundColor: '#0f6da9' }}
            dropdownTextStyles={{ color: 'white' }}
            inputStyles={{ color: 'white' }}
            defaultOption={{ key: '1', value: selectedLanguage }}
          />
        </View>

        {/* Terms & Conditions */}
        <Pressable className="flex-row items-center justify-between bg-blue-500 px-8 py-3 rounded-xl mt-5">
          <View className="flex-row items-center space-x-2 gap-2">
            <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="white" />
            <Text className="text-white text-base font-semibold">Terms & Conditions</Text>
          </View>
          <Octicons name="link-external" size={24} color="white" />
        </Pressable>

        <View className="items-center">
          <Text className="text-white text-sm">Learn more...</Text>
        </View>
      </View>
    </View>
  );
}

