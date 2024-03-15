
import { useEffect } from "react";
import {db} from "../../config/firebase";
import {doc, setDoc,collection, query, getDocs } from "firebase/firestore";

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
      await setDoc(doc(db, "user",sessionId,"OrgEvents", eventId),{Id: eventId,Title: eventTitle})
      console.log("Set to org");    
      await setDoc(doc(db, "event", eventId), {
        Event_name: eventTitle,
        Event_id: eventId,
        Event_category: eventCategory,
        Event_organizor: plannerName,
        Event_venue: venue,
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
      });
    } catch (err) {
      console.error(err);
    }
    //sessionStorage.setItem("eventId","");
  };

//  export const fetchEventData = async () => {
//     try {
//       const eventsCollectionRef = collection(db, "event");
//       const eventQuerySnapshot = await getDocs(eventsCollectionRef);
      
//       if (!eventQuerySnapshot.empty) {
//         const eventList = [];
//         eventQuerySnapshot.forEach((doc) => {
//           const eventData = doc.data();
//           const imageUrl = eventData.Event_IMAGE;
//           const eventname = eventData.Event_name;
//           const eventaddress = eventData.Event_address;
//           const eventStartTimestamp = eventData.Event_start;
//           const eventStartDate = eventStartTimestamp.toDate();
//           const eventId = eventData.Event_id;
//           const eventAbout= eventData.Event_About;
//           // console.log("Empty !");
//           // console.log(sessionStorage.getItem("viewEventId"));
//           eventList.push({
//             imageUrl,
//             eventname,
//             eventaddress,
//             eventStartDate,
//             eventId,
//           });
//         });

//         setEvents(eventList);
//       }
//       else{
//         sessionStorage.setItem("viewEventId","None");
//       }
//     } catch (error) {
//       console.error("Error retrieving event data:", error);
//     }
//   };