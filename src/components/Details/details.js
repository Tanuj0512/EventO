import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import { setDoc, collection, addDoc, deleteDoc, updateDoc, doc, Timestamp, getDoc, getDocs,} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, lisAll, list,} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from 'react-router-dom';
import { flushSync } from "react-dom";
import Aside from "../aside/aside"

function Details() {
  const [plannerName, setPlannerName] = useState("");
  // const [plannerLastName, setPlannerLastName] = useState("");
  const [plannerAddress, setPlannerAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [mobile,setMobile] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventId =sessionStorage.getItem("eventId");
  const sessionId = sessionStorage.getItem("idValue");
  let eventTitle = sessionStorage.getItem("eventTitle");
  console.log(eventTitle);
  let eventData = {
    plannerName,
    plannerAddress,
    linkedin,
    twitter,
    mobile,
    email,
  };
  
  sessionStorage.setItem("plannerName",plannerName);
  sessionStorage.setItem("mobile",mobile);
  sessionStorage.setItem("email",email);
  sessionStorage.setItem("linkedin",linkedin);
  sessionStorage.setItem("twitter",twitter);

  useEffect(() => {
    // updateEventDatabase(eventData);
    console.log(eventId);
  },
  [plannerName, plannerAddress, linkedin,
    twitter, mobile,
    email,]);

  // const updateEventDatabase = async(data)=>{
  //   console.log(eventId);
  //   await setDoc(doc(db, "event","Organizer", eventId),{
  //       Event_plannerFirstName: data.plannerFirstName,
  //       Event_plannerLastName: data.plannerLastName,
  //       Event_mobile: data.mobile,
  //       Event_email: data.email,
  //       Event_plannerAddress : data.plannerAddress,
  //       Event_twitter : data.twitter,
  //       Event_linkedin : data.linkedin,
  //     }); 
  // }


  return (
    <div>
     
<div className="details-whole">  




<div className="D-right">
<div className="D-outerbox">
  <div className="D-tophead1" >
            <div className="details-img">
              <img src = "organiser.png"
              style={{opacity:"60%", height:"65px"}}/>
            </div>
            <div className="sp">
              <div className="CE-heading" >
              Details
              </div>
              <div className="CE-subHeading" >
              Let your attendees know about organiser.
            </div>
          </div>
          </div>
          
        
            <div className="D-name">
              <label class="D-label"> 
                Name</label>
              <input
                placeholder="Name"
                type=" text"
                class="D-input-name"
                value={plannerName}
                onChange={(e) => setPlannerName(e.target.value)}
              />
            </div>

            <div className="D-name">
              <label class="D-label"> 
                Address</label>
              <input
                placeholder="Address"
                type=" text"
                class="D-input-name"
                onChange={(e)=>{setPlannerAddress(e.target.value)}}
               
              />
            </div>

          
       <div className="D-space">
            <div className="D-name">
              <label class="D-label"
              >Contact Number</label>
              <input
                placeholder=" Contact"
                type="tel"
                class="D-input-phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>


            <div className="D-name">
              <label class="D-label"
              >Email</label>
              <input
                class="D-input-phone"
                placeholder=" Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            </div>
         <div className="D-space">

          <div className="D-name">
          <label class="D-label"
              >Linkedin</label>
            <input 
            class="D-input-phone"
            placeholder="Linkdein" type="text"
            onChange={(e)=>{setLinkedin(e.target.value)}}/>
          </div>
          
          <div className="D-name">
          <label class="D-label"
              >Twitter</label>
            <input class="D-input-phone"
            placeholder="Twitter" type="text"
            onChange={(e)=>{setTwitter(e.target.value)}}/>
          </div>
        </div>
        
        <div style={{paddingBottom:"5vh"}}></div>
                 
         
     </div>     
        
    </div>
    
  </div>
</div> 


  );
}

export default Details;