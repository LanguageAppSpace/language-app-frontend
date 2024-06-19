import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// Google Auth provider
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Google Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Firestore
export const db = getFirestore();

// Function to create user document from authentication
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation?: { displayName?: string }
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...(additionalInformation || {}), // Spread only if additionalInformation is provided
      });
    } catch (error) {
      console.error("Error creating the user", error);
    }
  }

  return userDocRef;
};

type UserDetails = {
  email: string;
  password: string;
  displayName: string;
};

export const createAuthUserWithEmailAndPassword = async (
  userDetails: UserDetails
) => {
  try {
    const { email, password, displayName } = userDetails;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await createUserDocumentFromAuth(user, { displayName });
    await updateProfile(user, { displayName: displayName });
    return user;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw error;
  }
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user with email and password:", error);
    throw error;
  }
};
