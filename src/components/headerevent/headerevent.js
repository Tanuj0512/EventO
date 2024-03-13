import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, getDocs,doc } from "firebase/firestore";
import Header from "../header/header";
import ShareBtn from "../share/share";
import Calendar from "../Calendar/Calendar";
import "./headerevent.css";
import {useDispatch, useSelector} from "react-redux";
import { idValue,viewEventId } from "../auth/Signup/Slice";
import { useNavigate } from "react-router-dom";

function Headerevent() {
  const [events, setEvents] = useState([]);
  const idValue= useSelector((state)=> state.id.value);
  const eventId = useSelector((state)=> state.id.eventIdValue);
  
  const navigate= useNavigate();
  const dispatch= useDispatch();


  useEffect(() => {
      
  fetchEventData();
  
  }, []);
  
  
  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(db, "event");
      const eventQuerySnapshot = await getDocs(eventsCollectionRef);
      
      if (!eventQuerySnapshot.empty) {
        const eventList = [];
        eventQuerySnapshot.forEach((doc) => {
          const eventData = doc.data();
          // console.log(eventData);
          const imageUrl = eventData.Event_IMAGE;
          const eventname = eventData.Event_name;
          const eventaddress = eventData.Event_address;
          const eventStartTimestamp = eventData.Event_start;
          const eventStartDate = eventStartTimestamp.toDate();
          const eventId = eventData.Event_id;
          const eventAbout= eventData.Event_About;
          // const eventCategory = eventData.Event_Category;
          // console.log("Empty !");
          // console.log(sessionStorage.getItem("viewEventId"));
          eventList.push({
            imageUrl,
            eventname,
            eventaddress,
            eventStartDate,
            eventId,
            // eventCategory
          });
        });

        setEvents(eventList);
      }
      else{
        sessionStorage.setItem("viewEventId","None");
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };

//   if (usertype===true){
//   await setDoc(doc(db, "user",sessionId,"OrgEvents", eventId),{
//     ID: eventId,}
//   )
//   console.log("Set to org");    
// };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
  
    

    <div
      className="Event_dis"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="header">
        <Header />
      </div>



      <div className="allevent-headd"><h1>Events</h1></div>
      
      <div
        className="body_view_event"
        style={{ display: "flex", flexDirection: "column" ,height:"-webkit-fill-available"}}
      >
      
       


          
        <div class="allevent-group">
          <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="Search" type="search" class="input-orgsrch" />
        </div>

        <div className="allevent-buttn" id = "list" style={{margin: "10vh 2vw 2vh -37vw"}} >
              <button  class="allevent-btn" onClick= {()=>{
                        navigate("/attendevents")
                      }}
              >My Events </button>
        </div>

       
        <div
          className="all-event_list"
          id="style-2" >


         
        {events.map((event, index) => (
        <div className="all-event-padd" style={{padding : "20px"}}>     
        <button 
          onClick={()=>{
          console.log(events[index]);
          console.log(event.eventId)
          sessionStorage.setItem("viewEventId",event.eventId);
          //dispatch(viewEventId(event.eventId));
          navigate("/allEvent");
        }}
          class="allevent-card"
          key={index} >

            {event.imageUrl ? ( 
              <img className="allevent-card-image" src={event.imageUrl} alt="Event">
            </img>
            ) : (
              <img className="allevent-card-image-firebase"
                src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
              
              />
            )}


            <div class="event-card-category"> Category </div>
            <div class="event-card-heading">{event.eventname}</div>
            <div class="event-card-author"> By <span class="event-card-name"> Organiser
              {/* {event.eventCategory} */}
              </span>4 days ago</div>
            
        </button>
        </div>
        )
          )
          } 
  

        </div>
      </div>


      
    </div>
  );
}

export default Headerevent;