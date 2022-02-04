import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCZ98w2DOafXh92JgtBonw2jJouldX5ggM",
    authDomain: "devter-d88b7.firebaseapp.com",
    projectId: "devter-d88b7",
    storageBucket: "devter-d88b7.appspot.com",
    messagingSenderId: "877072127376",
    appId: "1:877072127376:web:1ade2a9216db422aea0f15"
  };

  firebase.initalizeApp(firebaseConfig);
  export const loginWithGitHub = () => {
      const githubProvider = new firebase.auth.
  }