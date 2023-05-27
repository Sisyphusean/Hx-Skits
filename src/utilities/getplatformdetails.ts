import { platform } from "../types/types";

export const getPlatform = () => {
    const userAgent = window.navigator.userAgent;
    const maxTouchPoints = window.navigator.maxTouchPoints;
    let os: platform = 'unknown';

    if (userAgent.includes('Win')) {
        os = 'windows';
    } else if (userAgent.includes('Mac')) {
        if (maxTouchPoints > 0) {
            os = 'ios';
        } else {
            os = 'macos';
        }
    } else if (userAgent.includes('Linux')) {
        if (maxTouchPoints > 0) {
            os = 'android';
        } else {
            os = 'linux';
        }
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
        os = 'ios';
    }
    else if (userAgent.includes('Android')) {
        os = 'android';
    }

    return os;
}