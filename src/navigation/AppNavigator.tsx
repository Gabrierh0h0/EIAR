import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import  HomeScreen  from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ScanQRScreen from "../screens/ScanQRScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#023048", // Color del header
        },
        headerTintColor: "#ffffff", // Color de texto e íconos del header
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackVisible: false,
      }}
    >
      {/* Login sin header */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* Registro sin header */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      {/* Home con header estilizado */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      {/* Nueva pantalla: Escanear QR */}
      <Stack.Screen
        name="ScanQR"
        component={ScanQRScreen}
        options={{ headerShown: false,}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
