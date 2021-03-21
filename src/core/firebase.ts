import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

export const draftManager = firebase.initializeApp(config)

export const draftDatabase = draftManager.database();

export default draftManager;
