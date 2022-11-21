import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove, update, query, } from "firebase/database";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail ,
  sendEmailVerification,
  signInWithEmailAndPassword, // 로그인
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export async function fSignup(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
  await fSendEmailVerification();
}

export async function fSendEmailVerification() {
  await sendEmailVerification(auth.currentUser);
}

export async function fSendPasswordResetEmail(email) {
  await sendPasswordResetEmail(auth, email);
}

export async function fLogin(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export function fLogout() {
  signOut(auth).catch(console.error);
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