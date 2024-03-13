
import "./Modal.css";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import { getDocs,collection,addDoc,deleteDoc,updateDoc,doc,} from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL,listAll,list,} from "firebase/storage";

import { useNavigate } from "react-router-dom";
import Viewsch from "../view_schedule/View_sch"


const Modal = ({ open, onClose }) => {
  const [show, setShow] = useState(true);
  const [schedules, setSchedule] = useState([ ]);

  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [Venue, setVenue] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const eventRef = doc(db, "event", "8OkkhqzX1clf3U0FoZJ5");
  const scheduleRef = collection(eventRef, "schedule");
  
  useEffect(() => {
    fetchScheduleData();
  }, [imageUrls]);
  
  const viewEventId = sessionStorage.getItem("viewEventId");

  

  const fetchScheduleData = async () => {
    const scheduleCollectionRef = collection(db, "event",viewEventId,"schedule"  );
    const scheduleQuerySnapshot = await getDocs(
      scheduleCollectionRef
    );
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

  if (!open) return null;


  

    
    
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
          <button class="close_button">
            <span class="X"></span>
            <span class="Y"></span>
            <div class="close">Close</div>
          </button>
          </p>
          <div className='content'>
            
            <h1 style={{
                  fontFamily:" sans-serif",
                  fontWeight: " 800",
                  color: "#3b0000",
                  fontSize: "x-large",
            }}>Schedules</h1>
            
          </div>
          <div className='btnContainer'>
          
      <Viewsch/>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default Modal;
// export default Modal;