import React, {useState, useEffect} from "react";
// import "./View_event.css";
import "./allEvent.css";
import { db } from "../../config/firebase";
import { collection,query, where, getDocs, Timestamp, documentId,} from "firebase/firestore";
import Header from "../header/header";
import { setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AllEvent = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventaddress, setEventAddress] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [eventStart, setEventStart] = useState(null); // Initialize with null
  const [eventCategory, setEventCategory] = useState("");
  const [schedule, setSchedule] = useState("");
  const [eventOrganizer,setEventOrganizer] = useState("");
  const [eventContact,setEventContact] = useState("");
  const [eventMobile,setEventMobile] = useState("");
  const [eventEmail,setEventEmail] = useState("");

  const viewEventId = sessionStorage.getItem("viewEventId");
  //console.log(viewEventId);
  const navigate= useNavigate();
  useEffect(() => {
    const sessionId = sessionStorage.getItem("idValue");
    
    fetchEventData();
    
  }, []);

  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(db, "event");
      console.log(viewEventId);
      const eventQuery = query(
        eventsCollectionRef,
        where(documentId(), "==", viewEventId)
      );
      const querySnapshot = await getDocs(eventQuery);
      if (!querySnapshot.empty) {
        const eventData = querySnapshot.docs[0].data();
        const imageUrl = eventData.Event_IMAGE;
        const eventname = eventData.Event_name;
        const eventaddress = eventData.Event_venue;
        const eventStartTimestamp = eventData.Event_start;
        const eventAbout = eventData.Event_About;
        const eventOrganizer = eventData.Event_organizor;
        const eventContact = eventData.Event_Contact;
        const eventEmail = eventData.Event_email;
        const eventMobile = eventData.Event_mobile;

        // Convert Firebase Timestamp to JavaScript Date
        const eventStartDate = eventStartTimestamp.toDate();

        setImageUrl(imageUrl);
        setEventName(eventname);
        setEventAddress(eventaddress);
        setEventStart(eventStartDate);
        setEventAbout(eventAbout);
        setEventOrganizer(eventOrganizer);
        setEventContact(eventContact);
        setEventMobile(eventMobile);
        setEventEmail(eventEmail);
        console.log(eventOrganizer);
        console.log(imageUrl);
        sessionStorage.setItem("currEvent",eventname);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      console.log(viewEventId);
    }
  };

  
  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    
    
    <div className=  "container">
        <div className= "navbar">
            <div ><Header/></div>
        </div> 
        <div className="outerBox">
        
         
           
           <div className="blur-bg">
              <div className="Image">
                {imageUrl ? 
                (<img src={imageUrl} className="Image" alt="Event"/>) 
                : 
                (<img className="Image" src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                alt="Placeholder" />)
                }
              </div>
            </div>
          
        
          <div className="Title">
            <input  placeholder={eventName} className="tag "  style={{fontSize:"40px"}} disabled></input>
          </div>
            
         
          
          
        <div className="lowerboxx">
            <div className="desc">
                  <div className= "Heading" > 
                  <b className="desc-head">About Event</b>
                  
                      <div className="Orgdetail">
                        <div className="VE1">
                          <label className="Heading1" for="Organiser" >Organiser</label> 
                        
                          <input placeholder={eventOrganizer} className="tag1 "disabled/>
                        </div>
                        <div className="VE2">
                          <label className="Heading1" for="EventCategory" >Type</label>
                          <input placeholder={eventCategory} className="tag1"  disabled/>
                        </div>
                      </div>

                      <div className="Description">
                          <label className="Heading1" for="description">Description </label>
                         
                          
                          <input  placeholder={eventAbout} className="tag11" disabled />
                      </div>
                  </div>
                  
                  <div className="Heading">
                    <b className="desc-head">When And Where</b>
                  

                      <div className="WW" >
                      <div className="Where"  style={{display:"flex", flexDirection:"row"}}>

                        <div className="VE1" >
                        <label className="Heading1" for="Date" >Date</label>
                         
                          <input type="date" placeholder={eventStart} className="tag1"  disabled/>
                        </div>
                        <div className="VE2">
                        <label className="Heading1" for="Time" >Time</label>
                          <input type="time" placeholder={eventStart} className="tag1"  disabled/>
                        </div>
                      </div>  
                        <div className="Description">
                        <label className="Heading1" for="Address" >Address</label>
                          <input  placeholder={eventaddress} className="tag111"  disabled/>
                        </div>
                      </div>
                  </div>
                  
                  <div className="Heading">
                    <b className="desc-head">Contact Details</b>
                    
                    
                    <div className="CD">
                      <div className="VE1">

                    
                        <label className="Heading1" for="Phone" >Mobile</label>
                        
                        <input  placeholder={eventMobile} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="tag1" id =" hed" disabled/>
                      </div>

                      <div className="VE2">
                        <label className="Heading1" for="email" >Email </label>
                        <input  placeholder={eventEmail}  className="tag1" disabled/>
                      </div>
                    
                    </div>
                  </div>

                  
              </div>
              

                <div className="VE-Schedule">
                  
                  <div className="VE-schedule" >
                      <b>Schedule</b>
                  </div>

                    <button 
                    onClick={()=>{
                      navigate("/viewsch")
                    }} className="VE-button">Show</button>
                  
                </div>
            </div>
           
        </div>

        <div className="footer-butn" style={{justifyContent:"center", backgroundColor:"white"}}>
            <div className="footer-twobt">

            
            <button className="evtBack" onClick={()=>{
                            navigate("/headerevent")
                          }} > Back </button> 
            <button className="evtSave"  onClick={()=>{
                            
                          }} > Attend </button> 
              </div>
              </div>
    </div>


  
  );
};

export default AllEvent;

























// const fetchScheduleData = async ()=>{
//   try {
//     const scheduleCollectionRef = collection(db, "event",viewEventId,"schedule");
//     const scheduleQuerySnapshot = await getDocs(scheduleCollectionRef);

//     if (!scheduleQuerySnapshot.empty) {
//       const scheduleList = [];
//       scheduleQuerySnapshot.forEach((doc) => {
//         const scheduleData = doc.data();
//         const imageUrl = scheduleData.Event_IMAGE;
//         const eventname = scheduleData.Event_name;
//         const eventaddress = scheduleData.Event_address;
//         const eventStartTimestamp = scheduleData.Event_start;
//         const eventStartDate = eventStartTimestamp.toDate();
//         const eventId = scheduleData.Event_id;
//         console.log("Empty !");

//         scheduleList.push({
//           imageUrl,
//           eventname,
//           eventaddress,
//           eventStartDate,
//           eventId,
//         });
//       });

//       setSchedule(scheduleList);
//     }
//   } catch (error) {
//     console.error("Error retrieving s data:", error);
//   }
// }
