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
import { addscheduleToDatabase } from "../../utils/addSchedule";

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