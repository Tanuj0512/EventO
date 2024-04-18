/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import styles from "./Users.module.css";
import Header from "../../header/header";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";
import {
  getDoc,
  collection,
  where,
  documentId,
  query,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
//import userEvent from "@testing-library/user-event";

import UserContext from "../../../Context/UserContext";
//import { curr_id } from "../Signup/CallOtp";
import { usertype } from "../Signup/Slice";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Rating from "../../Rating/Rating";

const Users = () => {
  const navigate = useNavigate();
  const idValue = useSelector((state) => state.id.value);
  const userCollectionRef = collection(db, "user");
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const sessionId = sessionStorage.getItem("idValue");
  console.log(sessionId);

  //fetching users name
  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(db, "user");
      console.log(sessionId);
      const eventQuery = query(
        eventsCollectionRef,
        where(documentId(), "==", sessionId)
      );
      const querySnapshot = await getDocs(eventQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const firstname = userData.firstName;
        const lastname = userData.lastName;

        setFirstName(firstname);
        setLastName(lastname);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };

  const data = {
    firstName: firstName,
    lastName: lastName,
  };

  useEffect(() => {
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

  const adminpage = () => {
    // setType(true);
    if (sessionId === "918208961210") {
      sessionStorage.setItem("type", "admin");
      navigate("/admin");
    } else {
      console.log("else");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div>
          <Header />
        </div>
      </div>

      <div className={styles.outerBox}>
        <span className={styles.welcometext}>
          <h1>
            {" "}
            <div className={styles.nameee}>
              Hey <div style={{ color: "#f44336" }}> {firstName} </div> 👋
            </div>{" "}
            <br /><div className={styles.namee}>Welcome to EventO !!</div> 
          </h1>
        </span>
        <h4 className={styles.header1}>Make a selection</h4>

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
          {sessionId === "918208961210" && (
            <div className={styles.in}>
              <button
                onClick={() => {
                  adminpage();
                }}
                className={styles.button}
              >
                <img src="admin.png" style={{ height: "12vh" }}></img>
              </button>
              <b>
                <p style={{ color: "black", margin: "12vh", fontSize: "25px" }}>
                  Admin
                </p>
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
                "Authorized persons only!!"
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.rating}>
        <Rating />
      </div>
    </div>
  );
};
export default Users;
