import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBxq3JRqSm9fgHTqzAzjXBUa7cinb2WR04",
    authDomain: "wereact-a73b4.firebaseapp.com",
    databaseURL: "https://wereact-a73b4.firebaseio.com",
    projectId: "wereact-a73b4",
    storageBucket: "wereact-a73b4.appspot.com",
    messagingSenderId: "464416012424",
    appId: "1:464416012424:web:5ce682d4a3541a0921473d",
    measurementId: "G-WH85L4SPWV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
