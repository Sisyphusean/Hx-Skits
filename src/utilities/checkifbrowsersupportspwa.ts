/**
 * This function checks if a browser supports PWA by checking if it supports service workers, link relList and manifest
 * @returns {boolean} isPwaSupported
 */

export const checkIfBrowserSupportsPwa = () => {

    /**
    * This variable is used to store the result of the check for PWA support
    */
    let isPwaSupported: boolean = false
   
    const hasAdvancedUserExperience = 'serviceWorker' in navigator;
    const hasWebPushNotifications = 'PushManager' in window;
    const hasHomeScreen = 'BeforeInstallPromptEvent' in window;
    const hasGeolocation = 'geolocation' in navigator;
    const hasVideoImageCapturing = 'ImageCapture' in window;
    const hasBluetooth = 'bluetooth' in navigator;
   
    // Add this line to exclude Samsung Internet Browser, Opera browser, 
    // firefox and other browsers with dodgy pwa support
    const excludedBrowsers = ['SamsungBrowser', 'OPR', 'Firefox', "Opera"];
    if (excludedBrowsers.some((browser) => navigator.userAgent.includes(browser))) {
      return false;
    }
   
    if (hasAdvancedUserExperience && hasWebPushNotifications && hasHomeScreen && hasGeolocation && hasVideoImageCapturing && hasBluetooth) {
    isPwaSupported = true
    }
   
    return isPwaSupported
   }
   