import React, { useState, useEffect } from "react";
import "./PageOne.css";
import * as Components from "../../auth/Signup/Components";
import { storage, db } from "../../../config/firebase";
import { useForm } from "react-hook-form";
import {
  setDoc,
  collection,
  query,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  lisAll,
  list,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import { toast, Toaster } from "react-hot-toast";
import Header from "../../header/header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from "react-router-dom";
import { CgComponents } from "react-icons/cg";
import DropdownWithTextField from "./dropdown";
import Venue from "./Venue";
import Ticket from "./tickets";
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const PageOne = ({ onButtonClick }) => {
  const schema = yup.object().shape({
    eventTitle: yup.string().required("Event title is required"),
    eventAbout: yup.string().required("Event description is required"),
    count: yup.number().required("Number of participants is required"),
    venue: yup.string().required("Venue is required"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
  });

  let eventId = "";
  const defaultFile = banner;
  const [fileAddress, setFileAddress] = useState(defaultFile);

  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [plannerFirstName, setPlannerFirstName] = useState("");
  const [plannerLastName, setPlannerLastName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [notification, setNotification] = useState(false);
  const [file, setFile] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [count, setCount] = useState();
  const [imageUrls, setImageUrls] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [eventStatus, setEventStatus] = useState("Online");
  const [location, setLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [otherValue, setOtherValue] = useState("");
  //const idValue = useSelector((state) => state.id.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metadata = { contentType: "image/jpeg" };
  const currentEventId = sessionStorage.getItem("eventId");
  let defaultData = {};
  const sessionId = sessionStorage.getItem("idValue");
  //const [imgFile, setImgFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen, yet!");

  useEffect(() => {
    console.log(sessionId);
    console.log(currentEventId);
    // let defaultData=fetchEventData();
    //console.log("")
    //fetchEventData();
  }, [imageUrls, eventId, currentEventId]);

  const imageUpload = () => {
    //if (file == null) return null;
    // console.log("inside upload", data);
    const imageRef = ref(storage, `eventImages/${currentEventId}`);
    //
    const uploadTask = uploadBytesResumable(imageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setPercentage(progress);
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
          //console.log("link",imgurl,imageUrls);
          //addEventToDatabase(data, imgurl);
          sessionStorage.setItem("imageUrl", downloadURL);
          console.log(sessionStorage.getItem("imageUrl"));
          console.log(currentEventId);
          onButtonClick("pagetwo");
        });
      }
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup with React Hook Form
  });

  const handleSubmission = async () => {
  
    let eventData = {
      eventTitle,
      plannerFirstName,
      plannerLastName,
      eventCategory,
      venue,
      notification,
      imageUrls,
      eventAbout,
      startDate,
      endDate,
      mobile,
      email,
      sessionId,
      eventStatus,
    };

    sessionStorage.setItem("eventTitle", eventTitle);
    sessionStorage.setItem("eventCategory", eventCategory);
    sessionStorage.setItem("venue", venue);
    sessionStorage.setItem("eventAbout", eventAbout);
    sessionStorage.setItem("startDate", startDate);
    sessionStorage.setItem("endDate", endDate);
    sessionStorage.setItem("eventStatus", eventStatus);
    sessionStorage.setItem("startTime", startTime);
    sessionStorage.setItem("endTime", endTime);
    sessionStorage.setItem("sessionId", sessionId);
    sessionStorage.setItem("count", count);

    // console.log("B4 Upload ",eventTitle);
    await imageUpload();

    console.log("Saved Moving To Details");
    // onButtonClick("pagetwo");
  };

  const onSubmit = () => {
    handleSubmission();
    toast("Please Wait till next Page Loads");
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setEventCategory(value);

    if (value !== "others") {
      setOtherValue("");
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        setFile(reader.result);
      };

      reader.readAsDataURL(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleChangeLocation = (e) => {
    setVenue(e.target.value);
  };

  return (
    <div className="PG-one-whole">
      <div>
        {/* <Event /> */}
        <div className="CE-whole">
          <form
            onSubmit={handleSubmit(onSubmit)}
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
                          Name of event<span className="req">*</span>
                        </label>

                        <input
                          class="CE-input-title"
                          placeholder=" Event Title"
                          name="name"
                          type="text"
                          {...register("eventTitle")}
                          value={eventTitle}
                          onChange={(e) => {
                            setEventTitle(e.target.value);
                          }}
                        />
                        {errors.eventTitle && (
                          <span className="errors-css">
                            {errors.eventTitle.message}
                          </span>
                        )}
                      </div>

                      <div className="CE-event_desc">
                        <label htmlFor="Event Description" class="CE-label">
                          Event Description<span className="req">*</span>
                        </label>

                        <textarea
                          class="CE-textarea-desc"
                          placeholder=" Event Description"
                          type="text"
                          {...register("eventAbout")}
                          value={eventAbout}
                          onChange={(e) => setEventAbout(e.target.value)}
                        />
                        {errors.eventAbout && (
                          <span className="errors-css">
                            {errors.eventAbout.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="CEE-image">
                      {/* <Image/> */}
                      <div className={`cont ${file ? "active" : ""}`}>
                        <div className="wrapper">
                          <div className="image">
                            {file && (
                              <a
                                href={URL.createObjectURL(file)}
                                target="_blank"
                              >
                                {console.log(URL.createObjectURL(file))}
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="user-uploaded media"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                        <input
                          type="file"
                          id="custom-btn"
                          onChange={(e) => setFile(e.target.files[0])}
                          style={{ position: "absolute", left: "-9999px" }}
                          accept="image/, video/"
                        />
                        <label htmlFor="custom-btn" className="ChooseImg">
                          Choose File
                        </label>
                        {file && <p>File selected: {file.name}</p>}
                        {/* <input
                          type="file"
                          id="custom-btn"
                          onChange={(e) => setFile(e.target.files[0])}
                          accept="image/, video/"
                        /> */}
                      </div>
                    </div>
                  </div>

                  <div className="CE-basic">
                    <div className="CE-pc">
                      <label htmlFor="participants" class="CE-label">
                        Number of Participants<span className="req">*</span>
                      </label>

                      <input
                        class="CE-input-part"
                        placeholder={count}
                        type="select"
                        {...register("count")}
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                      />
                      {errors.count && (
                        <span className="errors-css">
                          {errors.count.message}
                        </span>
                      )}
                    </div>

                    <div className="pc">
                      {/* <DropdownWithTextField /> */}
                      <div className="CE-drop">
                        <label
                          htmlFor="dropdown"
                          style={{ paddingBottom: "1em" }}
                          class="CE-label"
                        >
                          Category<span className="req">*</span>
                        </label>
                        <select
                          id="CE-dropdown"
                          value={selectedOption}
                          onChange={handleDropdownChange}
                          // {...register("selectedOption")}
                        >
                          <option value="">Select...</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Sports">Sports</option>
                          <option value="Community">Community</option>
                          <option value="Business">Business</option>
                          <option value="Art">Art</option>
                          <option value="Technology">Technology</option>
                          <option value="Religious">Religious</option>
                          <option value="Environmental">Environmental</option>
                          <option value="Educational">Educational</option>
                          <option value="Others">Others</option>
                        </select>

                        {selectedOption === "Others" && (
                          <div>
                            <input
                              class="CE-input-part"
                              placeholder="other"
                              type="text"
                              value={otherValue}
                              onChange={handleOtherInputChange}
                            />
                          </div>
                        )}
                      </div>
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
                  <div className="CE-Venue">
                    <div className="CE-typeEvent">
                      <label class="CE-label1">
                        <div class="type-error">
                          Type of Event<span className="req">*</span>
                        </div>
                        <select
                          id="CE-dropdown"
                          value={eventStatus}
                          onChange={(e) => setEventStatus(e.target.value)}
                        >
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </label>
                    </div>

                    {eventStatus === "Online" ? (
                      <div className="CE-address">
                        <label class="CE-label1">
                          Platform
                          <input
                            class="CE-input-title"
                            type="text"
                            value={venue}
                            {...register("venue")}
                            onChange={handleChangeLocation}
                          />
                          {errors.venue && (
                            <span className="errors-css">
                              {errors.venue.message}
                            </span>
                          )}
                        </label>
                        {/* Render the textbox component based on the online status */}
                      </div>
                    ) : (
                      <div className="CE-address">
                        <label class="CE-label1">
                          Address
                          <input
                            class="CE-input-title"
                            type="text"
                            value={venue}
                            {...register("venue")}
                            onChange={handleChangeLocation}
                          />
                          {errors.venue && (
                            <span className="errors-css">
                              {errors.venue.message}
                            </span>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
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

                <div className="CE-Schedule">
                  <div className="CE-session">
                    <label class="CE-label">
                      Event Start<span className="req">*</span>
                    </label>

                    <div className="CE-box">
                      <input
                        class="CE-input_sch"
                        placeholder=" Event Start"
                        type="date"
                        value={startDate}
                        {...register("startDate")}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                      {errors.startDate && (
                        <span className="errors-css">
                          {errors.startDate.message}
                        </span>
                      )}
                      <input
                        class="CE-input_sch"
                        placeholder=" Event Start"
                        type="time"
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="CE-session">
                    <label class="CE-label">
                      Event End<span className="req">*</span>
                    </label>
                    <div className="CE-box">
                      <input
                        class="CE-input_sch"
                        placeholder=" Event End"
                        type="date"
                        value={endDate}
                        {...register("endDate")}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      {errors.endDate && (
                        <span className="errors-css">
                          {errors.endDate.message}
                        </span>
                      )}
                      <input
                        class="CE-input_sch"
                        placeholder=" Event Start"
                        type="time"
                        onChange={(e) => setEndTime(e.target.value)}
                      />
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
            <footer>
          <div className="footer-butn">
            <div className="footer-twobt">
              <button className="evtBack"> Back </button>
              <button
                type="submit"
                className="evtSave"
                value="Create Workspace"
                // onClick={(e) => {
                //   handleSubmission();
                //   toast("Please Wait till till next Page Loads");
                //   // onButtonClick("pagetwo");
                // }}
              >
                Next
              </button>
            </div>
          </div>
        </footer>
          </form>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default PageOne;
