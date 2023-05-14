import React, { useState } from "react";
import AnalyticsTab from "./AnalyticsTab";
import StaffTab from "./StaffTab";
import StaffModal from "../components/StaffModal";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";

const NavItem = ({ label, tab, tabHandler }) => {
  return (
    <p
      style={{
        backgroundColor:
          label.toLocaleUpperCase() === tab ? "rgba(255,255,255,0.8)" : "",
        borderRadius: "6px",

        width: "90%",
        textAlign: "center",
        padding: "3%",
        margin: "0",
        cursor: "pointer",
      }}
      onClick={tabHandler}
    >
      {label}
    </p>
  );
};

const Dashboard = () => {
  const navigator = useNavigate();

  const [tab, setTab] = useState("HOME");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const renderComponent = (tab) => {
    if (tab === "HOME") return <AnalyticsTab />;
    else if (tab === "STAFF") {
      return (
        <StaffTab modalHandler={setShowModal} modalDataHandler={setModalData} />
      );
    }
  };

  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "John";

  return (
    <div
      className="dashboard-container"
      style={{ display: "flex", position: "relative" }}
    >
      {showModal && (
        <div
          style={{
            zIndex: "1",
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <StaffModal data={modalData} modalHandler={setShowModal} />
        </div>
      )}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffc756",
          height: "100vh",
          alignItems: "center",
          flexWrap: "nowrap",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0.5px 0px 5px 0.15px rgba(0,0,0,0.5)",
        }}
      >
        <h2>{"Welcome " + username}</h2>
        <NavItem tab={tab} tabHandler={(e) => setTab("HOME")} label={"Home"} />
        <NavItem
          tab={tab}
          tabHandler={(e) => setTab("STAFF")}
          label={"Staff"}
        />
        <NavItem
          tab={tab}
          label={"Logout"}
          tabHandler={(e) => {
            localStorage.removeItem("token");
            navigator(routes.HOME_PAGE, { replace: true });
          }}
        />
      </div>
      <div style={{ flex: 4, height: "100vh", overflowY: "auto" }}>
        {renderComponent(tab)}
      </div>
    </div>
  );
};

export default Dashboard;
