import React, { useState } from "react";
import AnalyticsTab from "./AnalyticsTab";
import StaffTab from "./StaffTab";
import StaffModal from "../components/StaffModal";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";

const Dashboard = () => {
  const navigator = useNavigate();

  const [tab, setTab] = useState("HOME");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
        }}
      >
        <h2>Welcome Dishang</h2>
        <p
          style={{
            backgroundColor: tab === "HOME" ? "rgba(255,255,255,0.8)" : "",
            borderRadius: "6px",

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
            borderRadius: "6px",
            width: "90%",
            textAlign: "center",
            padding: "3%",
            cursor: "pointer",
          }}
          onClick={(e) => setTab("STAFF")}
        >
          Staff
        </p>
        <p
          style={{
            margin: 0,
            backgroundColor: tab === "LOGOUT" ? "rgba(255,255,255,0.750)" : "",
            borderRadius: "6px",
            width: "90%",
            textAlign: "center",
            padding: "3%",
            cursor: "pointer",
          }}
          onClick={(e) => {
            localStorage.removeItem("token");
            navigator(routes.HOME_PAGE, { replace: true });
          }}
        >
          Logout
        </p>
      </div>
      <div style={{ flex: 4, height: "100vh", overflowY: "auto" }}>
        {tab === "HOME" ? (
          <AnalyticsTab />
        ) : (
          <StaffTab
            modalHandler={setShowModal}
            modalDataHandler={setModalData}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
