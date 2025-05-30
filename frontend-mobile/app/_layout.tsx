import { Stack } from "expo-router";

export default function RootLayout() {
  return(
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="create-account-screen"/>
        <Stack.Screen name="logins-screen"/>
        <Stack.Screen name="verification-screen"/>
      </Stack>
  )
}