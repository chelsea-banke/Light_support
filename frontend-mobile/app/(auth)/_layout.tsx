import { GuestGuard } from "@/components/guest-guard";
import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <GuestGuard>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="create-account"/>
        <Stack.Screen name="logins"/>
        <Stack.Screen name="verification"/>
      </Stack>
    </GuestGuard>
  )
}