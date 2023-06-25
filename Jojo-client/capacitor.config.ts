import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.terrychan2.app",
  appName: "HouseLink",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
