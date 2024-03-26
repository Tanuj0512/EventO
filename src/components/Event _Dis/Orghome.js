import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import styles from "./event_dis.module.css";
import { OrgMenu } from "../utils/menuWrap";
import { collection, getDocs } from "firebase/firestore";
import Header from "../header/header";
import "./Orghome.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "./SubHeader";
import dayjs from "dayjs";
// import moment from "moment";

function Orghome() {
  const [events, setEvents] = useState([]);
  const [buffer, setBuffer] = useState(false);
  const navigate = useNavigate();
  const sessionId = sessionStorage.getItem("idValue");
  const [customList, setCustomList] = useState([]);

  let viewEventId = sessionStorage.getItem("viewEventId");

  const fetchEventData = async () => {
    try {
      const collectionRef = collection(db, "user", sessionId, "OrgEvents");
      const querySnapshot = await getDocs(collectionRef);
      const idList = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          idList.push(eventData.Id);
        });
        console.log(idList);
        setBuffer(true);
        fetchCustomData(idList);
        setCustomList(idList);
      } else {
        sessionStorage.setItem("viewEventId", "None");
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };
  const fetchCustomData = async (customList) => {
    const eventsCollectionRef = collection(db, "event");
    const eventQuerySnapshot = await getDocs(eventsCollectionRef);
    if (eventQuerySnapshot.length !== 0) {
      const eventList = [];
      eventQuerySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const imageUrl = eventData.Event_IMAGE;
        const eventname = eventData.Event_name;
        const eventaddress = eventData.Event_address;
        const eventStatus = eventData.Event_status;
        const eventStartDate = dayjs(eventData.Event_start).$d;
        //const eventStartDate = eventStartTimestamp?.toDate();
        const eventId = eventData.Event_id;
        // console.log("Empty !");
        // console.log(sessionStorage.getItem("viewEventId"));
        eventList.push({
          imageUrl,
          eventname,
          eventaddress,
          eventStartDate,
          eventId,
          eventStatus,
        });
      });
      let customEventList = [];
      eventList.forEach((custom) => {
        customList.forEach((item) => {
          if (custom.eventId === item) {
            customEventList.push(custom);
          }
        });
      });
      console.log("Final Array", customEventList);
      setEvents(customEventList);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [OrgMenu]);

  let isEvent = true;
  let message = isEvent ? "Welcome back!" : "Please log in.";
  console.log(message);

  return (
    <div className={styles.Event_dis}>
      <div className="header">
        <Header />
      </div>

      <div>
        <SubHeader />
      </div>

      <div className={styles.container}>
        {/* Event Grey Header  */}
        <div className={styles.eventDesHeader}>
          <div className={styles.left}>
            <h3>Event</h3>
          </div>

          <div className={styles.right}>
            <h3 className={styles.detaildiv}> Date</h3>
            <h3 className={styles.detaildiv}> Mode</h3>
            <h3 className={styles.detaildiv}>Slots</h3>
          </div>
        </div>

        {/* Event description  */}

        {buffer ? (
          <div className={styles.outerBut}>
            {events.map((event, index) => (
              <button className={styles.eventButton}>
                <button
                  onClick={() => {
                    sessionStorage.setItem("viewEventId", event.eventId);
                    navigate("/viewevent");
                  }}
                  className={styles.event_item}
                  key={index}
                >
                  <div className={styles.eventDesc}>
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        className={styles.createEventImg}
                        alt="Event"
                      />
                    ) : (
                      <img
                        className={styles.createEventImg}
                        src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                      />
                    )}

                    <p className={styles.evtName}>{event.eventname}</p>
                  </div>
                  <div className={styles.eventDetails}>
                    {event.eventStartDate && (
                      <p className={styles.detaildiv}>
                        {dayjs(event.eventStartDate).format("MMMM D, YYYY")}
                      </p>
                    )}

                    <p className={styles.detaildiv}>{event.eventStatus}</p>

                    <p className={styles.detaildiv}></p>
                  </div>
                </button>

                <div className={styles.sideButtons} >
                  <OrgMenu eventId={event.eventId} />{" "}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="noEvents">
            <img
              src="noEvent.png"
              style={{
                width: "8vw",
                height: "16vh",
                margin: "8vh",
                marginBottom: "0vh",
              }}
            ></img>
            <div className="no-events-to-show-text">
              <h3 style={{ color: "gray" }}>
                <h2 style={{ color: "#0f0f0f", marginBottom: "1vh" }}>
                  Oops!!
                </h2>{" "}
                You don't have any events yet, let's get some !
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Orghome;
