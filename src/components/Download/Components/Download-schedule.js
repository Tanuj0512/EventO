import React, { useState, useEffect } from "react";

import { db } from "../../../config/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  documentId,
  orderBy
} from "firebase/firestore";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function DownloadSchedule() {
  let scheduleId = "";
  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [schedules, setSchedule] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");
  const eventId = sessionStorage.getItem("eventId");
  const navigate = useNavigate();
  const viewEventId = sessionStorage.getItem("viewEventId");
  const viewScheduleId = sessionStorage.getItem("currScheduleId");
  const eventRef = doc(db, "event", viewEventId );
  const scheduleRef = collection(eventRef, "schedule");

  useEffect(() => {
    fetchScheduleData();
  }, []);

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


  return (
    <div>
      <div className="D-CE-heading">Schdeules</div>
      {schedules.map((schedule, index) => (
        <div>
          <div className="D-event_title">
            <label class="Dlabel" placeholder="D-Schedule Name">
              Schedule Name
            </label>

            <span class="D-input-title">{scheduletitle}</span>
          </div>

          <div className="D-Schedule">
            <div className="D-session">
              <label class="Dlabel">Schedule Begin</label>

              <div className="D-box">
                <span
                  class="D-input_sch"
                  onChange={(e) => setEndDate(e.target.value)}
                >
                  {schedule.scheduleStartDate}
                </span>

                <input
                  disabled
                  class="D-input_sch"
                  placeholder=" Event Start"
                  type="time"
                />
              </div>
            </div>

            <div className="D-session">
              <label class="Dlabel">Schedule End</label>
              <div className="D-box">
                <span
                  class="D-input_sch"
                  onChange={(e) => setEndDate(e.target.value)}
                >
                  {schedule.scheduleEndDate}
                </span>
                <input
                  disabled
                  class="D-input_sch"
                  placeholder=" Event Start"
                  type="time"
                />
              </div>
            </div>
          </div>

          <div className="D-event_title">
            <label class="Dlabel" placeholder="Schedule Name">
              Location
            </label>

            <span
              class="D-input-title"
              onChange={(e) => setVenue(e.target.value)}
            >
              {schedule.scheduleVenue}
            </span>
          </div>

          <div className="D-event_desc">
            <label htmlFor="Event Description" class="Dlabel">
              Event Description
            </label>

            <span
              class="D-textarea-desc"
              onChange={(e) => setDescription(e.target.value)}
            >
              {schedule.scheduleVenue}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DownloadSchedule;
