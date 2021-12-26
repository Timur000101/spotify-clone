export const authEndpoint = "https://accounts.spotify.com/authorize";

const CLIENT_ID = "7b48e85c4f0a48059348e1cc83b511f5";
const redirectUri = "http://localhost:8080/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-collaborative",
  "playlist-modify-public",
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
