import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { baseURL } from "../constant";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StaffModal = ({ data, modalHandler }) => {
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    fetch(baseURL + "/api/feedback/get-feedback/" + data["hkId"], {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        modalHandler(false);
        throw res;
      })
      .then(({ feedbacks }) => {
        let tmp = [0, 0, 0, 0, 0, 0];
        feedbacks.forEach((point) => {
          tmp[parseInt(point["_id"])] = point["count"];
        });
        setChartData(tmp);
      });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "25%",
        width: "50vw",
        height: "80vh",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          display: "inline-block",
          margin: 0,
          marginLeft: "37%",
          marginTop: "10px",
          fontSize: "1.5em",
        }}
      >
        Individual Rating
      </p>
      <p
        style={{
          display: "inline",
          marginTop: "10px",
          marginRight: "25px",
          cursor: "pointer",
          fontSize: "2rem",
          float: "right",
          fontWeight: "bold",
        }}
        onClick={(e) => modalHandler(false)}
      >
        &times;
      </p>
      <div
        style={{
          width: "40%",
          height: "80%",
          backgroundColor: "",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          padding: "2%",
          flexDirection: "column",
          marginLeft: "25%",
        }}
      >
        <Pie
          data={{
            labels: [
              "0 star",
              "1 star",
              "2 star",
              "3 star",
              "4 star",
              "5 star",
            ],
            datasets: [
              {
                label: "#feedbacks",
                data: chartData,
                backgroundColor: [
                  "rgba(210,50,64,0.4)",
                  "rgba(255,0,0,0.5)",
                  "rgba(0,255,0,0.5)",
                  "rgba(0,0,255,0.5)",
                  "rgba(255,255,0,0.5)",
                  "rgba(215,150,240,0.5)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
              },
            },
          }}
        />
        <p style={{ margin: 0, padding: "2%", textAlign: "center" }}>
          Overall rating wise feedback distribution
        </p>
      </div>
    </div>
  );
};

export default StaffModal;
