export let serverURL: string;

if (
  window.origin.includes("terry-chan.com") ||
  window.origin.includes("s3-website") ||
  window.origin.includes("capacitor://") ||
  window.origin.includes("http://localhost")
) {
  serverURL = "https://jojo.terry-chan.com";
} else {
  throw new Error("Uknown envirment");
}

export default serverURL;
