export const authEndpoint = "https://accounts.spotify.com/authorize";

const CLIENT_ID = "ebdac79023bf4a9c9d09161d76066f70";
const redirectUri = "http://localhost:8080/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = (): Array<any> => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: Array<any>, item: string) : Array<any> => {
      let parts: Array<any> = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, new Array<any>());
};

export const GET_AUTH_URL = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
