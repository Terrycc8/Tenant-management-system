export let ioServerURL: string;

if (
  window.origin.includes("terry-chan.com") ||
  window.origin.includes("s3-website") ||
  window.origin.includes("capacitor://")
) {
  ioServerURL = "ws://jojo.terry-chan.com";
} else if (window.location.href.includes("localhost")) {
  ioServerURL = "ws://localhost:8300";
} else {
  throw new Error("Uknown envirment");
}

export default ioServerURL;
