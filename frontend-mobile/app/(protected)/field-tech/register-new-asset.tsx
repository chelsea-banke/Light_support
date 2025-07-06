import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import assetService from '../../../services/asset-service';
import { getAssets } from '@/redux/middleware/assets-middleware';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

export default function RegisterNewAssetScreen() {
    const [assetId, setAssetId] = useState('');
    const [address, setAddress] = useState('');
    const [assetType, setAssetType] = useState('');
    const [coordinate, setCoordinate] = useState<{ latitude: number; longitude: number } | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const assetTypes = [
        { key: '1', value: 'Meter' },
        { key: '2', value: 'Transformer' },
        { key: '3', value: 'Pole' },
    ];

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Location access is required to show your location.');
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        setCoordinate({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
        });
    };

    const handleAssetCreation = async () => {
        try {
            const response = await assetService.createAsset({
                "id": assetId,
                "type": assetType,
                "longitude": coordinate?.longitude,
                "latitude": coordinate?.latitude,
                "address": address
            });
            router.push({
                pathname: `/field-tech/assets/${response.id}` as any,
                params: { asset: JSON.stringify(response) }
            });
            dispatch(getAssets());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white px-8 pt-6">
            {/* Asset ID Field */}
            <Text className="font-semibold mb-1">
                Asset ID<Text className="text-red-500">*</Text>
            </Text>
            <TextInput
                placeholder="Asset ID"
                placeholderTextColor="gray"
                className="text-gray px-4 py-3 rounded-lg mb-1 border border-gray-300"
                value={assetId}
                onChangeText={setAssetId}
            />

            {/* Asset Address */}
            <Text className="font-semibold mb-1 mt-4">
                Asset Address<Text className="text-red-500">*</Text>
            </Text>
            <TextInput
                placeholder="Address"
                placeholderTextColor="gray"
                className="text-gray px-4 py-3 rounded-lg mb-1 border border-gray-300"
                value={address}
                onChangeText={setAddress}
            />

            {/* Type Selection */}
            <Text className="text-base font-semibold mb-1 mt-4">
                Asset Type<Text className="text-red-500">*</Text>
            </Text>
            <View className="mb-2 border border-gray-300 rounded">
                <SelectList
                    data={assetTypes}
                    setSelected={setAssetType}
                    placeholder="Select Type"
                    search={false}
                    boxStyles={{ borderWidth: 0 }}
                    dropdownStyles={{ borderWidth: 0, backgroundColor: '#cce8ff' }}
                />
            </View>
            <Text className="text-sm text-gray-500 mb-4">Enter the type of asset you are registering</Text>

            {/* Capture Coordinate */}
            <View className="flex-row justify-between items-center mb-6 rounded-full bg-gray-200">
                <Text className="flex-1 rounded-full bg-gray-200 mr-2 text-center text-sm">
                    {coordinate == null
                        ? '---------------------------'
                        : `${coordinate.longitude}, ${coordinate.latitude}`}
                </Text>
                <TouchableOpacity
                    className="border border-[#0f6da9] rounded-full px-4 py-2 bg-white"
                    onPress={getLocation}
                >
                    <Text className="text-[#0f6da9] font-medium">Capture Coordinate</Text>
                </TouchableOpacity>
            </View>

            {/* Image Placeholder */}
            <View className="border border-dashed border-gray-400 rounded-xl h-48 mb-4 items-center justify-center">
                <FontAwesome name="image" size={48} color="#ccc" />
            </View>

            {/* Image Thumbnails */}
            <View className="flex-row space-x-2 mb-8">
                {images.length === 0 ? (
                    <>
                        <View className="w-10 h-10 bg-gray-200 rounded" />
                        <View className="w-10 h-10 bg-gray-200 rounded" />
                    </>
                ) : (
                    images.map((img, idx) => (
                        <Image
                            key={idx}
                            source={{ uri: img.uri || img }}
                            className="w-10 h-10 rounded"
                        />
                    ))
                )}
            </View>

            {/* Register Button */}
            <TouchableOpacity
                className="bg-[#0f6da9] rounded-full py-3 items-center mb-8"
                onPress={handleAssetCreation}
            >
                <Text className="text-white font-semibold">Register Asset</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
