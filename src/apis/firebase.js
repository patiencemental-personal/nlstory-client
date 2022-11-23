import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { 
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

/**
 * @see https://firebase.google.com/docs/database/web/start
 */
const database = getDatabase(app);


/**
 * @see https://firebase.google.com/docs/auth/web/google-signin
 */
const auth = getAuth(); // Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider(); // https://firebase.google.com/docs/auth/web/google-signin

/**
 * @see https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk
 */
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

/**
 * @see https://firebase.google.com/docs/auth/web/google-signin#next_steps
 */
export function logout() {
  signOut(auth).catch(console.error);
}

/**
 * @see https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}


async function adminUser(user) {
  return await get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists() && snapshot.val().includes(user.uid)) {
      user.isAdmin = true;
    }
    return user;
  }).catch((error) => {
    console.error(error);
  });
}
