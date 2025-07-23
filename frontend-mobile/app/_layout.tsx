import { Stack } from "expo-router";
import { Provider } from 'react-redux'
import { persistor, store } from "../redux/store"
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlertProvider } from "@/hooks/alert-hook";
import { Logger } from "@maplibre/maplibre-react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@/utils/axiosInstance'

Logger.setLogLevel('error'); // Set log level to ERROR to reduce console noise

export default function RootLayout() {
  return(
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <AlertProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AlertProvider>
      </PersistGate>
    </Provider>
  )
}