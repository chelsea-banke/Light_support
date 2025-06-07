import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="new-request" options={{
        presentation: "modal",
        title: "Create New Request",
        headerStyle: { backgroundColor: '#0f6da9'},
        headerTintColor: '#fff' 
      }} />
      <Stack.Screen name="(nested)/requests/[id]" options={{
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