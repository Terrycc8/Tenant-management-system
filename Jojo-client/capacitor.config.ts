import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.terry-chan.app",
  appName: "Jojo",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
