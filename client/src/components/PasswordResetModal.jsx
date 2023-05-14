import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { baseURL } from "../constant";

const PasswordResetModal = ({ updateHandler, data, setShowPopUp }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    let tmpPass = password.trim();
    let tmpConfPass = confirmPassword.trim();

    if (tmpConfPass !== tmpPass) {
      alert("password mismatch");
      return;
    }

    fetch(baseURL + "/api/user/submit-new-password", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: data["rollNo"], newpassword: tmpPass }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((res) => {
        updateHandler(data["rollNo"]);
      })
      .catch((e) => alert("something went wrong"))
      .finally(() => setShowPopUp(false));
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        height: "70vh",
        width: "35vw",
        position: "fixed",
        top: "12%",
        left: "32%",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          margin: 0,
          float: "right",
          fontSize: "32px",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={(e) => setShowPopUp(false)}
      >
        &times;
      </div>
      <h2 style={{ textAlign: "center" }}> Passowrd Reset</h2>
      <p style={{ margin: "0 10px" }}>{"Roll No : " + data["rollNo"]}</p>
      <br />
      <p style={{ margin: "0 10px" }}>{"Name : " + data["name"]}</p>
      <form
        style={{ margin: "10% 25%" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          required
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
          type="password"
        />
        <br />
        <br />
        <TextField
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          label={"Confirm Password"}
          type="password"
        />
        <br />
        <br />
        <Button type="submit" style={{ marginLeft: "25%" }} variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PasswordResetModal;
