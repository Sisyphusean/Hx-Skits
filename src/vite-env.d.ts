/// <reference types="vite/client" />

//Define the shape of the import.meta.env object
interface ImportMetaEnv {
    /**This is the key used to encrypt and decrypt Local storage data */
    VITE_CRYPTO_SALT: string,
    //**This is the key used to identify local storage data */
    VITE_LOCAL_STORAGE_KEY: string,
    /** This is the link to Sofia's Instagram */
    VITE_SOFIA_INSTAGRAM: string,
    /**This is the link to Hyphonix's Youtube */
    VITE_HYPHONIX_YOUTUBE: string,
    /**This is the link to Hyphonix's Twitch Channel */
    VITE_HYPHONIX_TWITCH: string,
    /**This is used to check if the environment is set to dev or prod */
    VITE_ENV: string,
    /**This string specifies the prod Backend URL */
    BE_BASE_URL: string,
    /**This string specifies the dev Backend URL */
    DEV_BE_BASE_URL: string,
    /** This string specifies the login path URL */
    VITE_LOGIN_PATH: string,
    /** This string specifies the path used to authenticate the JWT */
    VITE_JWT_VALIDATION_PATH: string,
    /**This is the path for saving FCM tokens */
    VITE_FCM_SAVE_TOKEN: string,
    /**This is the path for validating FCM tokens */
    VITE_FCM_VALIDATE_TOKEN: string,
    /**This is the path for upating the FCM token's last received message */
    VITE_FCM_UPDATE_LAST_MESSAGE_ON: string,
    /**This is the secret key used in encrypting the JWT */
    VITE_JWT_SECRET: string,
    /**This is the firebase api key */
    VITE_FIREBASE_API_KEY: string,
    /**This is the firebase auth domain */
    VITE_FIREBASE_AUTH_DOMAIN: string,
    /**This is the firebase project id */
    VITE_FIREBASE_PROJECT_ID: string,
    /**This is the firebase storage bucket */
    VITE_FIREBASE_STORAGE_BUCKET: string,
    /**This is the firebase messaging sender id */
    VITE_FIREBASE_MESSAGING_SENDER_ID: string,
    /**This is the firebase app id */
    VITE_FIREBASE_APP_ID: string,
    /**This is the firebase Web Push certificate or Vapid Key*/
    VITE_FIREBASE_WEB_PUSH_CERTIFICATE: string,
    /** This is the indexed DB database */
    VITE_INDEXED_DB_DATABASE: string,
    /**This is the path for updating the live stream data */
    VITE_ADMIN_UPDATE_LIVESTREAM: string,
    /**This is the broadcast channel the service worker and React app use to communicate with each other */
    VITE_BROADCASTCHANNEL_NAME: string,
    /**This is the API path for updating the omelge tags*/
    VITE_ADMIN_UPDATE_OMEGLE_TAGS: string,
    /**This is the API path for deleting all of the omelge tags*/
    VITE_ADMIN_RESET_OMEGLE_TAGS: string,
    /**This is the path for getting the current omegle tags */
    VITE_USER_GET_OMEGLE_TAGS: string,
    /**This is the path for getting the current livestream platforms */
    VITE_USER_GET_LIVESTREAM: string,
}