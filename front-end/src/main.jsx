import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEBJm6UQetK4nLDgqRgC1lJEwT0LU72is",
  authDomain: "full-stack-react-de8a9.firebaseapp.com",
  projectId: "full-stack-react-de8a9",
  storageBucket: "full-stack-react-de8a9.firebasestorage.app",
  messagingSenderId: "328317439106",
  appId: "1:328317439106:web:f5a1840c9f124ebf9cf89b",
  measurementId: "G-B69B74BK9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
