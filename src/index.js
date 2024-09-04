import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const firebaseConfig = {
  apiKey: "AIzaSyBosp_uYONR-XHMNZlslXesIC2iBjtREBQ",
  authDomain: "scan-project-577cb.firebaseapp.com",
  projectId: "scan-project-577cb",
  storageBucket: "scan-project-577cb.appspot.com",
  messagingSenderId: "144814154269",
  appId: "1:144814154269:web:045d05235ad5ecd6695cf4",
  measurementId: "G-6BDBQCKSZB"
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const app = initializeApp(firebaseConfig);
getAnalytics(app);
reportWebVitals();