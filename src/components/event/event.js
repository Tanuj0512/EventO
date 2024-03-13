import React, { useState, useEffect } from "react";
import * as Components from "../auth/Signup/Components";
import { storage, db } from "../../config/firebase";
import { useForm } from "react-hook-form";
import {
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  lisAll,
  list,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import "./event.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from "react-router-dom";

import DropdownWithTextField from "./dropdown";
import Venue from "./Venue";
import Ticket from "./tickets";
import Image from "./image";
import Aside from "../aside/aside";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

const EventInput = () => {
  let eventId = "";
  const defaultFile = banner;
  const [fileAddress, setFileAddress] = useState(defaultFile);
  const { register } = useForm();
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [plannerFirstName, setPlannerFirstName] = useState("");
  const [plannerLastName, setPlannerLastName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timeZone, setTimeZone] = useState("");
  const [notification, setNotification] = useState(false);
  const [file, setFile] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState();
  const [imageUrls, setImageUrls] = useState([]);
  const [percentage, setPercentage] = useState(0);
  //const idValue = useSelector((state) => state.id.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metadata = { contentType: "image/jpeg" };
  const viewEventId = sessionStorage.getItem("viewEventId");
  const [edit, setEdit] = useState(false);
  const handleAddSchedule = () => {
    // Logic to add schedule

    //if (file == null) return null;
    const imageRef = ref(storage, `testingphoto/${viewEventId}`);

    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("imageref", url);
        setImageUrls([url]);
      });
    });

    let eventData = {
      eventTitle,
      plannerFirstName,
      plannerLastName,
      eventCategory,
      venue,
      notification,
      imageUrls,
      eventAbout,
      startDate,
      endDate,
      mobile,
      email,
      count,
    };
    console.log("recheck", eventData.imageUrls);
    addEventToDatabase(eventData);
    navigate("/schedule");
  };
  const sessionId = sessionStorage.getItem("idValue");
  useEffect(() => {
    console.log(sessionId);
  }, [imageUrls, eventId]);

  const imageUpload = (data) => {
    //if (file == null) return null;
    console.log("inside upload", data);
    let imgurl = "";
    const imageRef = ref(storage, `eventImages/${viewEventId}`);
    //
    const uploadTask = uploadBytesResumable(imageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setPercentage(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },

      () => {
        // Upload completed successfully, now we can get the download URL

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          //setImageUrls(downloadURL);
          imgurl = downloadURL;
          //console.log("link",imgurl,imageUrls);
          addEventToDatabase(data, imgurl);
        });

        console.log("b4 add");

        console.log("after add");
      }
    );
  };

  const handleSubmission = async () => {
    let eventData = {
      eventTitle,
      plannerFirstName,
      plannerLastName,
      eventCategory,
      venue,
      notification,
      imageUrls,
      eventAbout,
      startDate,
      endDate,
      startTime,
      endTime,
      mobile,
      email,
    };

    // console.log("B4 Upload ",eventTitle);
    await imageUpload(eventData);

    console.log("Saved Moving To Details");
    navigate("/details");
  };

  const handleFileSelection = (event) => {
    setFile(event.target.files[0]);
    if (file) {
      console.log(file);
      console.log(URL.createObjectURL(file));
      const address = URL.createObjectURL(file);

      setFileAddress(address);
    }
  };

  return (
    <div className="CE-whole">
      {/* onSubmit={handleSubmit(submitForm)}  */}

      <form
        id="form"
        class="form"
        style={{
          padding: "3vh - 4vw",
          margin: "8vh 0vw ",

          border: "2px solid white",
          height: "fit-content",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="CE-outerbox">
          <div className="CE-detailswhole">
            <div className="CE-tophead">
              <div className="details-img">
                <img src="details.png" style={{ opacity: "60%" }} />
              </div>
              <div className="sp" style={{ paddingLeft: "2em" }}>
                <div className="CE-heading">Basic Information</div>
                <div className="CE-subHeading">
                  This section contains basic details realted to your event
                </div>
              </div>
            </div>

            <div className="CE-upperbox">
              <div className="CE-title_img">
                <div className="CE-title_desc">
                  <div className="CE-event_title">
                    <label htmlFor="eventTitle" class="CE-label">
                      Name of event
                    </label>

                    <input
                      class="CE-input-title"
                      placeholder=" Event Title"
                      name="name"
                      type="text"
                      value={eventTitle}
                      onChange={(e) => {
                        setEventTitle(e.target.value);
                        sessionStorage.setItem(
                          "eventId",
                          sessionId + "-" + e.target.value
                        );
                      }}
                    />
                  </div>

                  <div className="CE-event_desc">
                    <label htmlFor="Event Description" class="CE-label">
                      Event Description
                    </label>

                    <textarea
                      class="CE-textarea-desc"
                      placeholder=" Event Description"
                      type="text"
                      value={eventAbout}
                      onChange={(e) => {
                        setEventAbout(e.target.value);
                        sessionStorage.setItem("eventAbout", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="CE-image">
                  <Image />
                </div>
              </div>

              <div className="CE-basic">
                <div className="CE-pc">
                  <label htmlFor="participants" class="CE-label">
                    Number of Participants
                  </label>

                  <input
                    class="CE-input-part"
                    placeholder={count}
                    type="text"
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value);
                      sessionStorage.setItem("count", e.target.value);
                    }}
                  />
                </div>

                <div className="pc">
                  <DropdownWithTextField />
                </div>
              </div>
            </div>

            <div className="CE-border"></div>

            <div className="CE-tophead1">
              <div className="details-img" style={{ marginLeft: "-3vw" }}>
                <img
                  src="venue.png"
                  style={{ opacity: "50%", height: "50px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Location</div>
                <div className="CE-subHeading">
                  Let attendees know where to show up.
                </div>
              </div>
            </div>

            <div className="ED-venue">
              <Venue />
            </div>

            <div className="CE-border"></div>

            <div className="CE-tophead1">
              <div className="details-img" style={{ marginLeft: "-3vw" }}>
                <img
                  src="schedule.png"
                  style={{ opacity: "40%", height: "45px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Session</div>
                <div className="CE-subHeading">
                  Tell attendees about date and time.
                </div>
              </div>
            </div>

            
           
            <div className="CE-border" style={{ marginTop: "1vw" }}></div>
            <div className="CE-tophead1">
              <div className="details-img" style={{ marginLeft: "-3vw" }}>
                <img
                  src="price.png"
                  style={{ opacity: "40%", height: "45px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Tickets</div>
                <div className="CE-subHeading">Get your event monetize</div>
              </div>
            </div>

            <div className="ED-Tickets">
              <Ticket />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventInput;
