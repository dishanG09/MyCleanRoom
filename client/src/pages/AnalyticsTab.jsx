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
import { Pie, Line } from "react-chartjs-2";

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 5,
      stepSize: 0.5,
    },
    x: {},
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels,
  datasets: [
    {
      label: `Average Ratings Year - ${new Date().getFullYear()}`,
      data: [1, 2, 3, 2, 5, 0, 0, 0, 0, 0, 0, 0],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Card = ({ lable, value }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        height: "65%",
        width: "20%",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "1.5px 1.56px 3px 1px rgba(0,0,0,0.25)",
        wordWrap: "break-word",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.25rem",
          margin: 0,
        }}
      >
        {lable}
      </p>
      <p style={{ margin: 0, marginTop: "5px", fontSize: "2rem" }}>{value}</p>
    </div>
  );
};

const AnalyticsTab = () => {
  const [loading, setLoading] = useState(true);

  const [maxRating, setMaxRating] = useState(5);
  const [minRating, setMinRating] = useState(0);
  const [roomCnt, setRoomCnt] = useState(11);
  const [totalCnt, setTotalCnt] = useState([6, 10, 30, 20, 11, 3]);

  useEffect(() => {
    // fetch Data
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="analytics-container" style={{}}>
      {loading ? (
        <h1
          style={{
            textAlign: "center",
            position: "absolute",
            top: "30%",
            left: "52%",
          }}
        >
          Fetching Data...
        </h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            height: "100vh",
          }}
        >
          <h3
            style={{
              fontSize: "1.5em",
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            Today's Analytics
          </h3>
          <div
            className="analytics-card"
            style={{
              flex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Card lable="Total Room Cleaned" value={roomCnt} />
            <Card lable="Max Rating" value={maxRating} />
            <Card lable="Min Rating" value={minRating} />
            <Card lable="Average Rating" value={(minRating + maxRating) / 2} />
          </div>
          <div
            className="analytics-chart"
            style={{
              backgroundColor: "",
              flex: 4,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "40%",
                height: "80%",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2%",
                flexDirection: "column",
                boxShadow: "1.5px 1.56px 3px 1px rgba(0,0,0,0.25)",
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
                      data: totalCnt,
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
              <p style={{ margin: 0, textAlign: "center" }}>
                Rating wise total count
              </p>
            </div>
            <div
              style={{
                width: "40%",
                height: "80%",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                padding: "2%",
                boxShadow: "1.5px 1.56px 3px 1px rgba(0,0,0,0.25)",
              }}
            >
              <Line options={options} data={data} />
              <p>Yearly Average Ratings</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTab;
