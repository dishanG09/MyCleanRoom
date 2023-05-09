import { useState } from "react";
import React from "react";
import loginLock from "../assets/login.jpg";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { baseURL } from "../constant";

const Homepage = () => {
  const navigation = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const handleLogin = () => {
    const payload = JSON.stringify({ username: userName, password });

    fetch(baseURL + "/api/auth/login/supervisor", {
      method: "POST",
      body: payload,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
        navigation(routes.DASHBOARD, { replace: true });
      })
      .catch((err) => {
        if (err.status >= 500) alert("SERVER ERROR...Try again later");
        else alert("INVALID USERNAME or PASSWORD");
        setDisable(false);
      });
  };
  return (
    <div className="homepage-container" style={{ display: "flex" }}>
      <div
        className="image-container"
        style={{
          height: "100vh",
          width: "40vw",
          flex: 2,
        }}
      >
        <img src={loginLock} alt="lock" width="120%" height="100%" />
      </div>
      <div
        className="form-container"
        style={{
          flex: 3,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            height: "90%",
            width: "80%",
            marginLeft: "14%",
            borderRadius: "2%",
            boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "1.75em", textAlign: "center" }}>
            Welcome to MyCleanRoom
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDisable(true);
              handleLogin();
            }}
            style={{ backgroundColor: "", marginTop: "10%", marginLeft: "-5%" }}
          >
            <TextField
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              label="Username"
              style={{ width: "120%" }}
              required
            />
            <br />
            <br />
            <TextField
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              style={{ width: "120%" }}
              required
            />
            <br />
            <br />
            <br />
            <Button
              type="submit"
              variant="outlined"
              style={{ width: "120%", fontWeight: "bold", border: "2px solid" }}
              disabled={disable}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
