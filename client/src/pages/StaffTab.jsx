import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { baseURL } from "../constant";

const StaffCard = ({ data, modalDataHandler, modalHandler }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "10px",

        margin: "0 10%",
        marginBottom: "10px",
        boxShadow: "1.5px 1.5px 6px 1px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ float: "left", flex: 3 }}>
        <p>{"Name : " + data["name"]}</p>
        <p style={{ margin: 0, color: "rgba(0,0,0,0.5)" }}>
          {"Average Rating : " + parseFloat(data["rating"]).toPrecision(2)}
        </p>
        <p style={{ margin: 0, color: "rgba(0,0,0,0.5)" }}>
          {"Room cleaned : " + data["cnt"]}
        </p>
      </div>
      <Button
        disabled={parseInt(data["cnt"]) === 0}
        style={{ flex: 1 }}
        variant="outlined"
        onClick={(e) => {
          modalDataHandler(data);
          modalHandler(true);
        }}
      >
        View Details
      </Button>
    </div>
  );
};

const StaffTab = ({ modalDataHandler, modalHandler }) => {
  const [loading, setLoading] = useState(true);
  const [hkStaff, setHKStaff] = useState([]);

  useEffect(() => {
    fetch(baseURL + "/api/user/get-users/hkstaff", {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((data) => {
        let mp = new Map();
        const { stats, hkstaff } = data;

        stats.forEach((stat) => {
          mp.set(stat["_id"], stat["avg_rating"] + ":" + stat["feedbackCount"]);
        });

        let tmp = [];

        hkstaff.forEach((user) => {
          let cnt = 0;
          let rating = 0;

          let str = mp.has(user["hkId"]) ? mp.get(user["hkId"]) : "0:0";

          rating = str.split(":")[0];
          cnt = str.split(":")[1];

          tmp.push({ ...user, cnt, rating });
        });

        setHKStaff(tmp);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="staff-container">
      <h2 style={{ textAlign: "center" }}>House Keeping Staff</h2>
      {hkStaff.map((user) => {
        return (
          <StaffCard
            data={user}
            key={user["hkId"]}
            modalDataHandler={modalDataHandler}
            modalHandler={modalHandler}
          />
        );
      })}
    </div>
  );
};

export default StaffTab;
