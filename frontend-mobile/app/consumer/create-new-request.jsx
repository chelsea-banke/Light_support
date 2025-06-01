import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';

export const options = {
  presentation: 'modal',
  headerShown: true,
  title: 'Create Request',
};

export default function NewRequestScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-4 pt-6 h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Title Field */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Title <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-sm mb-1"
          placeholder="Meter Reading not updating"
          placeholderTextColor="#a1a1aa"
          value={title}
          onChangeText={setTitle}
        />
        <Text className="text-xs text-gray-500 mb-5">
          Give a short but descriptive title for your request
        </Text>

        {/* Description Field */}
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Field Label <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 h-28 text-sm"
          placeholder="Input"
          placeholderTextColor="#a1a1aa"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <Text className="text-xs text-gray-500 mt-1 mb-10">
          This is the description area
        </Text>

        {/* Submit Button */}
        <TouchableOpacity className="bg-[#0f6da9] rounded-full py-4 items-center justify-center" onPress={() => {router.push(`/consumer/requests/${1}`);}}>
          <Text className="text-white font-semibold">Request Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
