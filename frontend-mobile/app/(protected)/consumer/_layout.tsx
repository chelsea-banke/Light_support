import { ReactNode } from 'react';
import { Stack } from 'expo-router';
import { AuthGuard } from '../../../components/auth-guard';

export default function RootLayout() {
  return (
    <AuthGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(nested)/requests/[id]" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="new-request" options={{
          presentation: "modal",
          title: "Create New Request",
          headerStyle: { backgroundColor: '#0f6da9'},
          headerTintColor: '#fff' 
        }} />
        <Stack.Screen name="notifications" options={{
          presentation: "modal",
          title: "Notifications",
          headerStyle: { backgroundColor: '#0f6da9'},
          headerTintColor: '#fff' 
        }} />
        <Stack.Screen name="stats" options={{
          presentation: "modal",
          title: "Stats",
          headerStyle: { backgroundColor: '#0f6da9'},
          headerTintColor: '#fff' 
        }} />
      </Stack>
    </AuthGuard>
  );
}