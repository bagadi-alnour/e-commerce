import firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCzD4qF0PcUWRtT11Iy3N-UHpncJO7oO3c",
  authDomain: "azrica-76a7c.firebaseapp.com",
  databaseURL: "https://azrica-76a7c.firebaseio.com",
  projectId: "azrica-76a7c",
  storageBucket: "azrica-76a7c.appspot.com",
  messagingSenderId: "429232854472",
  appId: "1:429232854472:web:ee4b776f71a8a53d8f9cfd",
  measurementId: "G-SNCSHVDLX2",
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
