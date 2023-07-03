"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getFirebaseCloudMessengerToken = exports.messaging = exports.firebaseApp = void 0;
//Firebase
var app_1 = require("firebase/app");
var messaging_1 = require("firebase/messaging");
var messaging_2 = require("firebase/messaging");
var firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
var vapidKey = import.meta.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE;
exports.firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.messaging = (0, messaging_1.getMessaging)(exports.firebaseApp);
var getFirebaseCloudMessengerToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = messaging_1.getToken;
                _b = [exports.messaging];
                _c = {
                    vapidKey: vapidKey
                };
                return [4 /*yield*/, navigator.serviceWorker.getRegistration()];
            case 1: 
            //Get Token but pass in Vite's service worker to work with Firebase
            return [2 /*return*/, _a.apply(void 0, _b.concat([(_c.serviceWorkerRegistration = _d.sent(),
                        _c)])).then(function (firebaseToken) {
                    return firebaseToken;
                }, function (reject) {
                    console.error("Failed to get Firebase token: ", reject);
                    return false;
                })["catch"](function (error) {
                    console.log("Error getting Firebase token: ", error);
                    return false;
                })];
        }
    });
}); };
exports.getFirebaseCloudMessengerToken = getFirebaseCloudMessengerToken;
(0, messaging_2.onMessage)(exports.messaging, function (payload) {
    console.log("Message received. ", payload);
    // ...
});
