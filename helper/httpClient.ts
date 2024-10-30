import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

let token = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = `${localStorage.getItem("my-token")}`;
}

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axios
    .get("http://localhost:5000/refresh-token", {
      headers: { refreshtoken: `${localStorage.getItem("my-refresh-token")}` },
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem('my-token', tokenRefreshResponse.data.token)
      localStorage.setItem('my-refresh-token', tokenRefreshResponse.data.refresh_token)

      failedRequest.response.config.headers["Authorization"] = tokenRefreshResponse.data.token;
      return Promise.resolve();
    })
    .catch((error) => {
      localStorage.removeItem('my-token')
      localStorage.removeItem('my-refresh-token')
    });

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: token },
});

createAuthRefreshInterceptor(httpClient, refreshAuthLogic);


export default httpClient;
