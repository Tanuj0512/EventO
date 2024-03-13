import "./View_sch.css";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function View_sch() {
  const [show, setShow] = useState(true);

  const [edit, setEdit] = useState(false);
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");

  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [schedules, setSchedule] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const viewEventId = sessionStorage.getItem("viewEventId");

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
    } else {
    }
  };

  return (
    <div className="scheduleright">
      {schedules.map((schedule) => (
        <div className="contentt">
          <div className="VS-title">{schedule.scheduleTitle}</div>
          <button>Edit</button>
          <button>Delete</button>

          <div className="VS-But">
            <button
              className="VS-view"
              onClick={() => {
                console.log(schedule);
                sessionStorage.setItem(
                  "currScheduleId",
                  schedule.scheduleTitle
                );
                 navigate("/specificsch");
              }}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default View_sch;
