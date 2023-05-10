/// <reference types="vite/client" />

//Define the shape of the import.meta.env object
interface ImportMetaEnv {
    VITE_CRYPTO_SALT: string,
    VITE_LOCAL_STORAGE_KEY: string,
}