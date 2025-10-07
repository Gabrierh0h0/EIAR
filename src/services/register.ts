import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export type RegisterForm = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
  program: string;
};

function buildDisplayName(firstName: string, lastName: string) {
  return `${firstName.trim()} ${lastName.trim()}`.replace(/\s+/g, " ");
}

export async function registerUser(form: RegisterForm) {
  if (!form.firstName.trim()) throw new Error("Ingresa tu primer nombre.");
  if (!form.lastName.trim()) throw new Error("Ingresa tus apellidos.");
  if (!form.email.toLowerCase().endsWith("@eia.edu.co"))
    throw new Error("Usa tu correo institucional @eia.edu.co.");
  if (form.password.length < 8)
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  if (form.password !== form.confirm)
    throw new Error("Las contraseñas no coinciden.");
  if (!form.program.trim())
    throw new Error("Selecciona tu carrera.");

  try {
    await createUserWithEmailAndPassword(auth, form.email, form.password);
    // Aquí guardas más datos si quieres (Firestore, etc.)
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Ya existe una cuenta con este correo.");
    } else {
      throw new Error("Ocurrió un error al registrar la cuenta.");
    }
  }

  const cred = await createUserWithEmailAndPassword(
    auth,
    form.email.toLowerCase(),
    form.password
  );

  const displayName = buildDisplayName(form.firstName, form.lastName);
  await updateProfile(cred.user, { displayName });

  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    email: cred.user.email?.toLowerCase() ?? form.email.toLowerCase(),
    firstName: form.firstName.trim(),
    middleName: (form.middleName ?? "").trim(),
    lastName: form.lastName.trim(),
    displayName,
    program: form.program.trim(),
    role: "student",
    onboardingCompleted: false,
    score: 0,
    missionsCompleted: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return cred.user;
}
