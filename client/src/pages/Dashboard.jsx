import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <div style={{ flex: 1, backgroundColor: "#ffc756", height: "100vh" }}>
        <p>Home</p>
        <p>Staff</p>
      </div>
      <div style={{ flex: 4, height: "100vh" }}></div>
    </div>
  );
};

export default Dashboard;
