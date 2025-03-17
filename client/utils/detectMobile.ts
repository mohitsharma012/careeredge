import MobileDetect from "mobile-detect";

export const isMobileDevice = (userAgent: string) => {
    const md = new MobileDetect(userAgent);
    return !!md.mobile();
};
