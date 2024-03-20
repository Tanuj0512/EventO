import React, { useState, useEffect, useRef } from "react";
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
import ShareBtn from "../share/share.js";
import dayjs from "dayjs";
import Modal from "../Modal/Modal.jsx";
import location from "./images/venue.png";
import date from "./images/schedule.png";
import sider from "./images/sider.png";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


const View_event = () => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [startDate, setStartDate] = useState(null); // Initialize with null
  const [endDate, setEndDate] = useState("");
  // const [startTime, setStartTime] = useState("12:00");
  // const [endTime, setEndTime] = useState("12:00");
  const [eventCategory, setEventCategory] = useState("");
  const [schedule, setSchedule] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [edit, setEdit] = useState(true);

  const viewEventId = sessionStorage.getItem("viewEventId");
  let type = sessionStorage.getItem("type");
  //console.log(viewEventId);
  useEffect(() => {
    fetchEventData();
  }, []);

  const data = {
    Event_name: eventName,
    Event_category: eventCategory,
    Event_organizor: eventOrganizer,
    Event_venue: eventAddress,
    Event_start: startDate,
    Event_end: endDate,
    // Event_startTime: startTime,
    // Event_endTime: endTime,
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
        const eventaddress = eventData.Event_venue;

        const eventAbout = eventData.Event_About;
        const eventOrganizer = eventData.Event_organizor;
        const eventContact = eventData.Event_Contact;
        const eventEmail = eventData.Event_email;
        const eventMobile = eventData.Event_mobile;

        // Convert Firebase Timestamp to JavaScript Date
        const eventStartDate = dayjs(eventData.Event_start).$d;
        const eventEndDate = dayjs(eventData.Event_end).$d;
        const eventStartTime = eventData.Event_startTime;
        const eventEndTime = eventData.Event_endTime;

        setImageUrl(imageUrl);
        setEventName(eventname);
        setEventAddress(eventaddress);
        setStartDate(eventStartDate);
        setEndDate(eventEndDate);
        // setStartTime(eventStartTime);
        // setEndTime(eventEndTime);
        setEventAbout(eventAbout);
        setEventOrganizer(eventOrganizer);
        setEventContact(eventContact);
        setEventMobile(eventMobile);
        setEventEmail(eventEmail);
        console.log(eventOrganizer);
        console.log(imageUrl);
        sessionStorage.setItem("currEvent", eventname);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      console.log(viewEventId);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="container">
      <div className="navbar">
        <div>
          <Header />
        </div>
      </div>
      <div className="VE-imgOverlay">
        <div className="outerBox">
          <div className="Title">
            <input
              disabled={edit}
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              className="EventName"
            ></input>{" "}
            {sessionStorage.getItem("type") ? (
              edit == true ? (
                <div className="EditButton">
                  <button
                    className="btn"
                    onClick={() => {
                      setEdit(!edit);
                      //navigate("/myprofileupdate");
                    }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  className="btn"
                  onClick={() => {
                    saveData();
                    setEdit(!edit);
                  }}
                >
                  Save
                </button>
              )
            ) : (
              <button className="btn"> Map Event</button>
            )}
          </div>
          <div className="VE-upperBox">
            <div className="VE-internalLeft">
              <div className="VE-Image">
                {imageUrl ? (
                  <img src={imageUrl} className="VE-Image" alt="Event" />
                ) : (
                  <img
                    className="VE-Image"
                    src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                    alt="Placeholder"
                  />
                )}
              </div>
            </div>

            <div className="VE-contentLeft">
              {/* <b className="desc-head">Description</b> */}
              <div className="VE1">
                <label className="desc-head" for="Organiser">
                  Organiser
                </label>
                <input
                  onChange={(e) => setEventOrganizer(e.target.value)}
                  value={eventOrganizer}
                  className="tag1 "
                  disabled={edit}
                />{" "}
              </div>
              <div className="VE-content">
                <div className="VE2">
                  <label className="VE-Heading1" for="EventCategory">
                    Type
                  </label>
                  <input
                    onChange={(e) => setEventCategory(e.target.value)}
                    value={eventCategory}
                    className="tag1"
                    disabled={edit}
                  />{" "}
                </div>

                <div className="VE-Nop">
                  <label className="VE-Heading1" for="Nop">
                    No. of participants
                  </label>
                  <input className="tag1" />
                </div>
              </div>

              <div className="Description">
                <img
                  className="VE-Heading1"
                  src={location}
                  style={{
                    width: "6vh",
                    marginLeft: "-1vw",
                    paddingTop: "10px",
                  }}
                />
                <input
                  onChange={(e) => setEventAddress(e.target.value)}
                  value={eventAddress}
                  className="tag1"
                  disabled={edit}
                />
              </div>

              <div style={{ height: "3vh" }}></div>

              <div className="Description">
                {edit == true ? (
                  <>
                    <img
                      className="VE-Heading1"
                      src={date}
                      style={{ width: "4vh", paddingTop: "10px" }}
                    />
                    <div className="VE1">
                      <span className="tag1">{formatDate(startDate)}</span>
                    </div>
                    <div className="VE1">
                      <span className="tag1">{formatDate(endDate)}</span>
                    </div>
                  </>
                ) : (
                  <div className="VE-dateInner">
                    <div className="VE1">
                      <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        className="tag1"
                        disabled={edit}
                      />{" "}
                      {/* <input
                        type="time"
                        onChange={(e) => setStartTime(e.target.value)}
                        value={endDate}
                        className="tag1"
                        disabled={edit}
                      /> */}
                    </div>

                    {/* Event end  */}
                    <div className="VE1">
                      <input
                        class="tag1"
                        placeholder=" Event End"
                        // style={{ Width: "50%" }}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />{" "}
                      {/* <input
                        type="time"
                        onChange={(e) => setEndTime(e.target.value)}
                        value={endDate}
                        className="tag1"
                        disabled={edit}
                      /> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="VE-lowerbox">
            <div className="VE-internalRight">
              <b className="desc-head" style={{ marginLeft: "1vw" }}>
                About Event
              </b>
              <div className="VE-About">
                <input
                  disabled={edit}
                  className="viewtag11"
                  value={eventAbout}
                  onChange={(e) => setEventAbout(e.target.value)}
                />{" "}
              </div>

              <div className="VE-contact">
                <b className="desc-head">Contact Details</b>

                <div className="CD">
                  <div className="VE-flex">
                    <div className="VE1">
                      <label className="VE-Heading1" for="Phone">
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
                      <label className="VE-Heading1" for="email">
                        Email{" "}
                      </label>
                      <input
                        onChange={(e) => setEventEmail(e.target.value)}
                        value={eventEmail}
                        className="tag1"
                        disabled={edit}
                      />{" "}
                    </div>
                  </div>

                  <div className="VE-flex">
                    <div className="VE2">
                      <label className="VE-Heading1" for="linkdein">
                        Linkdein{" "}
                      </label>
                      <span className="tag1">Linkdein</span>
                    </div>

                    <div className="VE2">
                      <label className="VE-Heading1" for="twitter">
                        Twitter{" "}
                      </label>
                      <span className="tag1">Twitter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="VE-contentRight">
              <img className="VE-contentRight" src={sider} />
            </div>
          </div>
          <div className="VE-scheduleBlock">
            <div className="VE-schedule">
              <b className="desc-head">Agenda</b>
              <p className="VE-subHeading">
                Get the chronologically ordered list of schedules planned for
                your event.
              </p>
            </div>
            <div className="VE-Show">
              <button onClick={() => setOpenModal(true)} className="VE-button">
                {openModal ? "Hide " : "Show "}
              </button>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
            {/* {show && <div>Toggle Challenge</div>} */}
            <div className="sharebtn">
              <ShareBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_event;
