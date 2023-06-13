/// <reference types="vite/client" />

//Define the shape of the import.meta.env object
interface ImportMetaEnv {
    /**This is the key used to encrypt and decrypt Local storage data */
    VITE_CRYPTO_SALT: string,
    //**This is the key used to identify local storage data */
    VITE_LOCAL_STORAGE_KEY: string,
    /** This is the link to Sofia's Instagram */s
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
}