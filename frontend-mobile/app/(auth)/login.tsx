import { loginUser } from '@/redux/middleware/auth';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import AlertBox from '@/components/alert-box';
import { getFaults } from '@/redux/middleware/faults-middleware';
import { useGlobalAlert } from '@/hooks/alert-hook';

export default function LoginScreen() {
    // State for input fields
    const [contact, setContact] = React.useState('');
    const [password, setPassword] = React.useState('');
    const alert = useGlobalAlert();

    const dispatch = useDispatch<AppDispatch>();
    

    const handleLogin = async () => {
        if (!contact || !password) {
            alert.showAlert(
                "error",
                "Empty Login Fields",
                "Make sure you correctly filled every field on the form"
            );

        }
        else{
            const results = await dispatch(loginUser({ contact, password }))
            if(loginUser.fulfilled.match(results)) {
                await dispatch(getFaults())
                router.push("/consumer" as any)
            }
            else{
                alert.showAlert(
                    "error",
                    "Invalid Login Credentials",
                    "make sure you filled the form with your valid account credentials or create an account if you don't yet have one"
                );
            }
        }
    }

    return (
        <View className="flex-auto flex-start justify-between py-0">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-10">
                {/* Header with logo and text */}
                <View className="mb-6 flex-row">
                    <Image
                        source={require('../../assets/images/light-logo.png')} // Your asset here
                        className="w-[150px] h-[150px]"
                        resizeMode="contain"
                    />
                    <View className=" mt-20">
                        <Text className="italic text-2xl">Login into</Text>
                        <Text className="text-[#7b9d00] font-bold  text-2xl">Light Support</Text>
                    </View>
                </View>

                {/* Form Container */}
                <View className="bg-[#0f6da9] rounded-t-2xl flex-1 py-14 px-10">
                    {/* Contact Field */}
                    <Text className="text-white font-semibold mb-1">
                        Contact<Text className="text-red-500">*</Text>
                    </Text>
                    <TextInput
                        placeholder="000-000-000"
                        placeholderTextColor="#d4e7f5"
                        className="bg-[#6da8cf] text-white px-4 py-3 rounded-lg mb-1"
                        keyboardType="numeric"
                        value={contact}
                        onChangeText={setContact}
                    />
                    <Text className="text-xs text-white mb-4">This is the description area</Text>

                    {/* Password Field */}
                    <Text className="text-white font-semibold mb-1">
                        Password<Text className="text-red-500">*</Text>
                    </Text>
                    <TextInput
                        placeholder="xxxxxxxxxx"
                        placeholderTextColor="#d4e7f5"
                        className="bg-[#6da8cf] text-white px-4 py-3 rounded-lg mb-1"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text className="text-xs text-white mb-8">This is the description area</Text>

                    {/* Login Button */}
                    <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center" onPress={() => { handleLogin() }}>
                        <Text className="text-[#0f6da9] font-semibold">Login Into Your Account</Text>
                    </TouchableOpacity>

                    {/* Register Prompt */}
                    <Text className="text-center text-[#c2e600] font-bold my-2">
                        or don’t have an account ?
                    </Text>

                    <TouchableOpacity className="bg-[#cce8ff] py-3 rounded-full items-center" onPress={() => { router.push("/create-account" as any) }}>
                        <Text className="text-[#0f6da9] font-semibold">Create an Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="border-2 border-[#cce8ff] py-3 rounded-full items-center mt-5" onPress={() => { router.push("/field-tech" as any) }}>
                        <Text className="text-[#cce8ff] font-semibold">Login As Field Tech</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}