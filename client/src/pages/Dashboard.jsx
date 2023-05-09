import React, { useState } from "react";
import AnalyticsTab from "./AnalyticsTab";

const Dashboard = () => {
  const [tab, setTab] = useState("HOME");

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffc756",
          height: "100vh",
          alignItems: "center",
          flexWrap: "nowrap",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Welcome Dishang</h2>
        <p
          style={{
            backgroundColor: tab === "HOME" ? "rgba(255,255,255,0.750)" : "",
            borderRadius: "10px",
            width: "90%",
            textAlign: "center",
            padding: "3%",
            margin: "0",
            cursor: "pointer",
          }}
          onClick={(e) => setTab("HOME")}
        >
          Home
        </p>
        <p
          style={{
            margin: 0,
            backgroundColor: tab === "STAFF" ? "rgba(255,255,255,0.750)" : "",
            borderRadius: "10px",
            width: "90%",
            textAlign: "center",
            padding: "3%",
            cursor: "pointer",
          }}
          onClick={(e) => setTab("STAFF")}
        >
          Staff
        </p>
      </div>
      <div style={{ flex: 4, height: "100vh" }}>
        {tab === "HOME" ? <AnalyticsTab /> : <div>staff tab</div>}
      </div>
    </div>
  );
};

export default Dashboard;
