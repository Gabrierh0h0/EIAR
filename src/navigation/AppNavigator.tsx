import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

// Importa según tus exports
import { LoginScreen } from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Inicio from "../screens/Inicio";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Inicio" component={Inicio} />
    </Stack.Navigator>
  );
}
