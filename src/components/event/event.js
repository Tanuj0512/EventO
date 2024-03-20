import React, { useState, useEffect } from "react";
import { storage } from "../../config/firebase";
import { useForm } from "react-hook-form";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import "./event.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";

import DropdownWithTextField from "./dropdown";
import Venue from "./Venue";
import Ticket from "./tickets";
import Image from "./image";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

const EventInput = () => {
  let eventId = "";
  const defaultFile = banner;
  const [fileAddress, setFileAddress] = useState(defaultFile);
  const { register } = useForm();
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [plannerFirstName, setPlannerFirstName] = useState("");
  const [plannerLastName, setPlannerLastName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timeZone, setTimeZone] = useState("");
  const [notification, setNotification] = useState(false);
  const [file, setFile] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState();
  const [imageUrls, setImageUrls] = useState([]);
  const [percentage, setPercentage] = useState(0);
  //const idValue = useSelector((state) => state.id.value);
  const [edit, setEdit] = useState(false);
  const sessionId = sessionStorage.getItem("idValue");
  useEffect(() => {
    console.log(sessionId);
  }, [imageUrls, eventId]);




  return (
    <div className="CE-whole">
      {/* onSubmit={handleSubmit(submitForm)}  */}

      <form
        id="form"
        class="form"
        style={{
          padding: "3vh - 4vw",
          margin: "8vh 0vw ",

          border: "2px solid white",
          height: "fit-content",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="CE-outerbox">
          <div className="CE-detailswhole">
            <div className="CE-tophead">
              <div className="details-img">
                <img src="details.png" style={{ opacity: "60%" }} />
              </div>
              <div className="sp" style={{ paddingLeft: "2em" }}>
                <div className="CE-heading">Basic Information</div>
                <div className="CE-subHeading">
                  This section contains basic details realted to your event
                </div>
              </div>
            </div>

            <div className="CE-upperbox">
              <div className="CE-title_img">
                <div className="CE-title_desc">
                  <div className="CE-event_title">
                    <label htmlFor="eventTitle" class="CE-label">
                      Name of event
                    </label>

                    <input
                      class="CE-input-title"
                      placeholder=" Event Title"
                      name="name"
                      type="text"
                      value={eventTitle}
                      onChange={(e) => {
                        setEventTitle(e.target.value);
                        sessionStorage.setItem(
                          "eventId",
                          sessionId + "-" + e.target.value
                        );
                      }}
                    />
                  </div>

                  <div className="CE-event_desc">
                    <label htmlFor="Event Description" class="CE-label">
                      Event Description
                    </label>

                    <textarea
                      class="CE-textarea-desc"
                      placeholder=" Event Description"
                      type="text"
                      value={eventAbout}
                      onChange={(e) => {
                        setEventAbout(e.target.value);
                        sessionStorage.setItem("eventAbout", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="CE-image">
                  <Image />
                </div>
              </div>

              <div className="CE-basic">
                <div className="CE-pc">
                  <label htmlFor="participants" class="CE-label">
                    Number of Participants
                  </label>

                  <input
                    class="CE-input-part"
                    placeholder={count}
                    type="text"
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value);
                      sessionStorage.setItem("count", e.target.value);
                    }}
                  />
                </div>

                <div className="pc">
                  <DropdownWithTextField />
                </div>
              </div>
            </div>

            <div className="CE-border"></div>

            <div className="CE-tophead1">
              <div className="details-img" style={{ marginLeft: "-3vw" }}>
                <img
                  src="venue.png"
                  style={{ opacity: "50%", height: "50px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Location</div>
                <div className="CE-subHeading">
                  Let attendees know where to show up.
                </div>
              </div>
            </div>

            <div className="ED-venue">
              <Venue />
            </div>

            <div className="CE-border"></div>

            <div className="CE-tophead1">
              <div className="details-img" style={{ marginLeft: "-3vw" }}>
                <img
                  src="schedule.png"
                  style={{ opacity: "40%", height: "45px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Session</div>
                <div className="CE-subHeading">
                  Tell attendees about date and time.
                </div>
              </div>
            </div>

            
           
            <div className="CE-border" style={{ marginTop: "1vw" }}></div>
            <div className="CE-tophead1">
              <div className="details-img" style={{ marginLeft: "-3vw" }}>
                <img
                  src="price.png"
                  style={{ opacity: "40%", height: "45px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Tickets</div>
                <div className="CE-subHeading">Get your event monetize</div>
              </div>
            </div>

            <div className="ED-Tickets">
              <Ticket />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventInput;
