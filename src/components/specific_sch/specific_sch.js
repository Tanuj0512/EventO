import React, { useState, useEffect } from "react";
import "./specific_sch.css";
import { db } from "../../config/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  documentId,
  updateDoc,
} from "firebase/firestore";
import Header from "../header/header";
import Calendar from "../Calendar/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Specific_sch() {
  let scheduleId = "";
  const [scheduletitle, setscheduletitle] = useState("");
  const [edit, setEdit] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [schedules, setSchedule] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");
  const eventId = sessionStorage.getItem("eventId");
  const navigate = useNavigate();
  const eventRef = doc(db, "event", "8OkkhqzX1clf3U0FoZJ5");
  const scheduleRef = collection(eventRef, "schedule");
  const viewEventId = sessionStorage.getItem("viewEventId");
  const viewScheduleId = sessionStorage.getItem("currScheduleId");

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    const scheduleCollectionRef = collection(db,"event",viewEventId,"schedule");
    // const scheduleList = [];
    // if (!scheduleQuerySnapshot.empty) {
    //   scheduleQuerySnapshot.forEach((doc) => {
    const scheduleQuery = query(
      scheduleCollectionRef,
      where(documentId(), "==", viewScheduleId)
    );
    const querySnapshot = await getDocs(scheduleQuery);
    if (!querySnapshot.empty) {
      const scheduleData = querySnapshot.docs[0].data();
      const scheduleTitle = scheduleData.schedule_title;
      const scheduleStartDate = scheduleData.schedule_startDate;
      const scheduleEndDate = scheduleData.schedule_endDate;
      const scheduleVenue = scheduleData.schedule_Venue;
      const scheduleDescription = scheduleData.schedule_description;
      console.log(scheduleData);
      const sDate = scheduleStartDate;
      const eDate = scheduleEndDate;
      setscheduletitle(scheduleTitle);
      setVenue(scheduleVenue);
      setStartDate(sDate);
      setEndDate(eDate);
      setDescription(scheduleDescription);
    }
  };

  const data = {
    schedule_title: scheduletitle,
    schedule_startDate: startDate,
    schedule_endDate: endDate,
    schedule_Venue: Venue,
    schedule_description: description,
  };

  const dataref = doc(db, "user", viewEventId, "schedule", viewScheduleId);

  const saveData = () => {
    updateDoc(dataref, data);
    console.log("updated schedule");
  };

  return (
    <div>
      <div className="header_schedule" style={{}}>
        <Header />
      </div>
      <div className="VSS-Outerbox">
        <div className="schBody-right">
          <div className="VSS-tophead">
            <div className="details-img">
              <img
                src="viewSch.png"
                style={{ opacity: "60%", height: "6vh" }}
              />
            </div>
            <div className="sp" style={{ paddingBottom: "5vh" }}>
              <div className="CE-heading">Schedules</div>
            </div>
          </div>

          {edit == true ? (
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                saveData();
                setEdit(!edit);
              }}
            >
              Save
            </button>
          )}

          <div style={{ marginLeft: "-3vw" }}>
            <div className="CE-event_title">
              <label class="CE-label" placeholder="Schedule Name">
                Schedule Name
              </label>

              <input
                disabled={edit}
                placeholder="Name"
                type="text"
                class="VSS-input-title"
                value={scheduletitle}
              />
            </div>
            <div className="CS-Schedule">
              <div className="CE-session">
                <label class="CE-label">Schedule Begin</label>

                <div className="CE-box">
                  <input
                    disabled={edit}
                    class="CE-input_sch"
                    placeholder={startDate}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <input
                    disabled={edit}
                    class="CE-input_sch"
                    placeholder=" Event Start"
                    type="time"
                  />
                </div>
              </div>

              <div className="CE-session">
                <label class="CE-label">Schedule End</label>
                <div className="CE-box">
                  <input
                    disabled={edit}
                    class="CE-input_sch"
                    placeholder={endDate}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <input
                    disabled={edit}
                    class="CE-input_sch"
                    placeholder=" Event Start"
                    type="time"
                  />
                </div>
              </div>
            </div>

            <div className="CE-event_title">
              <label class="CE-label" placeholder="Schedule Name">
                Location
              </label>

              <input
                disabled={edit}
                placeholder="Location"
                type="text"
                class="VSS-input-title"
                value={Venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="VSS-event_desc">
              <label htmlFor="Event Description" class="CE-label">
                Event Description
              </label>

              <textarea
                disabled={edit}
                class="VSS-textarea-desc"
                placeholder=" Event Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="VSS-footer-butn">
          <div className="VSS-footer-twobt">
            <button
              className="VSS-evtBack"
              onClick={() => {
                navigate("/viewevent");
              }}
            >
              {" "}
              Back{" "}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Specific_sch;
