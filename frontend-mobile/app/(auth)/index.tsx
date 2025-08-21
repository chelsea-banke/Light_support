import React, { use, useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Platform, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../../global.css";
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBaseUrl } from '@/utils/axiosInstance';
import { setWSBaseUrl } from '@/services/ws-service';

export default function WelcomeScreen() {
  const modalRef = useRef<Modalize>(null);
  const [ipAddress, setIpAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  useEffect(() => {
    modalRef.current?.open()
  }, [])

  const connectToServer = async () => {
    
    if (!ipAddress.trim()) {
      Alert.alert("Validation", "Please enter a valid IP address.");
      return;
    }

    setIsConnecting(true);
    try {
      const response = await axios.get(`http://${ipAddress}:8080/api/auth/ping`); // example endpoint
      
      if (response.status === 200) {
        setBaseUrl(ipAddress); // Set the base URL for axios
        setWSBaseUrl(ipAddress); // Set the WebSocket base URL
        modalRef.current?.close();
        Alert.alert("Success", "Connected to server.");
      } else {
        Alert.alert("Error", "Server responded with an error.");
      }
    } catch (err) {
      Alert.alert("Connection Failed", "Could not connect to the server.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <View className={`flex-1 bg-[#cce8ff] relative`}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Top Section */}
      <View className="items-center h-[50%] mt-20">
        <Image source={require('../../assets/images/light-logo.png')} className="w-50 h-50" resizeMode="contain" />
        <Text className="mt-4 text-lg font-medium text-black">
          <Text className="italic">Welcome To </Text>
          <Text className="text-[#7b9d00] font-bold">Light Support</Text>
        </Text>
        <Text className="mt-1 text-base">By</Text>
        <Image source={require("../../assets/images/eneo-logo.png")} className="w-[150px] h-[150px] mt-[-50px]" resizeMode="contain" />
        {/* Server Config Button */}
        <TouchableOpacity
          className=" rounded-full px-8 py-2 mt-[-34]"
          onPress={() => modalRef.current?.open()}
        >
          <Text className="text-sm text-[#0f6da9] font-semibold">Configure Server</Text>
        </TouchableOpacity>
      </View>

      {/* Diagonal Background */}
      <View className="bottom-0 w-full h-[50%]">
        <View className="absolute w-full h-[250%] bottom-[-66%] bg-[#99c23b] -rotate-[75deg] left-[-50%] z-0" />
        <View className="absolute h-full w-[250%] bottom-[-20%] bg-[#0f6da9] -rotate-[15deg] right-[-25%] z-10" />
      </View>

      {/* Button Section */}
      <View className="absolute py-28 bottom-20 bottom-[0%] w-full px-6 z-20">
        <TouchableOpacity className="bg-[#cce8ff] py-3 w-[80%] m-auto rounded-full items-center" onPress={() => router.push("/login" as any)}>
          <Text className="text-[#0f6da9] font-semibold">Login Into Your Account</Text>
        </TouchableOpacity>

        <Text className="text-center text-[#c2e600] font-bold my-5">or don’t have an account ?</Text>

        <TouchableOpacity className="bg-[#cce8ff] py-3 w-[80%] m-auto rounded-full items-center" onPress={() => router.push("/create-account" as any)}>
          <Text className="text-[#0f6da9] font-semibold">Create an Account</Text>
        </TouchableOpacity>
      </View>

      {/* Field Tech Button */}
      <TouchableOpacity className="bg-[#cce8ff] pt-3 px-2 w-[35%] items-center absolute right-0 top-10 border-b-2 border-[#0f6da9] flex-row gap-1 mr-1 font-semibold" onPress={() => router.push("/field-tech-login" as any)}>
        <Text className="text-[#0f6da9] font-semibold text-sm">Login As Field Tech</Text>
        <AntDesign name="arrowright" size={24} color="#0f6da9" />
      </TouchableOpacity>

      {/* Modalize Modal */}
      <Modalize
        ref={modalRef}
        modalHeight={SCREEN_HEIGHT * 0.6}
        handlePosition="inside"
        modalStyle={{ backgroundColor: '#f2f2f2', paddingHorizontal: 20 }}
      >
        <View className="py-5">
          <Text className="text-lg font-semibold mb-2 text-[#0f6da9]">Enter Server IP</Text>
          <TextInput
            className="border border-gray-400 rounded px-4 py-2 mb-4 bg-white"
            placeholder="e.g. 192.168.1.10"
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="numbers-and-punctuation"
            autoCapitalize="none"
          />
          <TouchableOpacity
            className="bg-[#0f6da9] p-3 rounded items-center"
            onPress={connectToServer}
            disabled={isConnecting}
          >
            <Text className="text-white font-bold">{isConnecting ? 'Connecting...' : 'Test Connection'}</Text>
          </TouchableOpacity>
          <Text className='text-center text-gray-600 mt-2 w-full'>Make sure you and server are on the same network</Text>
          
        </View>
      </Modalize>
    </View>
  );
}