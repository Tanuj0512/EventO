import "./View_sch.css";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  query,
  where,
  documentId,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import { Height, SpaRounded } from "@mui/icons-material";
import Calendar from "../Calendar/Calendar";
import { borderRadius } from "@mui/system";
import { useNavigate } from "react-router-dom";
// import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";

import ScheduleInfo from "../specific_sch/specific_sch";

function View_sch() {
  const [show, setShow] = useState(true);
  const [schedules, setSchedule] = useState([]);
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [Venue, setVenue] = useState("");
  const navigate = useNavigate();
  const eventRef = doc(db, "event", "8OkkhqzX1clf3U0FoZJ5");
  const scheduleRef = collection(eventRef, "schedule");
  const viewEventId = sessionStorage.getItem("viewEventId");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchScheduleData();
  }, [imageUrls]);

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

  const addscheduleToDatabase = async () => {
    try {
      await addDoc(scheduleRef, {
        Organizor_image: imageUrls[0],
        schedule_title: scheduletitle,
        schedule_venue: Venue,
        schedule_description: description,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    if (file == null) return;
    const imageRef = ref(storage, `schedule/${file.name}.${v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
      });
    });
  };

  const onSubmit = () => {
    handleUpload();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="scheduleright">
      {schedules.map((schedule, index) => (
        <TabContext
          defaultTab={schedules[0].scheduleTitle}
          orientation="vertical"
          value={value}
        >
          <div className="VE-test">
          <TabList onChange={handleChange}>
            <Tab
              value={schedule.scheduleTitle}
              label={schedule.scheduleTitle}
              onClick={() => {
                sessionStorage.setItem(
                  "currScheduleId",
                  schedule.scheduleTitle
                );
              }}
            />
          </TabList>
          <div className="Tabbox">
            <TabPanel value={schedule.scheduleTitle}>
              {/* <h1>{schedule.scheduleTitle}</h1> */}
              <div className="SS-cont">
                <div className="SS-event_title">
                  <label class="SS-label" placeholder="Schedule Name">
                    Name
                  </label>

                  <span class="SS-input-title">{schedule.scheduleTitle}</span>
                </div>

                <div className="SS-Schedule">
                  <div className="SS-session">
                    <label class="SS-label">Begin</label>
                    <span
                      class="SS-input_sch"
                      // onChange={(e) => setEndDate(e.target.value)}
                    >
                      {schedule.scheduleStartDate}
                    </span>
                  </div>

                  <div className="SS-session">
                    <label class="SS-label">End</label>

                    <span
                      class="SS-input_sch"
                      onChange={(e) => setEndDate(e.target.value)}
                    >
                      {schedule.scheduleEndDate}- End Time
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
                    {schedule.scheduleVenue}
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
                    {schedule.scheduleDescription}
                  </span>
                </div>
              </div>
            </TabPanel>
          </div>
          </div>
        </TabContext>
      ))}
    </div>
  );
}

export default View_sch;
