import MobileDetect from "mobile-detect";

export const isMobileDevice = (userAgent) => {
    // const userAgent = navigator.userAgent;
    const md = new MobileDetect(userAgent);
    return !!md.mobile();
};
