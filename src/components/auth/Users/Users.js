/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import styles from "./Users.module.css";
import Header from "../../header/header";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";
import { getDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
//import userEvent from "@testing-library/user-event";

import UserContext from "../../../Context/UserContext";
//import { curr_id } from "../Signup/CallOtp";
import { usertype } from "../Signup/Slice";
import { useSelector, useDispatch } from "react-redux";

const Users = () => {
  const navigate = useNavigate();
  const idValue = useSelector((state) => state.id.value);
  const userCollectionRef = collection(db, "user");
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(true);

  //console.log(idValue);
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("idValue");
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  const userChangetoattend = () => {
    setType(false);
    sessionStorage.removeItem("type");
    dispatch(usertype(false));
    navigate("/attendevents");
  };
  const userChangetoorg = () => {
    setType(true);
    sessionStorage.setItem("type", true);
    dispatch(usertype(true));
    navigate("/orghome");
  };
  //console.log(curr_id);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div>
          <Header />
        </div>
      </div>

      <div className={styles.outerBox}>
        <h1 className={styles.header1}>Choose your User Type !!</h1>

        <div className={styles.butsec}>
          <div className={styles.in}>
            <button
              onClick={() => {
                userChangetoorg();
              }}
              className={styles.buttonn}
            >
              <img
                src="org.png"
                className="imgg"
                style={{
                  height: "25vh",
                  width: "14vw",
                  marginTop: "-2vh",
                  marginLeft: "-1vw",
                }}
              ></img>
            </button>
            <b>
              {" "}
              <p style={{ color: "black", margin: "12vh", fontSize: "25px" }}>
                Organiser
              </p>{" "}
            </b>
            <p
              style={{
                marginTop: "25vh",
                marginTop: "-11vh",
                fontStyle: "italic",
                color: "grey",
                width: "16vw",
                marginLeft: "2vw",
              }}
            >
              "Be a Organizer and create stunning events "
            </p>
          </div>

          <div className={styles.in}>
            <button
              onClick={() => {
                userChangetoattend();
              }}
              className={styles.buttonn}
            >
              <img
                src="attend.png"
                style={{
                  height: "28vh",
                  width: "20vw",
                  marginTop: "-3vh",
                  marginLeft: "0vw",
                }}
              ></img>
            </button>
            <b>
              {" "}
              <p style={{ color: "black", margin: "12vh", fontSize: "25px" }}>
                Attendee
              </p>{" "}
            </b>
            <p
              style={{
                marginTop: "25vh",
                marginTop: "-11vh",
                fontStyle: "italic",
                color: "grey",
                width: "16vw",
                marginLeft: "2vw",
              }}
            >
              "Attend events of your choice "
            </p>
          </div>

          <div className={styles.in}>
            <button onClick={() => {}} className={styles.button}>
              <img src="admin.png" style={{ height: "12vh" }}></img>
            </button>
            <b>
              {" "}
              <p style={{ color: "black", margin: "12vh", fontSize: "25px" }}>
                Admin
              </p>{" "}
            </b>
            <p
              style={{
                marginTop: "25vh",
                marginTop: "-11vh",
                fontStyle: "italic",
                color: "grey",
                width: "16vw",
                marginLeft: "2vw",
              }}
            >
              "ssshhhh!! Strictly Coders "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Users;