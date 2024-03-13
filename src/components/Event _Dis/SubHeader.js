import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Subheader.module.css";

let btnType = sessionStorage.getItem("type");
console.log(btnType);

export const SubHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{ margin: "0" }}>Events </h1>
      </div>

      <div className={styles.headerbtn}>
        <div>
          <button
            className={styles.btn}
            onClick={() => {
              navigate("");
            }}
          >
            List{" "}
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              sessionStorage.getItem("type") ?(navigate("/Calendar")):(navigate("/Calendaratnd"));
            }}
          >
            Calendar
          </button>
        </div>

        {sessionStorage.getItem("type") ? (
          <div className={styles.alleventsbtn}>
            <button
              class="continue-application"
              onClick={() => {
                navigate("/crtevnets");
              }}
            >
              <div>
                <div class="pencil"></div>
                <div class="folder">
                  <div class="top">
                    <svg viewBox="0 0 24 27">
                      <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                    </svg>
                  </div>
                  <div class="paper"></div>
                </div>
              </div>
              Create Event
            </button>
          </div>
        ) : (
          <div className={styles.alleventsbtn}>
            <button
              className={styles.cssbuttonsiobutton}
              onClick={() => {
                navigate("/headerevent");
              }}
            >
              All Events
              <div className={styles.iconn}>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
