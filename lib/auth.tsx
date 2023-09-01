import {initializeApp} from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmjkvBUN5RZytYdF031ZKko4uT3ogQ7LQ",
  authDomain: "authentification-app-8ef60.firebaseapp.com",
  projectId: "authentification-app-8ef60",
  storageBucket: "authentification-app-8ef60.appspot.com",
  messagingSenderId: "869031800273",
  appId: "1:869031800273:web:3f0e70223672beded7c4f0",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const isValidateUser = (): boolean => {
  const user = auth.currentUser;
  console.log;
  if (user) {
    return true;
  }

  return false;
};

export const getUserUID = (): null | string => {
  if (isValidateUser()) {
    const user = auth.currentUser;
    return user?.uid as string;
  }
  return null;
};

export const loginUserWithEmail = async (
  email: string,
  password: string
): Promise<boolean> => {
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return result;
};

export const loginUserWithGoogle = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, googleProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
};

export const loginUserWithFacebook = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, facebookProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
};

export const loginUserWithGithub = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, githubProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
};

export const logoutUser = async (): Promise<boolean> => {
  const result = await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return result;
};

export const registerUserWithEmail = async (
  email: string,
  password: string
): Promise<boolean> => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      await createUserBio(user.uid);

      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return result;
};

export const registerUserWithGoogle = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, googleProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      await createUserBio(user.uid);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
};

export const registerUserWithFacebook = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, facebookProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      await createUserBio(user.uid);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
};

export const registerUserWithGithub = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, githubProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      await createUserBio(user.uid);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
};

export const createUserBio = async (id: string) => {
  try {
    const docRef = await setDoc(doc(db, "usersBio", id), {
      bio: "",
    });
  } catch (error) {
    console.log(error);
  }
};
