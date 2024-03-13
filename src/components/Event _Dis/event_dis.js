import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "../header/header";
import styles from "./event_dis.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AttendMenu, OrgMenu } from "../utils/menuWrap";
import { SubHeader } from "./SubHeader";
function Event_dis() {
  const [events, setEvents] = useState([]);
  const [buffer, setBuffer] = useState(true);
  const navigate = useNavigate();

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
          const imageUrl = eventData.Event_IMAGE;
          const eventname = eventData.Event_name;
          const eventaddress = eventData.Event_venue;
          const eventStartTimestamp = eventData.Event_start;
          const eventStartDate = eventStartTimestamp.toDate();
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

        setEvents(eventList);
      } else {
        sessionStorage.setItem("viewEventId", "None");
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className={styles.Event_dis}>
      <div className={styles.header}>
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
                        {formatDate(event.eventStartDate)}
                      </p>
                    )}

                    <p className={styles.detaildiv}>online</p>

                    <p className={styles.detaildiv}>500</p>
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

export default Event_dis;
