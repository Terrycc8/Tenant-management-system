export let serverURL: string;

if (
  window.origin.includes("terry-chan.com") ||
  window.origin.includes("s3-website") ||
  window.origin.includes("capacitor://")
) {
  serverURL = "https://jojo.terry-chan.com";
} else if (window.location.href.includes("localhost")) {
  serverURL = "http://localhost:8300";
} else {
  throw new Error("Uknown envirment");
}

export default serverURL;
