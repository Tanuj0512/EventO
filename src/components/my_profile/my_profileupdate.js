import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  updateDoc,
  doc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Header from "../header/header";
import "./my_profile.css";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const sessionId = sessionStorage.getItem("idValue");
  console.log(sessionId);
  useEffect(() => {
    fetchData();
    // Clean up the Firestore listener when the component is unmounted
    return () => {
      // No listener to clean up in this case, but you can add it if needed
    };
  }, []);
  const fetchData = async () => {
    try {
      const usersCollectionRef = collection(db, "user");
      const userQuery = query(
        usersCollectionRef,
        where(documentId(), "==", sessionId)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const imageUrl = userData.profile_pic;
        setImageUrl(imageUrl);
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const mobile = userData.mobile;
        const email = userData.email;
        const username = userData.username;
        setFirstName(firstName);
        setLastName(lastName);
        setMobileNumber(mobile);
        setEmail(email);
        setUsername(username);
        //console.log(firstName);
      }
    } catch (error) {
      console.error("Error retrieving image URL:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
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
  // }
  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logged out");
  };

  //

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "70px auto",
          minHeight: "80vh",
          width: "50vw",
          padding: "10px",
          border: "3px solid",
          color: "#AF68EF",
          borderRadius: "",
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
          }}
        >
          <h1 style={{ marginTop: "0px" }}> My Profile </h1>
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

        <a
          onClick={saveData}
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
            color: "#182EF2",
          }}
        >
          Save
        </a>
        <form style={{ position: "relative", marginBottom: "10px" }} >
          <div>
            <input
              placeholder={firstName}
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder={lastName}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder={mobileNumber}
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
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder={email}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Myprofile">{/* <auth /> */}</div>
          <div>
            <input
              placeholder={username}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                //top: "500px"
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
