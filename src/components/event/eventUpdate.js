import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import { setDoc, getDocs, query, where, collection, deleteDoc, updateDoc, doc, Timestamp, documentId, QuerySnapshot,} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, lisAll, list, uploadBytesResumable} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import "./event.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from 'react-router-dom';
function EventUpdate() {
  let eventId = "";
  const defaultFile = banner;
  const [fileAddress, setFileAddress] = useState(defaultFile);

  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [plannerFirstName, setPlannerFirstName] = useState("");
  const [plannerLastName, setPlannerLastName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [notification, setNotification] = useState(false);
  const [file, setFile] = useState();
  const [mobile,setMobile] = useState("");
  const [email,setEmail] = useState("");
  const [count,setCount] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [organizerFname,setOrganizerFname] = useState("");
  const [organizerLname,setOrganizerLname] = useState("");
  const [percentage, setPercentage]= useState(0);
  let imageUploaded=false;
  
  const navigate = useNavigate();
  const metadata = {   contentType: 'image/jpeg'  };
  const viewEventId =sessionStorage.getItem("viewEventId");
//   const handleAddSchedule = () => {
//     // Logic to add schedule

//     //if (file == null) return null;
//     const imageRef = ref(storage, `testingphoto/${viewEventId}`);

//     uploadBytes(imageRef, file).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         console.log("imageref", url);
//         setImageUrls([url]);
//       });
//     });

//     let eventData = {
//       eventTitle,
//       plannerFirstName,
//       plannerLastName,
//       eventCategory,
//       venue,
//       notification,
//       imageUrls,
//       eventAbout,
//       startDate,
//       endDate,
//       mobile,
//       email,
//     };
//     console.log("recheck",eventData.imageUrls);
//     addEventToDatabase(eventData);
//     navigate("/schedule");
//   };
  const sessionId = sessionStorage.getItem("idValue");
  useEffect(() => {
    console.log(sessionId);
  }, [eventId]);




const fecthEventData= async() =>{

    const dataRef = collection(db,"event");
    const refquery = query(dataRef,where (documentId(),"==",viewEventId));
    const querySnapshot = await getDocs(refquery);
    if (!refquery.empty){
        const data= querySnapshot.docs[0].data();
        const eventTitle = data.Event_name ;
        //const eveEvent_id,
        setEventCategory(data.Event_category);
        setOrganizerFname(data.Event_organizorFname);
        setOrganizerLname(data.Event_organizorLname);
        setVenue(data.Event_venue);
        setStartDate(data.Event_start);
        setEndDate(data.Event_end);
        setNotification(data.Event_notification); 
        setImageUrl(data.Event_IMAGE);
        setEventAbout(data.Event_About);
        setMobile(data.Event_mobile);
        setEmail(data.Event_email);


    }
    
    
    
}





  const imageUpload =  (ref,data) => {
    //console.log("inside upload",data)
    let imgurl=data.imageUrl;
    const imageRef = ref(storage, `eventImages/${viewEventId}`);
    const uploadTask = uploadBytesResumable(imageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
     uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setPercentage(progress)
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      
      () => {
        // Upload completed successfully, now we can get the download URL
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          //setImageUrls(downloadURL);
          imgurl=downloadURL
          //console.log("link",imgurl,imageUrls);
          updateDoc(ref,data);
          updateDoc(ref, {Event_IMAGE:imgurl});
          
        });
        
        console.log("b4 add");
        
        console.log("after add");
      }
    );
    
  };

 

  const handleUpload = async() => {

    const eventRef = collection(db,"event",viewEventId);
    let updateData = {
      Event_name: eventTitle,
      Event_category: eventCategory,
      Event_organizorFname: plannerFirstName,
      Event_organizorLname:  plannerLastName,
      Event_venue: venue,
      Event_start: startDate,
      Event_end: endDate,
      Event_notification: notification,
      Event_IMAGE: imageUrl,
      Event_About: eventAbout,
      Event_mobile: mobile,
      Event_email: email,
    };

    // console.log("B4 Upload ",eventTitle);
    await imageUpload(eventRef,updateData);
    
    
    
    console.log("Saved Moving To Details");
    navigate("/details");
  };

 
  

  return (
    <div>
      <div className="header_event_inp">
        <Header />
      </div>
      
      <aside>
      <p> My Event </p>
      <div className="sidebar-link">

        <Link to="" className="l" id="aa" style={{  textDecoration:"none"}}>
        Basic Info</Link>

        <Link to="/details" className="l" id="bb" style={{  textDecoration:"none"}}>
          Details</Link>
          
        <Link to="/schedule" className="l" style={{  textDecoration:"none"}}>
          Add Schedule</Link>
        
        <Link to="/preview" className="l" style={{  textDecoration:"none"}}>
          Preview</Link>
        </div>
        
    </aside>




      <form id="form" class="form"
        style={{
          padding: "3vh 4vw",
          margin: "-100vh auto 2vh 18vw",
         
          border: "2px solid white",
          height: "fit-content",
          width: "70vw",
          backgroundColor: "white",
          display:"flex",
          flexDirection:"column"
          // boxShadow:"0px -4px 8px 0px #c9c2cf, 5px 5px 11px rgb(194 189 189 / 22%",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
          Basic Information
        </div>

        <div className="EventMandatoryField">
          <div className="topwhole">
            <div className="leftside">
              <div className="event_title">
                <label htmlFor="eventTitle">Event Title</label>
                <br />
                <input
                  placeholder={eventTitle}
                  type="text"
                  style={{
                    width: "45vw",
                  }}
                  value={eventTitle}
                  onChange={(e) => {
                    setEventTitle(e.target.value);
                    sessionStorage.setItem(
                      "eventId",
                      sessionId + "-" + e.target.value
                    );
                  }}
                />
                <br />
              </div>

              <div className="about">
                <label htmlFor="Event Description">Event Description</label>
                <br />
                <input
                  placeholder={eventAbout}
                  type="text"
                  style={{
                    width: "45vw",
                  }}
                  value={eventAbout}
                  onChange={(e) => setEventAbout(e.target.value)}
                />
              </div>

              <div className="img_diss">
              {file && (
                 <a href={imageUrl} target="_blank">
                 {console.log("b4input",imageUrl)}
                  <img
                    src={imageUrl}
                    alt="user-uploaded media"
                    style={{
                      
                      right: "11vw",
                      height:"22vh",
                      width: "200px",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                  />
                 </a>
              )}
              <input
                type="file"
                className="eventtIMG"
                style={{
                  position: "absolute",
                  margin: "9vh 55vw 0vh 70vw",
                  borderRadius: "2px",
                }}
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/, video/"
              />
            </div>
            </div>
            <br/>
            <div className="event_category">
              <div className="pc">
                <label htmlFor="eventCategory">Event Category</label>
                <br />
                
                <input
                  placeholder={eventCategory}
                  type="text"
                  style={{
                    width: "30vw",
                  }}
                  id="eventCategory"
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                />
              </div>

              <div className="pc">
                <label htmlFor="participants">Number of Participants</label>
                <br />
                <input
                  placeholder={count}
                  value={count}
                  type="select"
                  style={{
                    width: "15vw",
                  }}
                />
              </div>
            </div>
            <br/>
          </div>
        </div>
        <div className="EventDescription">
          <div
            className="location_Lable"
            style={{ fontSize: "20px", fontWeight: "bolder" }}
          >
            Location
          </div>
          <div className="venu">
            <label htmlFor="venue">Venue</label>
            <br />
            
            <input
              type="text"
              placeholder={venue}
              value={venue}
              style={{ width: "62vw", height: "6vh" }}
              onChange={(e) => setVenue(e.target.value)}
            />
            <br/>
          </div>
          <br/>
          
          <div
            className="datee"
            style={{
              fontSize: "20px",
              fontWeight: "bolder",
              paddingTop: "5mm",
            }}
          >
            Event Schedule
          </div>
          <br />
          <div className={startDate}>
            <div>
              <label>Event Start</label>
              <br />

              <input
                placeholder=" Event Start"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label>Event End</label>
              <br />
              <input
                placeholder={endDate}
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <br/>

          <div className="EventDates">
            <div>
              <label>Start Time</label>
              <br />

              <input placeholder=" Event Start" type="time" />
            </div>

            <div>
              <label>End Time</label>
              <br />
              <input placeholder=" Event End" type="time" />
            </div>
          
          </div>

<br/>

          <div
            className="Oginfo"
            style={{
              fontSize: "20px",
              fontWeight: "bolder",
              paddingTop: "5mm",
            }}
          >
            Organisers Detail
          </div>
          <br />
          <div className="EventDates">
            <div className="desig">
              <label>First Name</label>
              <br />

              <input
                placeholder="First Name"
                type=" text"
                style={{ width: "25vw" }}
                value={plannerFirstName}
                onChange={(e) => setPlannerFirstName(e.target.value)}
              />
            </div>

            <div className="desig">
              <label>Last Name</label>
              <br />
              <input
                placeholder="Last Name"
                type="text"
                style={{ width: "25vw" }}
                value={plannerLastName}
                onChange={(e) => setPlannerLastName(e.target.value)}
              />
            </div>
          </div>
          <br/>
          <div className="EventDates">
            <div className="desig">
              <label>Contact Number</label>
              <br />

              <input
                placeholder=" Contact"
                type="tel"
                style={{ width: "25vw" }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="desig">
              <label>Email</label>
              <br />
              <input
                placeholder=" Email"
                type="email"
                style={{ width: "25vw" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

        </div>
        <br/>
        <br/>
        <div className="footer-butn">
        <div className="footer-twobt">

        
         <button className="evtBack" > Back </button> 
         <button className="evtSave" onClick={()=>{
                        handleUpload();
                      }} > Save & Continue </button> 
          </div>
         
        </div>
      </form>
      
    </div>
  );
}

export default EventUpdate;

