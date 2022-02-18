import { initializeApp } from '@firebase/app';
import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ98w2DOafXh92JgtBonw2jJouldX5ggM',
  authDomain: 'devter-d88b7.firebaseapp.com',
  projectId: 'devter-d88b7',
  storageBucket: 'devter-d88b7.appspot.com',
  messagingSenderId: '877072127376',
  appId: '1:877072127376:web:1ade2a9216db422aea0f15',
};

initializeApp(firebaseConfig);

const db = getFirestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChangedFunc = (onChange) => {
  const auth = getAuth();

  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.setCustomParameters(firebaseConfig);
  const auth = getAuth();
  return signInWithPopup(auth, githubProvider);
};

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return addDoc(collection(db, 'devits'), {
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return getDocs(
    query(collection(db, 'devits'), orderBy('createdAt', 'desc'))
  ).then(({ docs }) => {
    return docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      // con el "+" convertimos la fecha en un timestamp
      return { ...data, id, createdAt: +createdAt.toDate() };
    });
  });
};

export const uploadImage = (file) => {
  const imagesRef = ref(getStorage(), `images/${file.name}`);
  const task = uploadBytesResumable(imagesRef, file);
  return task;
};
