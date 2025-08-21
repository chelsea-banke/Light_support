import { View, Text, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useGlobalAlert } from '@/hooks/alert-hook'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getFaults } from '@/redux/middleware/faults-middleware'
import faultService from '@/services/fault-service'
import React, { useEffect } from 'react'

export default function faultRequestsScreen() {
  const alert = useGlobalAlert()
  const faultsState = useSelector((state: RootState) => state.faults)
  const dispatch = useDispatch<AppDispatch>()

  const handleSend = async () => {
    try {
      const response = await faultService.createFault({
        description: 'Transformer is not responding'
      })
        router.push(`/consumer/requests/${response.id}` as any)
        dispatch(getFaults())
    } catch (error) {
      alert.showAlert(
        "error",
        "Error creating fault.",
        "Please try again later or contact support if the issue persists."
      )
    }
  }

  useEffect(()=>{
    console.log("fetching...");
    dispatch(getFaults())
  }, [])

  return (
    <View className="flex-1 bg-white px-4">
      {/* Search & Filter Bar */}
      <View className="flex-row items-center space-x-2 mb-4 bg-gray-200 rounded-full mt-2">
        <View className="flex-1 flex-row items-center rounded-md px-3 py-1 mr-1">
          <TextInput
            placeholder="Search..."
            className="ml-2 flex-1 text-gray-700"
            placeholderTextColor="#9ca3af"
          />
          <Feather name="search" size={20} color="#9ca3af" />
        </View>
        <Text className='text-4xl mt-[-5px] text-gray-400'>|</Text>
        <TouchableOpacity className="flex-row items-center px-3 py-4">
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
      <ScrollView className="space-y-3 mx-1">
        {faultsState.faults.map((fault) => (
          <Pressable onPress={() => router.push(`/consumer/(nested)/requests/${fault.id}` as any)} key={fault.id}>
            <View
              key={fault.id}
              className="rounded-lg overflow-hidden border-b border-gray-200 my-1 mb-3 bg-gray-100"
            >
              <View className="flex-row justify-between items-start mb-1 px-2 pt-1">
                <Text className="font-semibold text-base text-black w-4/5">
                  {fault.id.slice(0, 18)}
                </Text>
                <Text className="bg-[#8cb600] text-xs text-white font-semibold px-2 rounded-full mt-1">
                  {fault.status.toLocaleLowerCase()}
                </Text>
              </View>
              <Text className="text-sm text-gray-700 leading-snug bg-gray-200 p-2">
                {fault.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}