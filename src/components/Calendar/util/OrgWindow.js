import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
// import moment from "moment";
import { AttendMenu, OrgMenu } from "../../utils/menuWrap";
import styles from "./window.module.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const OrgWindow = () => {
  const sessionId = sessionStorage.getItem("idValue");
  const [buffer, setBuffer] = useState(false);
  const [events, setEvents] = useState("");
  const [customList, setCustomList] = useState("");
  const navigate = useNavigate();
  let selectDate = sessionStorage.getItem("selectDate");
  useEffect(() => {
    fetchEventData();
  }, [selectDate,]);

  let data_info = "";

  if (sessionStorage.getItem("type")) {
    data_info = "OrgEvents";
  } else {
    data_info = "AttendEvents";
  }

  const fetchEventData = async () => {
    try {
      const collectionRef = collection(db, "user", sessionId, data_info);
      const querySnapshot = await getDocs(collectionRef);
      console.log(querySnapshot);
      const idList = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          idList.push(eventData.Id);
        });
        //console.log(idList);

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
        const eventStartDate = dayjs(eventData.Event_start).$d;
        // console.log(eventStartDate);
        // const eventStartDate = eventStartTimestamp?.toDate();
        const eventId = eventData.Event_id;
        // console.log("Empty !");
        // console.log(sessionStorage.getItem("viewEventId"));
        eventList.push({
          imageUrl,
          eventname,
          eventaddress,
          eventStartDate,
          eventId,
        });
      });
      let customEventList = [];
      eventList.forEach((custom) => {
        customList.forEach((item) => {
          if (custom.eventId === item) {
            if (
              dayjs(custom.eventStartDate).format("MMMM D,YYYY") === selectDate
            ) {
              customEventList.push(custom);
              // console.log(custom.eventId);
              setBuffer(true);
            }
          }
        });
      });
      if (customEventList.length == 0) {
        setBuffer(false);
      }
      console.log("Final Array", customEventList);
      setEvents(customEventList);
    }
  };

  return (
    <div>
      {" "}
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
                  {/* {dayjs(event.eventStartDate).format("MMMM D,YYYY") && (
                    <p className={styles.detaildiv}>
                      {dayjs(event?.eventStartDate).format("MMMM D,YYYY")}
                    </p>
                  )} */}

                  <p className={styles.detaildiv}>online</p>

                  {/* <p className={styles.detaildiv}>500</p> */}
                </div>
              </button>

              <div className={styles.sideButtons}>
                {sessionStorage.getItem("type") ? (
                  <OrgMenu eventId={event.eventId} />
                ) : (
                  <AttendMenu eventId={event.eventId} />
                )}
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
              <h2 style={{ color: "#0f0f0f", marginBottom: "1vh" }}>Oops!!</h2>{" "}
              You don't have any events scheduled on this Day!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};
