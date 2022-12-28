import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove, update, query, } from "firebase/database";
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
  }).catch(console.error);
}

export async function fAddTag(userId, tag) {
  return await set(ref(database, `tags/${userId}/${tag.id}`), tag);
}

export async function fUpdateTag(userId, tag) {
  return await update(ref(database, `tags/${userId}/${tag.id}`), tag);
}

export async function fGetTags(userId) {
  return await get(ref(database, `tags/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const tags = snapshot.val();
      return Object.keys(tags).map((key) => tags[key]);
    } else {
      return [];
    }
  });
}

export async function fDeleteTag(userId, tagId) {
  return await remove(ref(database, `tags/${userId}/${tagId}`));
}

export async function fAddDiary(userId, diary) {
  return await set(ref(database, `diarys/${userId}/${diary.id}`), diary);
}

export async function fUpdateDiary(userId, diary) {
  return await update(ref(database, `diarys/${userId}/${diary.id}`), diary);
}

export async function fGetDiarys(userId) {
  return await get(ref(database, `diarys/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const diarys = snapshot.val();
      return Object.keys(diarys).map((key) => diarys[key]);
    } else {
      return [];
    }
  });
}

export async function fDeleteDiary(userId, diaryId) {
  return await remove(ref(database, `diarys/${userId}/${diaryId}`));
}

export async function fGetDiarysByTag (userId, tagId) {
  const q = query(ref(database, `diarys/${userId}`));
  return await get(q).then((snapshot) => {
    if (snapshot.exists()) {
      const diarys = snapshot.val(); // 여기서 일단 모든 다이어리들을 불러옴
      return Object.keys(diarys).map((key) => diarys[key]).filter((diary) => diary.tagIds?.includes(tagId));
    } else {
      return [];
    }
  });
} 