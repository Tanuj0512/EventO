import React, { useState, useEffect, useRef } from "react";
// import "./View_event.css";
// import './download.css';

import { db } from "../../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  documentId,
} from "firebase/firestore";
// import Header from "../header/header";
import { setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { UseSelector } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// import Modal from "../Modal/Modal.jsx";

const DownloadEvent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventaddress, setEventAddress] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [eventStart, setEventStart] = useState(null); // Initialize with null
  const [eventCategory, setEventCategory] = useState("");
  const [schedule, setSchedule] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [eventEmail, setEventEmail] = useState("");

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
        const eventaddress = eventData.Event_venue;
        const eventStartTimestamp = eventData.Event_start;
        const eventAbout = eventData.Event_About;
        const eventOrganizer = eventData.Event_organizor;
        const eventContact = eventData.Event_Contact;
        const eventEmail = eventData.Event_email;
        const eventMobile = eventData.Event_mobile;

        // Convert Firebase Timestamp to JavaScript Date
        // const eventStartDate = eventStartTimestamp.toDate();

        setImageUrl(imageUrl);
        setEventName(eventname);
        setEventAddress(eventaddress);
        // setEventStart(eventStartDate);
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

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="D-outerBox">
      <div className="D-Title">
        <span className="D-tag ">
          {eventName}
        </span>
      </div>
      <div className="D-upper">
        <div className="D-Image">
          {imageUrl ? (
            <img src={imageUrl} className="D-Image" alt="Event" />
          ) : (
            <img
              className="D-Image"
              src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
              alt="Placeholder"
            />
          )}
        </div>

        <div className="D-sidebox">
          <div className="D-VE1">
            <label className="D-Heading1" for="Organiser">
              Organiser
            </label>

            <span className="D-tag1 "> {eventOrganizer}</span>
          </div>

          <div className="D-VE1">
            <label className="D-Heading1">Date</label>

            <span className="D-tag1">{eventStart}</span>
          </div>

          <div className="D-VE1">
            <label className="D-Heading1">Time</label>
            <span className="D-tag1">{eventStart}</span>
          </div>
        </div>
      </div>

      <div className="D-Description">
        <label className="D-Heading1" for="Address">
          Address
        </label>
        <span className="D-tag111">{eventaddress}</span>
      </div>
      <div className="D-Description">
        <label className="D-Heading1" for="description">
          Description{" "}
        </label>

        <span className="D-viewtag11">{eventAbout}</span>
      </div>

      <div className="D-desc">
        {/* <div className="D-Heading">
            
            <div className="D-Orgdetail"></div>
          </div> */}
        <div className="D-VE1">
          <label className="D-Heading1" for="Phone">
            Mobile
          </label>

          <span
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            className="D-tag1"
            id=" hed"
          >
            {eventMobile}
          </span>
        </div>

        <div className="D-VE1">
          <label className="D-Heading1" for="email">
            Email{" "}
          </label>
          <span className="D-tag1">{eventEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default DownloadEvent;
