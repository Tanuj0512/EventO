import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import {
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  lisAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import "./preview.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import Aside from "../aside/aside";
// import { db } from "../../config/firebase";
import { query, where, getDocs, documentId } from "firebase/firestore";

// import { setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
// import { useSelector } from "react-redux";

const Preview = () => {
  let eventId = "";
  const defaultFile = banner;
  const [fileAddress, setFileAddress] = useState(defaultFile);
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventaddress, setEventAddress] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [eventStart, setEventStart] = useState(null); // Initialize with null
  const [eventCategory, setEventCategory] = useState("");
  // const [schedule, setSchedule] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const navigate = useNavigate();
  const viewEventId = sessionStorage.getItem("eventId");
const [schedules, setSchedule] = useState([]);
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
        const eventStartDate = eventStartTimestamp.toDate();

        setImageUrl(imageUrl);
        setEventName(eventname);
        setEventAddress(eventaddress);
        setEventStart(eventStartDate);
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

  const fetchScheduleData = async () => {
    const scheduleCollectionRef = query(
      collection(db, "event", viewEventId, "schedule"),
      orderBy("schedule_startDate")
    );
    const scheduleQuerySnapshot = await getDocs(scheduleCollectionRef);
    const scheduleList = [];
    if (!scheduleQuerySnapshot.empty) {
      scheduleQuerySnapshot.forEach((doc) => {
        const scheduleData = doc.data();
        const scheduleTitle = scheduleData.schedule_title;
        const scheduleStartDate = scheduleData.schedule_startDate;
        const scheduleEndDate = scheduleData.schedule_endDate;
        const scheduleVenue = scheduleData.schedule_Venue;
        const scheduleDescription = scheduleData.schedule_description;

        scheduleList.push({
          scheduleTitle,
          scheduleStartDate,
          scheduleEndDate,
          scheduleVenue,
          scheduleDescription,
        });
      });
      setSchedule(scheduleList);
    }
  };


  // const handleAddSchedule = () => {
  //   // Logic to add schedule

  //   //if (file == null) return null;
  //   const imageRef = ref(storage, `testingphoto/${viewEventId}`);

  //   uploadBytes(imageRef, file).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       console.log("imageref", url);
  //       setImageUrls([url]);
  //     });
  //   });

  //   let eventData = {
  //     eventTitle,
  //     plannerFirstName,
  //     plannerLastName,
  //     eventCategory,
  //     venue,
  //     notification,
  //     imageUrls,
  //     eventAbout,
  //     startDate,
  //     endDate,
  //     mobile,
  //     email,
  //   };
  //   console.log("recheck",eventData.imageUrls);
  //   addEventToDatabase(eventData);
  //   navigate("/schedule");
  // };
  const sessionId = sessionStorage.getItem("idValue");
  useEffect(() => {
    fetchEventData();
  }, []);
  //var createId=idValue + eventTitle;

  return (
    <div>
      <div className="preview-whole">
        {/* /Info  */}

        <div
          className="for-footer"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="P-outerBox">
            <div className="P-blur-bg">
              <div className="P-Image">
                {imageUrl ? (
                  <img src={imageUrl} className="P-Image" alt="Event" />
                ) : (
                  <img
                    className="P-Image"
                    src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                    alt="Placeholder"
                  />
                )}
              </div>
            </div>

            <div className="P-Title">
              <span className="P-tag ">{eventName}</span>
            </div>

            <div className="P-lowerbox" style={{ width: "75vw" }}>
              <div className="P-desc">
                <div className="P-Heading">
                  <b className="P-desc-head">About Event</b>

                  <div className="P-Orgdetail">
                    <div className="P-VE1">
                      <label className="P-Heading1" for="P-Organiser">
                        Organiser
                      </label>

                      <span className="P-tag1 ">{eventOrganizer}</span>
                    </div>
                    <div className="P-VE2">
                      <label className="P-Heading1" for="P-EventCategory">
                        Type
                      </label>
                      <span className="P-tag1">{eventCategory}</span>
                    </div>
                  </div>

                  <div className="P-Description">
                    <label className="P-Heading1" for="P-description">
                      Description{" "}
                    </label>

                    <span className="P-tag11">{eventAbout}</span>
                  </div>
                </div>

                <div className="P-Heading">
                  <b className="P-desc-head">When And Where</b>

                  <div className="P-WW">
                    <div
                      className="P-Where"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div className="P-VE1">
                        <label className="P-Heading1" for="Date">
                          Date
                        </label>

                        <input
                          type="date"
                          placeholder={eventStart}
                          className="tag1"
                          disabled
                        />
                      </div>
                      <div className="P-VE2">
                        <label className="P-Heading1" for="Time">
                          Time
                        </label>
                        <input
                          type="time"
                          placeholder={eventStart}
                          className="tag1"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="P-Description">
                      <label className="P-Heading1" for="Address">
                        Address
                      </label>
                      <span className="P-tag111">{eventaddress}</span>
                    </div>
                  </div>
                </div>

                <div className="P-Heading">
                  <b className="P-desc-head">Contact Details</b>

                  <div className="P-CD">
                    <div className="P-VE1">
                      <label className="P-Heading1" for="Phone">
                        Mobile
                      </label>

                      <span className="P-tag1" id=" hed">
                        {eventMobile}
                      </span>
                    </div>

                    <div className="P-VE2">
                      <label className="P-Heading1" for="email">
                        Email{" "}
                      </label>
                      <span className="P-tag1">{eventEmail}</span>
                    </div>
                  </div>

                  <div className="P-CD">
                    <div className="P-VE1">
                      <label className="P-Heading1">Linkdein</label>

                      <span className="P-tag1" id=" hed"></span>
                    </div>

                    <div className="P-VE2">
                      <label className="P-Heading1">Twitter</label>
                      <span className="P-tag1"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="VE-Schedule">
                <div className="VE-schedule">
                  <b>Schedule</b>
                </div>

                <button
                  onClick={() => setOpenModal(true)}
                  className="VE-button"
                >
                  Show
                </button>
                <Modal open={openModal} onClose={() => setOpenModal(false)} />
              </div> */}

              <div className="P-Schedule">
                {schedules.map((schedule, index) => (
                  <div className="P-schdeuleName">{schedule.scheduleTitle}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
