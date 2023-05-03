//This is the user's type which can either be admin or limited
export type userType = "admin" | "limited"

/** This property is used to specify if the user has been onboarded or not. It can either be incomplete 
* if the user is yet to even see the dialog, notifications if the user has seen the first page of the 
* onboarding dialog that shows notifications and complete if the user has completed the onboarding process 
* by enabling notifications and installing the app as a PWA. 
*/
export type onboardingState = "incomplete" | "notifications" | "complete"

/**
 * This property indicates the current skit that is being played
 */
export type currentSkit = "none" | "nameSkit"