/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production';
        readonly PUBLIC_URL: string;
        readonly REACT_APP_FIREBASE_WEB_API_KEY: string;
        readonly REACT_APP_FIREBASE_AUTH_DOMAIN: string;
        readonly REACT_APP_FIREBASE_DATABASE_URL: string;
        readonly REACT_APP_FIREBASE_PROJECT_ID: string;
    }
}
