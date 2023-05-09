import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

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
      <div style={{ float: "left" }}>
        <p>Name : Dishang</p>
        <p style={{ margin: 0, color: "rgba(0,0,0,0.5)" }}>
          Average Rating : 3.54
        </p>
        <p style={{ margin: 0, color: "rgba(0,0,0,0.5)" }}>
          Room cleaned : 150
        </p>
      </div>
      <Button
        style={{ marginLeft: "60%" }}
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
  useEffect(() => {
    // fetch all feedbacks and aggregated staff memeber wise
  }, []);

  return (
    <div className="staff-container">
      <h2 style={{ textAlign: "center" }}>House Keeping Staff</h2>
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
      <StaffCard
        modalDataHandler={modalDataHandler}
        modalHandler={modalHandler}
      />
    </div>
  );
};

export default StaffTab;
