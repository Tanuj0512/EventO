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
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShareBtn from "../share/share.js";
import dayjs from "dayjs";
import Modal from "../Modal/Modal.jsx";
import location from "./images/venue.png";
import date from "./images/schedule.png";
import sider from "./images/sider.png";
import { mapEvent, unMapEvent } from "../utils/mapEvent.js";
import Download from "../Download/download.js";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Schedules from "../view_schedule/View_sch.js";
import svg from "./images/remove.svg";
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
  const [eventCount, setEventCount] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [edit, setEdit] = useState(true);
  const [mapStatus, setMapStatus] = useState(false);
  const viewEventId = sessionStorage.getItem("viewEventId");
  const [mapBtnTxt, setMapBtnTxt] = useState("Map Event");
  let type = sessionStorage.getItem("type");
  //console.log(viewEventId);
  useEffect(() => {
    fetchEventData();
    mapCheck(viewEventId);
  }, []);

  const navigate = useNavigate();
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
    Event_count: eventCount,
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
        const eventCount = eventData.Event_count;
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
        setEventCount(eventCount);
        console.log(eventOrganizer);
        console.log(imageUrl);
        sessionStorage.setItem("currEvent", eventname);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      console.log(viewEventId);
    }
  };

  const mapCheck = async (id) => {
    const sessionId = sessionStorage.getItem("idValue");
    const collectionRef = collection(db, "user", sessionId, "AttendEvents");
    const eventQuery = query(collectionRef, where(documentId(), "==", id));
    const newdata = await getDocs(eventQuery);
    if (newdata?.docs[0]?.data()) {
      setMapStatus(true);
      setMapBtnTxt("Unmap Event");
    } else {
      setMapStatus(false);
      setMapBtnTxt("Map Event");
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
          <div className="Event-butns">
            <div className="Socials">
              <div className="VE-EditBut">
                {sessionStorage.getItem("type") ? (
                  edit == true ? (
                    <div className="Download-but">
                      <button
                        class="Btn"
                        onClick={() => {
                          setEdit(!edit);
                        }}
                      >
                        <svg height="1em" viewBox="0 0 512 512">
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>

                        <span class="tooltip">Edit</span>
                      </button>
                    </div>
                  ) : (
                    // <div className="EditButton">
                    //   <button
                    //     className="btn"
                    //     onClick={() => {
                    //       setEdit(!edit);

                    //     }}
                    //   >
                    //     Edit
                    //   </button>
                    // </div>
                    <div className="Download-but">
                      <button
                        class="Btn"
                        onClick={() => {
                          saveData();
                          setEdit(!edit);
                        }}
                      >
                        <svg
                          class="save-regular"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                        >
                          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                        </svg>

                        <span class="tooltip">Save</span>
                      </button>
                    </div>
                    // <button
                    //   className="btn"
                    //   onClick={() => {
                    //     saveData();
                    //     setEdit(!edit);
                    //   }}
                    // >
                    //   Save
                    // </button>
                  )
                ) : mapStatus ? (
                  <button
                    className="Btn"
                    onClick={() => {
                      mapCheck(viewEventId);
                      unMapEvent(viewEventId);
                    }}
                  >
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14"
                      />
                    </svg>

                    <span class="tooltip" style={{ bottom: "-48px",width:"10vw" }}>
                      Remove from
                      <br /> calendar
                    </span>
                    {/* {mapBtnTxt} */}
                  </button>
                ) : (
                  <button
                    className="Btn"
                    onClick={() => {
                      mapCheck(viewEventId);
                      mapEvent(viewEventId);
                    }}
                  >
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="tooltip" style={{ bottom: "-48px" }}>
                      Add to <br /> calendar
                    </span>

                    {/* {mapBtnTxt} */}
                  </button>
                )}
              </div>

              <div className="Download-but">
                <button
                  class="Btn"
                  onClick={() => {
                    navigate("/download");
                  }}
                >
                  <span class="button__icon">
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>

                  <span class="tooltip">Download</span>
                </button>
              </div>

              <div className="Share-btn">
                <ShareBtn />
              </div>
            </div>
          </div>
          <div className="Title">
            <input
              disabled={edit}
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              className="EventName"
            ></input>{" "}
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
                  {edit == false ? (
                    <select
                      id="CE-dropdown"
                      value={eventCategory}
                      onChange={(e) => {
                        setEventCategory(e.target.value);
                        console.log(eventCategory, e.target.value);
                      }}
                    >
                      <option value="">Select...</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Sports">Sports</option>
                      <option value="Community">Community</option>
                      <option value="Business">Business</option>
                      <option value="Art">Art</option>
                      <option value="Technology">Technology</option>
                      <option value="Religious">Religious</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Educational">Educational</option>
                      <option value="Others">Others</option>
                    </select>
                  ) : (
                    <span className="tag1">{eventCategory}</span>
                  )}
                </div>

                <div className="VE-Nop">
                  <label className="VE-Heading1" for="Nop">
                    No. of participants
                  </label>
                  <input
                    className="tag1"
                    value={eventCount}
                    onChange={(e) => setEventCount(e.target.value)}
                  />
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
                <textarea
                  disabled={edit}
                  className="VE-viewtag11"
                  value={eventAbout}
                  onChange={(e) => {
                    setEventAbout(e.target.value);
                  }}
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
            {/* <div>
              <Schedules />
            </div> */}
            {/* <div className="sharebtn">
              <ShareBtn />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_event;
