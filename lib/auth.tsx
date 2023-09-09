import {initializeApp} from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {getFirestore, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";
import {getStorage, uploadBytes, ref, getDownloadURL} from "firebase/storage";

export interface userData {
  uid: string;
  photo: string;
  name: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
}

interface userBioAndPhone {
  bio: string;
  phone: string;
}

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

const storage = getStorage();

const userProfileRef = ref(storage, "userProfile");

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

const showErrorForLoginAndRegisterWithEmail = (error: any) => {
  if (error.code == "auth/email-already-in-use") {
    alert("The email address is already in use");
  } else if (error.code == "auth/invalid-email") {
    alert("The email address is not valid.");
  } else if (error.code == "auth/operation-not-allowed") {
    alert("Operation not allowed.");
  } else if (error.code == "auth/weak-password") {
    alert("The password is too weak.");
  } else if (error.code == "auth/user-not-found") {
    alert("User not found.");
  } else if (error.code == "auth/wrong-password") {
    alert("Your password is incorrect.");
  } else {
    alert("Something went wrong.");
    console.log(error);
  }
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
      showErrorForLoginAndRegisterWithEmail(error);
      return false;
    });

  return result;
};

export const loginUserWithGoogle = async (): Promise<boolean> => {
  const result = await signInWithPopup(auth, googleProvider)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      if (!(await isUserBioAndPhone(user.uid))) {
        await createUserBioAndPhone(
          user.uid,
          user.phoneNumber ? user.phoneNumber : ""
        );
      }
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
      if (!(await isUserBioAndPhone(user.uid))) {
        await createUserBioAndPhone(
          user.uid,
          user.phoneNumber ? user.phoneNumber : ""
        );
      }
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
      if (!(await isUserBioAndPhone(user.uid))) {
        await createUserBioAndPhone(
          user.uid,
          user.phoneNumber ? user.phoneNumber : ""
        );
      }
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
      await createUserBioAndPhone(
        user.uid,
        user.phoneNumber ? user.phoneNumber : ""
      );
      await modifyUserName("User");
      return true;
    })
    .catch((error) => {
      showErrorForLoginAndRegisterWithEmail(error);
      return false;
    });

  return result;
};

export const createUserBioAndPhone = async (id: string, phone: string) => {
  try {
    const docRef = await setDoc(doc(db, "userBioAndPhone", id), {
      bio: "I am a user",
      phone,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBioAndPhone = async (
  id: string
): Promise<userBioAndPhone> => {
  try {
    if (!(await isUserBioAndPhone(id))) {
      const user = auth.currentUser;
      if (user) {
        await createUserBioAndPhone(
          id,
          user.phoneNumber ? user.phoneNumber : ""
        );
      }
    }

    const docSnap = await getDoc(doc(db, "userBioAndPhone", id));
    const userBioAndPhone: userBioAndPhone = {
      bio: docSnap.data()?.bio,
      phone: docSnap.data()?.phone,
    };
    return userBioAndPhone;
  } catch (error) {
    console.log(error);
    return {
      bio: "",
      phone: "",
    };
  }
};

export const modifyUserBioAndPhone = async (bio: string, phone: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateDoc(doc(db, "userBioAndPhone", user.uid), {
      bio,
      phone,
    });
  }
};

const isUserBioAndPhone = async (id: string): Promise<boolean> => {
  const docSnap = await getDoc(doc(db, "userBioAndPhone", id));
  if (docSnap.exists()) {
    return true;
  }
  return false;
};

export const modifyUserPhoto = async (photoUrl: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, {
      photoURL: photoUrl,
    });
  }
};

export const modifyUserName = async (name: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, {
      displayName: name,
    });
  }
};

export const modifyUserEmail = async (email: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateEmail(user, email);
  }
};

export const modifyUserPassword = async (password: string) => {
  const user = auth.currentUser;
  if (user) {
    await updatePassword(user, password);
  }
};

export const uploadUserPhoto = async (photo: File): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    const userRef = ref(userProfileRef, user.uid);
    const profileRef = ref(userRef, Date.now().toString());
    const resultRef = await uploadBytes(userRef, photo).then(
      (snapshot) => snapshot.ref
    );
    const url = await getDownloadURL(resultRef).then(
      (downloadURL) => downloadURL
    );

    return url;
  }

  return null;
};

export const getUserData = async (): Promise<null | userData> => {
  try {
    const user = auth.currentUser;
    const userBioAndPhone: userBioAndPhone = await getUserBioAndPhone(
      user?.uid as string
    );
    const userData = {
      uid: user?.uid ? user.uid : "",
      photo: user?.photoURL ? user.photoURL : "",
      name: user?.displayName ? user.displayName : "",
      bio: userBioAndPhone.bio,
      phone: userBioAndPhone.phone,
      email: user?.email ? user.email : "",
      password: "",
    };

    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
