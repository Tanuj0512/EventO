import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const addscheduleToDatabase = async () => {
  const eventId = sessionStorage.getItem("eventId");
  let scheduleId = sessionStorage.getItem("scheduleTitle");
  let venue = sessionStorage.getItem("scheduleVenue");
  let description = sessionStorage.getItem("scheduleAbout");
  let startDate = sessionStorage.getItem("scheduleStartDate");
  let endDate = sessionStorage.getItem("scheduleEndDate");
  let startTime = sessionStorage.getItem("scheduleStartTime");
  let endTime = sessionStorage.getItem("scheduleEndTime");

  try {
    scheduleId = sessionStorage.getItem("scheduleId");
    console.log(scheduleId);
    await setDoc(doc(db, "event", eventId, "schedule", scheduleId), {
      schedule_title: scheduleId,
      schedule_startDate: startDate,
      schedule_endDate: endDate,
      schedule_startTime: startTime,
      schedule_endTime: endTime,
      schedule_Venue: venue,
      schedule_description: description,
    });
  } catch (err) {
    console.error(err);
  }
};
