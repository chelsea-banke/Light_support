import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { getAssets } from '@/redux/middleware/assets-middleware';

export default function AssetsScreen() {
  const assetsState = useSelector((state: RootState) => state.assets)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{    
    dispatch(getAssets())
  }, [])
  const tickets = [
    {
      id: 1,
      title: 'Transformer down due to...',
      type: 'metre',
      status: 'active',
    },
    {
      id: 2,
      title: 'Transformer down due to...',
      type: 'metre',
      status: 'active',
    },
    {
      id: 3,
      title: 'Transformer down due to...',
      type: 'metre',
      status: 'active',
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

      <TouchableOpacity className="flex-row items-center space-x-2 absolute bottom-4 right-4 z-20" onPress={() => {router.push(`/field-tech/register-new-asset` as any)}}>
        <Text className="text-[#0f6da9] font-bold text-4xl mr-1">New</Text>
        <View className="bg-[#0f6da9] rounded-full p-4">
          <Feather name="plus" size={28} color="white"  />
        </View>
      </TouchableOpacity>

      {/* List of tickets */}
      <ScrollView className="space-y-3">
        {assetsState.assets.map((asset) => (
          <Pressable className='mb-3' onPress={() => router.push({
              pathname: `/field-tech/assets/${asset.id}` as any,
              params: { asset: JSON.stringify(asset) }
            })} key={asset.id}
          >
            <View className='text-sm bg-gray-500 rounded-t text-left px-4 flex-row justify-between'>
              <Text className='text-sm text-white text-left mt-[2px]'>{asset.type}</Text>
              <Text className="bg-[#b3e700] text-xs text-gray-600 font-semibold px-2 rounded-full my-1">
                {/* {ticket.status} */}active
              </Text>
            </View>
            <View
              key={asset.id}
              className="bg-white p-3 rounded rounded-tr-none border-t border-gray-600 flex flex-row justify-between items-center"
            >
              {/* <View className="flex-row justify-between items-start mb-1">

              </View> */}
            <View className='flex-row justify-between gap-3'>
              <Text className="font-semibold text-base text-black">
                {asset.id} |
              </Text>
              <Text className="font-semibold text-base text-gray-500">
                {asset.address}
              </Text>
            </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}