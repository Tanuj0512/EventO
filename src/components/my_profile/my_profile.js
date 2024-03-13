import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  documentId,
  FieldPath,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "./my_profile.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setuserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [edit, setEdit] = useState(true);
  const sessionId = sessionStorage.getItem("idValue");
  const navigate = useNavigate();

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
        const imageUrl = userData.profile_pic;
        const firstname = userData.firstName;
        const lastname = userData.lastName;
        const mobile = userData.mobile;
        const email = userData.email;
        const username = userData.username;

        setImageUrl(imageUrl);
        setFirstName(firstname);
        setLastName(lastname);
        setMobileNumber(mobile);
        setEmail(email);
        setuserName(username);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };

  const data = {
    firstName: firstName,
    lastName: lastName,
    mobile: mobileNumber,
    email: email,
    username: username,
  };

  const dataref = doc(db, "user", sessionId);
  console.log(dataref);
  const saveData = () => {
    updateDoc(dataref, data);
    console.log(firstName, lastName);
    navigate("/myprofile");
    alert("Successfully Updated!");
  };

  return (
    <div
      className="my_profile"
      style={{
        margin: "0vh auto ",
        width: "-webkit-fill-available",
        height: "100%",
      }}
    >
      <div className="header">
        <Header />
      </div>

      <div
        className="profile-main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "70px auto",
          height: "100vh",
          width: "50vw",
          padding: "10px",
          border: "3px solid",
          color: "#AF68EF",
        }}
      >
        <div
          className="profile"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "30px",
            margin: "10px",
            color: "#F00000",
            marginTop: "10px",
            fontSize: "35px",
          }}
        >
          <h3 style={{ marginTop: "0px" }}> My Profile </h3>
        </div>

        <div className="profile-image">
          {imageUrl ? (
            <img src={imageUrl} style={{ width: "20vh", height: "20vh" }} />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2Fprofile_icon.jpg?alt=media&token=3d7d6c73-5e54-447f-be3f-a91b15c4c542"
              style={{ width: "20vh", height: "20vh" }}
            />
          )}
        </div>

        {edit == true ? (
          <a
            href="#"
            type="submit"
            style={{
              position: "relative",
              display: "block",
              left: "20vw",
              top: "-23vh",
              margin: "4px",
              fontFamily: "Roboto",
              padding: "4px",
              fontSize: "1.5em",
              color: "blue",
            }}
            onClick={() => {
              setEdit(!edit);
              //navigate("/myprofileupdate");
            }}
          >
            Edit
          </a>
        ) : (
          <a
            href="#"
            type="submit"
            style={{
              position: "relative",
              display: "block",
              left: "20vw",
              top: "-23vh",
              margin: "4px",
              fontFamily: "Roboto",
              padding: "4px",
              fontSize: "1.5em",
              color: "blue",
            }}
            onClick={() => {
              saveData();
              setEdit(!edit);
              //navigate("/myprofileupdate");
            }}
          >
            Save
          </a>
        )}

        <form style={{ position: "relative", marginBottom: "10px" }}>
          <div className="profile-data">
            <input
              value={firstName}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "rgb(242 240 245)",
                borderRadius: "5px",
                color: "#252525",
              }}
              type="text"
              disabled={edit}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="profile-data">
            <input
              value={lastName}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "rgb(242 240 245)",
                borderRadius: "5px",
                color: "#252525",
              }}
              type="text"
              disabled={edit}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "rgb(242 240 245)",
                borderRadius: "5px",
                color: "#252525",
              }}
              type="text"
              value={"+" + mobileNumber}
              disabled={edit}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              value={email}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "rgb(242 240 245)",
                borderRadius: "5px",
                color: "#252525",
              }}
              type="email"
              disabled={edit}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Myprofile">
            <auth />
          </div>
          <div>
            <input
              value={username}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                margin: "30px auto",
                alignItems: "50%",
                width: "30vw",
                height: "5vh",
                display: "block",
                fontFamily: "Roboto",
                fontSize: "17px",
                backgroundColor: "rgb(242 240 245)",
                borderRadius: "5px",
                color: "#252525",
              }}
              type="text"
              disabled={edit}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>

          <div className="Logoutbutton">
            <button
              style={{
                marginTop: "180px",
                margin: "4px auto",
                alignItems: "50%",
                width: "15vw",
                height: "5vh",
                display: "block",
                backgroundColor: "#7B43AC",
                fontFamily: "Roboto",
                fontSize: "17px",
                borderRadius: "20px",
                color: "#FFFFFF",
              }}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
