
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Imagen centrada */}
      <Image
        source={require("../../assets/EIAR-Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Volver al Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002b3d", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    height: 300,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    backgroundColor: "#004d66", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#006680", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
