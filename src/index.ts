import "auth0-js";

const auth0Present: boolean = window.hasOwnProperty("auth0");

(document.getElementById("has-auth0") as HTMLElement).innerHTML = auth0Present ? "auth0 found in window" : "auth0 NOT found in window";
