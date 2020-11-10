import firebase from "firebase";

var sampleConfig = {
  apiKey: "AIzaSyBbY7BKkNn9yrwVXXV-yOWaHsbXzZcoZeE",
  authDomain: "my-react-phonebook.firebaseapp.com",
  databaseURL: "https://my-react-phonebook.firebaseio.com",
  projectId: "my-react-phonebook",
  storageBucket: "my-react-phonebook.appspot.com",
  messagingSenderId: "1011606392196",
  appId: "1:1011606392196:web:0769c3effb92aa6e4361d1",
};
// Initialize Firebase
var sampleDatabase;
if (!firebase.apps.length) {
  sampleDatabase = firebase.initializeApp(sampleConfig);
}
export default sampleDatabase.database().ref();
