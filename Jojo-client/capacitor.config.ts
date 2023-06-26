import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.terrychan.jojo.houselink",
  appName: "HouseLink",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
