export let ioServerURL: string;

if (
  window.origin.includes("terry-chan.com") ||
  window.origin.includes("s3-website") ||
  window.origin.includes("capacitor://") ||
  window.origin.includes("localhost")
) {
  ioServerURL = "wss://jojo.terry-chan.com";
} else {
  throw new Error("Uknown envirment");
}

export default ioServerURL;
