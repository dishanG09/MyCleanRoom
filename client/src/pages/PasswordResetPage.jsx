import React, { useEffect, useState } from "react";
import { baseURL } from "../constant";
import PasswordResetModal from "../components/PasswordResetModal";

const PasswordResetPage = () => {
  const [reqs, setReqs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch the requests;

    fetch(baseURL + "/api/user/password-reset-request-list", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((data) => {
        setReqs(data["requests"]);
        setLoading(false);
      })
      .catch((e) => {
        alert("something went wrong");
      });
  }, []);

  const updateData = (id) => {
    let tmpReqs = reqs.filter((req) => req["rollNo"] !== id);
    setReqs(tmpReqs);
  };

  return (
    <div className="password-reset-container" style={{ position: "relative" }}>
      {showPopUp && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <PasswordResetModal
            updateHandler={updateData}
            data={user}
            setShowPopUp={setShowPopUp}
          />
        </div>
      )}
      <h2 style={{ textAlign: "center" }}>Requests for password reset</h2>
      {loading ? (
        <h2
          style={{
            textAlign: "center",
            verticalAlign: "middle",
            position: "fixed",
            left: "50%",
            top: "35%",
          }}
        >
          Fetching Data...
        </h2>
      ) : reqs.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            verticalAlign: "middle",
            position: "fixed",
            left: "50%",
            top: "35%",
          }}
        >
          No request in the queue
        </h2>
      ) : (
        <div>
          {reqs.map((req) => (
            <div
              key={req["rollNo"]}
              style={{
                backgroundColor: "white",
                boxShadow: "1px 1px 5px 0.1px rgba(0,0,0,0.5)",
                margin: "0 10%",
                padding: "2%",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ flex: 5, margin: 0 }}>
                {"Name : " + req["name"]}{" "}
                <span
                  style={{
                    color: "grey",
                    marginTop: "2px",
                    fontSize: "14px",
                    display: "block",
                  }}
                >
                  {"Roll No : " + req["rollNo"]}
                </span>
              </p>
              <button
                style={{
                  flex: 1,
                  padding: "2px 10px",
                  borderRadius: "4px",
                  border: "0.5px solid",
                  fontSize: "16px",
                  backgroundColor: "#ffc756",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setUser(req);
                  setShowPopUp(true);
                }}
              >
                reset
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordResetPage;
