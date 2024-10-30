import axios from "axios";
import React, { useEffect } from "react";
import httpClient from "../helper/httpClient";

const Protected = () => {
  useEffect(() => {
    httpClient
      .get("/protected")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleGetRefreshToken = () => {
    axios
      .get("http://localhost:5000/refresh-token", {
        headers: { refreshtoken: `${localStorage.getItem("my-refresh-token")}` },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('my-token', res.data.token)
        localStorage.setItem('my-refresh-token', res.data.refresh_token)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return <div>
    <button onClick={handleGetRefreshToken}>get refresh token</button>
  </div>;
};

export default Protected;
