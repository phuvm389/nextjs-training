import React, { useState } from "react";
import axios from "axios";
import httpClient from "../helper/httpClient";
import { useRouter } from 'next/router'
import { setStorage } from "../helper/storage";

const Login = () => {
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginWithCookieHttpOnly = () => {
    axios.post("http://localhost:5000/login-cookie-http-only", { username, password }, {withCredentials: true})
    .then(res => {
      console.log(res.data)
      axios.get("http://localhost:5000/protected-cookie", {withCredentials: true}).then(res => {
        console.log(res.data)
      })
    });
  };

  const handleLoginRefreshToken = () => {
    axios.post("http://localhost:5000/login-refresh-token", { username, password })
    .then(res => {
      console.log(res.data)
      setStorage('my-token', res.data.token);
      setStorage('my-refresh-token', res.data.refresh_token);
      router.push('/media')
    });
  }

  const handleLogin = () => {
    httpClient.post("/login", { username, password })
    .then(res => {
      console.log(res.data)
      localStorage.setItem('my-token', res.data.token)    
    });
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLoginRefreshToken}>Login</button>
    </div>
  );
};

export default Login;
