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
} from "firebase/firestore";
import Header from "../header/header";
import Calendar from "../Calendar/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Specific_sch(props) {
  // let scheduleId = "";
  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedules, setSchedule] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");
  const eventId = sessionStorage.getItem("eventId");
  const navigate = useNavigate();
  const viewEventId = sessionStorage.getItem("viewEventId");
  const viewScheduleId = sessionStorage.getItem("currScheduleId");
  let scheduleId = props.scheduleId;
  // console.log(scheduleId);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    const scheduleCollectionRef = collection(
      db,
      "event",
      viewEventId,
      "schedule"
    );
    // const scheduleList = [];
    // if (!scheduleQuerySnapshot.empty) {
    //   scheduleQuerySnapshot.forEach((doc) => {
    const scheduleQuery = query(
      scheduleCollectionRef,
      where(documentId(), "==", scheduleId)
    );
    const querySnapshot = await getDocs(scheduleQuery);
    if (!querySnapshot.empty) {
      const scheduleData = querySnapshot.docs[0].data();
      const scheduleTitle = scheduleData.schedule_title;
      const scheduleStartDate = scheduleData.schedule_startDate;
      const scheduleEndDate = scheduleData.schedule_endDate;
      const scheduleStartTime = scheduleData.schedule_startTime;
      const scheduleEndTime = scheduleData.schedule_endTime;
      const scheduleVenue = scheduleData.schedule_Venue;
      const scheduleDescription = scheduleData.schedule_description;
      //console.log(scheduleData);
      const sDate = scheduleStartDate;
      const eDate = scheduleEndDate;
      setscheduletitle(scheduleTitle);
      setVenue(scheduleVenue);
      setStartDate(sDate);
      setEndDate(eDate);
      setDescription(scheduleDescription);
      setStartTime();
      console.log("inside function", scheduleTitle);
    }
  };
  fetchScheduleData();

  return (
    <div>
      <div className="SS-cont">
        <div className="SS-event_title">
          <label class="SS-label" placeholder="Schedule Name">
            Name
          </label>

          <h1 class="SS-input-title">{description}</h1>
        </div>

        <div className="SS-Schedule">
          <div className="SS-session">
            <label class="SS-label">Begin</label>
            <span
              class="SS-input_sch"
              // onChange={(e) => setEndDate(e.target.value)}
            >
              {startDate}
            </span>
          </div>

          <div className="SS-session">
            <label class="SS-label">End</label>

            <span
              class="SS-input_sch"
              onChange={(e) => setEndDate(e.target.value)}
            >
              {endDate}- End Time
            </span>
          </div>
        </div>

        <div className="SS-event_title">
          <label class="SS-label" placeholder="Schedule Name">
            Location
          </label>

          <span
            class="SS-input-title"
            onChange={(e) => setVenue(e.target.value)}
          >
            {Venue}
          </span>
        </div>

        <div className="SS-event_desc">
          <label htmlFor="Event Description" class="SS-label">
            Description
          </label>

          <span
            class="SS-textarea-desc"
            onChange={(e) => setDescription(e.target.value)}
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Specific_sch;
