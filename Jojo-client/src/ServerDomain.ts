export let serverURL: string;

if (window.location.href.includes("localhost")) {
  serverURL = "http://localhost:8100";
} else {
  serverURL = "http://192.168.80.105:8100";
}

export default serverURL;
