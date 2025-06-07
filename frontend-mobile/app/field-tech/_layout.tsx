import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register-new-asset" options={{
        presentation: "modal",
        title: "Register New Asset",
        headerStyle: { backgroundColor: '#0f6da9'},
        headerTintColor: '#fff' 
      }} />
      <Stack.Screen name="(nested)/tickets/[id]" options={{
        headerShown: false,
      }} />
      <Stack.Screen name="(nested)/assets/[id]" options={{
        headerShown: false,
      }} />
    <Stack.Screen name="notifications" options={{
        presentation: "modal",
        title: "Notifications",
        headerStyle: { backgroundColor: '#0f6da9'},
        headerTintColor: '#fff' 
      }} />
    </Stack>
  );
}