import React, { useState, useEffect } from "react";
// import "./View_event.css";
import "./ViewEvent.css";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  documentId,
} from "firebase/firestore";
import Header from "../header/header";
import { setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal.jsx";
import { mapEvent } from "../utils/mapEvent.js";
const View_event = () => {
  const [edit, setEdit] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [schedule, setSchedule] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const viewEventId = sessionStorage.getItem("viewEventId");
  //console.log(viewEventId);
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = sessionStorage.getItem("idValue");
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(db, "event");
      console.log(viewEventId);
      const eventQuery = query(
        eventsCollectionRef,
        where(documentId(), "==", viewEventId)
      );
      const querySnapshot = await getDocs(eventQuery);
      if (!querySnapshot.empty) {
        const eventData = querySnapshot.docs[0].data();
        const imageUrl = eventData.Event_IMAGE;
        const eventname = eventData.Event_name;
        const eventAddress = eventData.Event_venue;
        const eventStartTimestamp = eventData.Event_start;
        const eventEndTimeStamp = eventData.Event_end;
        const eventAbout = eventData.Event_About;
        const eventOrganizer = eventData.Event_organizor;
        const eventContact = eventData.Event_Contact;
        const eventEmail = eventData.Event_email;
        const eventMobile = eventData.Event_mobile;
        // const startTime = eventData.Event_StartTime;
        // const endTime = eventData.Event_endTime;
        // Convert Firebase Timestamp to JavaScript Date
        const eventStartDate = eventStartTimestamp.toDate();
        const eventEndDate = eventEndTimeStamp.toDate();
        setImageUrl(imageUrl);
        setEventName(eventname);
        setEventAddress(eventAddress);
        setStartDate(eventStartDate);
        setEndDate(eventEndDate);
        setEventAbout(eventAbout);
        setEventOrganizer(eventOrganizer);
        setEventContact(eventContact);
        setEventMobile(eventMobile);
        setEventEmail(eventEmail);
        // setStartTime(startTime);
        // setEndTime(endTime);
        sessionStorage.setItem("currEvent", eventname);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      console.log(viewEventId);
    }
  };

  const data = {
    Event_name: eventName,
    Event_category: eventCategory,
    Event_organizor: eventOrganizer,
    Event_venue: eventAddress,
    Event_start: startDate,
    Event_end: endDate,
    Event_notification: "true",
    Event_IMAGE: imageUrl,
    Event_About: eventAbout,
    Event_mobile: eventMobile,
    Event_email: eventEmail,
    // Event_startTime: startTime,
    // Event_endTime: endTime,
  };

  const dataref = doc(db, "event", viewEventId);
  const saveData = () => {
    updateDoc(dataref, data);
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div>
          <Header />
        </div>
      </div>
      <div className="outerBox">
        <div className="image-box">
          <div className="blur-bg">
            <div className="Image">
              {imageUrl ? (
                <img src={imageUrl} className="Image" alt="Event" />
              ) : (
                <img
                  className="Image"
                  src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                  alt="Placeholder"
                />
              )}
            </div>
          </div>
          {sessionStorage.getItem("type") ? (
            edit == true ? (
              <button
                className="edit-button"
                onClick={() => {
                  setEdit(!edit);
                  //navigate("/myprofileupdate");
                }}
              >
                Edit
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => {
                  saveData();
                  setEdit(!edit);
                  //navigate("/myprofileupdate");
                }}
              >
                Save
              </button>
            )
          ) : (
            <button className="edit-button">Map Event</button>
          )}
        </div>

        <div className="Title">
          <input
            disabled={edit}
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
            className="tag "
            style={{ fontSize: "40px" }}
          ></input>
        </div>

        <div className="lowerbox">
          <div className="desc">
            <div className="Heading">
              <b className="desc-head">About Event</b>

              <div className="Orgdetail">
                <div className="VE1">
                  <label className="Heading1" for="Organiser">
                    Organiser
                  </label>

                  <input
                    onChange={(e) => setEventOrganizer(e.target.value)}
                    value={eventOrganizer}
                    className="tag1 "
                    disabled={edit}
                  />
                </div>
                <div className="VE2">
                  <label className="Heading1" for="EventCategory">
                    Type
                  </label>
                  <input
                    onChange={(e) => setEventCategory(e.target.value)}
                    value={eventCategory}
                    className="tag1"
                    disabled={edit}
                  />
                </div>
              </div>

              <div className="Description">
                <label className="Heading1" for="description">
                  Description{" "}
                </label>

                <input
                  disabled={edit}
                  className="viewtag11"
                  value={eventAbout}
                  onChange={(e) => setEventAbout(e.target.value)}
                />
              </div>
            </div>

            <div className="Heading">
              <b className="desc-head">When And Where</b>

              <div className="WW">
                <div
                  className="Where"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div className="VE1">
                    <label className="Heading1" for="Date">
                      Date
                    </label>

                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      className="tag1"
                      disabled={edit}
                    />
                    <input
                      type="time"
                      onChange={(e) => setStartTime(e.target.value)}
                      value={endDate}
                      className="tag1"
                      disabled={edit}
                    />
                    <input
                      class="CE-input_sch"
                      placeholder=" Event End"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="VE2">
                    <label className="Heading1" for="Time">
                      Time
                    </label>
                    <input
                      type="time"
                      onChange={(e) => setEndTime(e.target.value)}
                      value={endDate}
                      className="tag1"
                      disabled={edit}
                    />
                  </div>
                </div>
                <div className="Description">
                  <label className="Heading1" for="Address">
                    Address
                  </label>
                  <input
                    onChange={(e) => setEventAddress(e.target.value)}
                    value={eventAddress}
                    className="tag111"
                    disabled={edit}
                  />
                </div>
              </div>
            </div>

            <div className="Heading">
              <b className="desc-head">Contact Details</b>

              <div className="CD">
                <div className="VE1">
                  <label className="Heading1" for="Phone">
                    Mobile
                  </label>

                  <input
                    onChange={(e) => setEventMobile(e.target.value)}
                    value={eventMobile}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    className="tag1"
                    id=" hed"
                    disabled={edit}
                  />
                </div>

                <div className="VE2">
                  <label className="Heading1" for="email">
                    Email{" "}
                  </label>
                  <input
                    onChange={(e) => setEventEmail(e.target.value)}
                    value={eventEmail}
                    className="tag1"
                    disabled={edit}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="VE-Schedule">
            <div className="VE-schedule">
              <b>Schedule</b>
            </div>

            <button onClick={() => setOpenModal(true)} className="VE-button">
              Show
            </button>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_event;

// const fetchScheduleData = async ()=>{
//   try {
//     const scheduleCollectionRef = collection(db, "event",viewEventId,"schedule");
//     const scheduleQuerySnapshot = await getDocs(scheduleCollectionRef);

//     if (!scheduleQuerySnapshot.empty) {
//       const scheduleList = [];
//       scheduleQuerySnapshot.forEach((doc) => {
//         const scheduleData = doc.data();
//         const imageUrl = scheduleData.Event_IMAGE;
//         const eventname = scheduleData.Event_name;
//         const eventaddress = scheduleData.Event_address;
//         const eventStartTimestamp = scheduleData.Event_start;
//         const eventStartDate = eventStartTimestamp.toDate();
//         const eventId = scheduleData.Event_id;
//         console.log("Empty !");

//         scheduleList.push({
//           imageUrl,
//           eventname,
//           eventaddress,
//           eventStartDate,
//           eventId,
//         });
//       });

//       setSchedule(scheduleList);
//     }
//   } catch (error) {
//     console.error("Error retrieving s data:", error);
//   }
// }
