import { Stack } from "expo-router";
import { Provider } from 'react-redux'
import { store } from "../redux/store"

export default function RootLayout() {
  return(
    <Provider store={store}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="create-account"/>
        <Stack.Screen name="logins"/>
        <Stack.Screen name="verification"/>
      </Stack>
    </Provider>
  )
}