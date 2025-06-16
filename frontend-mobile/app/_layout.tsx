import { Stack } from "expo-router";
import { Provider } from 'react-redux'
import { persistor, store } from "../redux/store"
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlertProvider } from "@/hooks/alert-hook";

export default function RootLayout() {
  return(
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <AlertProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </AlertProvider>
      </PersistGate>
    </Provider>
  )
}