import React, {useState} from "react";
import user from "./user.png";
import users from "./users.png";
import "./PageThree.css";
import Schedule from "../../schedule/schedule";
import { addEventToDatabase } from "../../utils/fireStoreUtils";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";
import {doc, setDoc,collection, query, getDocs } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";

const PageThree = ({onButtonClick}) => {

  let scheduleId = "";
  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");
  const eventId = sessionStorage.getItem("eventId");
  const navigate = useNavigate();
  
  
  const addscheduleToDatabase = async () => {
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
        schedule_notification: notification,
        schedule_description: description,
      });

      setscheduletitle("");
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
      setVenue("");
      setNotification(false);
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };
 

    return (
      <div className="PG-two-whole">
          <div>
            <Schedule/>
          </div> 
        {/* <input
          className="f6 grow br2 ph3 pv2 mb2 dib white submitButton"
          style={{
            borderStyle: "none",
            width: "20%",
            backgroundColor: "#664DE5",
          }}
          type="submit"
          value="Create Workspace"
          onClick={() => onButtonClick("pagefour")}
        /> */}
<footer>
              <div className="footer-butn">
                  <div className="footer-twobt">

                  
                  <button className="evtBack" onClick={() => onButtonClick("pagetwo")}> Back </button> 
                  <button className="evtSave" onClick={
                      ()=>{
                        addEventToDatabase();
                        addscheduleToDatabase();
                        
                          
                        toast.success("Schedule Saved Successfully!");
                        onButtonClick("pagefour")

                      }
                    }> Save </button> 
                    </div>
                  
              </div>
              </footer>
      </div>
    );
}

export default PageThree;