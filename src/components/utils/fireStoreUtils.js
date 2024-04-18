import { useEffect } from "react";
import {db} from "../../config/firebase";
import {doc, setDoc,collection, query, getDoc, updateDoc ,deleteDoc} from "firebase/firestore";

let eventId="";



//const sessionId = sessionStorage.getItem("idValue");


export const addEventToDatabase = async () => {

  let eventTitle = sessionStorage.getItem("eventTitle");
  let eventCategory = sessionStorage.getItem("eventCategory");
  let venue = sessionStorage.getItem("venue");
  let eventAbout = sessionStorage.getItem("eventAbout");
  let startDate = sessionStorage.getItem("startDate");
  let endDate = sessionStorage.getItem("endDate");
  let eventStatus = sessionStorage.getItem("eventStatus");
  let startTime = sessionStorage.getItem("startTime");
  let endTime = sessionStorage.getItem("endTime");
  let plannerName = sessionStorage.getItem("plannerName");
  let count = sessionStorage.getItem("count");
  // let plannerLastName = sessionStorage.getItem("plannerLastName");
  let mobile = sessionStorage.getItem("mobile");
  let email = sessionStorage.getItem("email");
  let linkedin = sessionStorage.getItem("linkedin");
  let twitter = sessionStorage.getItem("twitter");
  let imageUrl =sessionStorage.getItem("imageUrl");
  let sessionId = sessionStorage.getItem("sessionId");
  console.log("entered function");
    try {
      //console.log(sessionId);
      console.log(eventTitle);
      eventId=sessionStorage.getItem("eventId");
      console.log(eventId);
      console.log("in util ",imageUrl);
      //console.log(sessionStorage.getItem("eventId"))
      //eventId=(sessionId +"-"+ sessionStorage.getItem("eventId"));
      console.log(eventId);
      //sessionStorage.setItem("eventId",eventId);
      //dispatch(eventIdValue);
      
      const EventStart = startDate;
      const EventEnd = endDate;
      const usertype=sessionStorage.getItem("type");
      console.log(usertype)
      
      console.log("Set to unverified");    
      await setDoc(doc(db, "event", eventId), {
        Event_name: eventTitle,
        Event_id: eventId,
        Event_category: eventCategory,
        Event_organizor: plannerName,
        Event_venue: venue,
        Event_count:count,
        Event_start: EventStart,
        Event_end: EventEnd,
        Event_notification: "true",
        Event_IMAGE: imageUrl,
        Event_About: eventAbout,
        Event_mobile: mobile,
        Event_email: email,
        Event_startTime: startTime,
        Event_endTime: endTime,
        Event_status: eventStatus,
        Event_linkedin: linkedin,
        Event_twitter: twitter,
        Event_verified:"",
        session_Id:sessionId,
      });
    } catch (err) {
      console.error(err);
    }
    //sessionStorage.setItem("eventId","");
  };

export const eventVerify=async (id)=>{
  
  let eventTitle = sessionStorage.getItem("eventTitle");
  const docRef = doc(db, "event", id);
const docSnap = await getDoc(docRef);
const data=docSnap.data();
let sessionId = data.session_Id;

  try{
    await updateDoc(doc(db, "event", id),{
      Event_verified:"yes"
    })
    await setDoc(doc(db, "user",sessionId,"OrgEvents", id),{Id: id,Title: eventTitle})
    console.log("Verified!")
  }
  catch{
    console.log("Can't Verify");
  }
}

export const deVerify = async (id) => {
  let sessionId = sessionStorage.getItem("sessionId");
  deleteDoc(doc(db, "event", id));
  deleteDoc(doc(db, "user", sessionId, "OrgEvents", id));
};