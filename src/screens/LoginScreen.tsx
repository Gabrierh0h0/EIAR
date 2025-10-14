import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (usuario.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, usuario, password);
     navigation.reset({ index: 0, routes: [{ name: 'Inicio' as never }] });

    } catch (error: any) {
      console.error(error);
      let mensaje = "Error al iniciar sesión";
      if (error.code === "auth/invalid-email") mensaje = "Correo inválido";
      if (error.code === "auth/invalid-credential") mensaje = "Credenciales invalidas";

      Alert.alert("Error", mensaje);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fondo con imagen */}
      <ImageBackground
        source={require("../../assets/EIAOpacidadAjustada.png")}
        style={styles.headerImage}
        resizeMode="cover"
      >
      </ImageBackground>

      {/* Contenedor superpuesto */}
      <View style={styles.formContainer}>
        {/* Bienvenida */}
        <Text style={styles.welcomeTitle}>BIENVENIDO A EIAR</Text>
        <Text style={styles.welcomeSubtitle}>
          Ten en cuenta que solo podrás ingresar con{"\n"}credenciales
          institucionales válidas.
        </Text>

        {/* Inputs */}
        <View style={styles.inputWrapper}>
          <Icon name="person-outline" size={22} color="#5c707b" />
          <TextInput
            placeholder="Usuario (correo)"
            placeholderTextColor="#5c707b"
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="lock-closed-outline" size={22} color="#5c707b" />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#5c707b"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 5 }}
          >
            <Icon
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#5c707b"
            />
          </TouchableOpacity>
        </View>

        {/* Olvidaste contraseña */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿OLVIDASTE LA CONTRASEÑA?</Text>
        </TouchableOpacity>

        {/* Botón principal */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

                {/* Enlace a registro */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>
            ¿No tienes una cuenta?{" "}
            <Text style={styles.registerHighlight}>Regístrate</Text>
          </Text>
        </TouchableOpacity>

        {/* Office 365 */}
        <View style={styles.officeContainer}>
          <Image
            source={require("../../assets/microsoft-icon.png")}
            style={styles.officeIcon}
          />
          <Text style={styles.officeText}>
            INICIAR SESIÓN CON{" "}
            <Text style={styles.officeHighlight}>OFFICE 365</Text>
          </Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023048",
  },
  headerImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    zIndex: 1,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#023048",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: "center",
    marginTop: -30,
    zIndex: 2,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#bbd1dc",
    textAlign: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#37434a",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#bbd1dc",
    fontSize: 13,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#219ebc",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  officeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 50,
  },
  officeIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  officeText: {
    color: "#ffffff",
    fontSize: 14,
  },
  officeHighlight: {
    color: "#fb8700",
    fontWeight: "bold",
  },
  registerLink: {
  color: "#ffffff",
  fontSize: 14,
  textAlign: "center",
  },

  registerHighlight: {
    color: "#fb8700",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});