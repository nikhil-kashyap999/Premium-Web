// hooks/useDeviceType.ts
import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop" | "widescreen";

interface DeviceInfo {
  type: DeviceType;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWidescreen: boolean;
}

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1536, // widescreen se upar sab desktop
};

function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.mobile) return "mobile";
  if (width < BREAKPOINTS.tablet) return "tablet";
  if (width < BREAKPOINTS.desktop) return "desktop";
  return "widescreen";
}

export function useDeviceType(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "desktop", // default fallback for SSR
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isWidescreen: false,
  });

  useEffect(() => {
    function updateDeviceInfo() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const type = getDeviceType(width);

      setDeviceInfo({
        type,
        width,
        height,
        isMobile: type === "mobile",
        isTablet: type === "tablet",
        isDesktop: type === "desktop",
        isWidescreen: type === "widescreen",
      });
    }

    // initial call — client mount ke baad hi accurate value milegi
    updateDeviceInfo();

    window.addEventListener("resize", updateDeviceInfo);
    return () => window.removeEventListener("resize", updateDeviceInfo);
  }, []);

  return deviceInfo;
}
