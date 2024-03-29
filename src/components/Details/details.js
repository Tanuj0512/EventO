import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import {
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  lisAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from "react-router-dom";
import { flushSync } from "react-dom";
import Aside from "../aside/aside";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function Details({ onButtonClick }) {
  const schema = yup.object().shape({
    plannerName: yup.string().required("Name is required"),
    plannerAddress: yup.string().required("Address is required"),
    mobile: yup
      .string()
      .matches(
        /^[0-9]{10}$/,
        "Contact Number must be a valid 10-digit phone number"
      ),
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Check if the form is valid before proceeding
    if (Object.keys(errors).length === 0) {
      addEventToDatabase();
      onButtonClick("pagethree");
    }
  };

  const [plannerName, setPlannerName] = useState("");
  // const [plannerLastName, setPlannerLastName] = useState("");
  const [plannerAddress, setPlannerAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventId = sessionStorage.getItem("eventId");
  const sessionId = sessionStorage.getItem("idValue");
  let eventTitle = sessionStorage.getItem("eventTitle");
  console.log(eventTitle);
  let eventData = {
    plannerName,
    plannerAddress,
    linkedin,
    twitter,
    mobile,
    email,
  };

  sessionStorage.setItem("plannerName", plannerName);
  sessionStorage.setItem("mobile", mobile);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("linkedin", linkedin);
  sessionStorage.setItem("twitter", twitter);

  useEffect(() => {
    // updateEventDatabase(eventData);
    console.log(eventId);
  }, [plannerName, plannerAddress, linkedin, twitter, mobile, email]);

  // const updateEventDatabase = async(data)=>{
  //   console.log(eventId);
  //   await setDoc(doc(db, "event","Organizer", eventId),{
  //       Event_plannerFirstName: data.plannerFirstName,
  //       Event_plannerLastName: data.plannerLastName,
  //       Event_mobile: data.mobile,
  //       Event_email: data.email,
  //       Event_plannerAddress : data.plannerAddress,
  //       Event_twitter : data.twitter,
  //       Event_linkedin : data.linkedin,
  //     });
  // }

  return (
    <div>
      <div className="details-whole">
        <div className="D-right">
          <div className="D-outerbox">
            <div className="D-tophead1">
              <div className="details-img">
                <img
                  src="organiser.png"
                  style={{ opacity: "60%", height: "65px" }}
                />
              </div>
              <div className="sp">
                <div className="CE-heading">Details</div>
                <div className="CE-subHeading">
                  Let your attendees know about organiser.
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="Pg">
                <div className="D-name">
                  <label class="D-label">
                    Name<span class="req">*</span>
                  </label>
                  <input
                    placeholder="Name"
                    type=" text"
                    {...register("plannerName")}
                    class="D-input-name"
                    value={plannerName}
                    onChange={(e) => setPlannerName(e.target.value)}
                  />
                  {errors.plannerName && (
                    <span className="errors-css">
                      {errors.plannerName.message}
                    </span>
                  )}
                </div>

                <div className="D-name">
                  <label class="D-label">
                    Address<span class="req">*</span>
                  </label>
                  <input
                    placeholder="Address"
                    type=" text"
                    {...register("plannerAddress")}
                    class="D-input-name"
                    onChange={(e) => {
                      setPlannerAddress(e.target.value);
                    }}
                  />
                  {errors.plannerAddress && (
                    <span className="errors-css">
                      {errors.plannerAddress.message}
                    </span>
                  )}
                </div>

                <div className="D-space">
                  <div className="D-name">
                    <label class="D-label">
                      Contact Number<span class="req">*</span>
                    </label>
                    <input
                      placeholder=" Contact"
                      type="tel"
                      class="D-input-phone"
                      {...register("mobile")}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    {errors.mobile && (
                      <span className="errors-css">
                        {errors.mobile.message}
                      </span>
                    )}
                  </div>

                  <div className="D-name">
                    <label class="D-label">
                      Email<span class="req">*</span>
                    </label>

                    <input
                      class="D-input-phone"
                      placeholder=" Email"
                      type="email"
                      value={email}
                      {...register("email")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span className="errors-css">{errors.email.message}</span>
                    )}
                  </div>
                </div>
                <div className="D-space">
                  <div className="D-name">
                    <label class="D-label">Linkedin</label>
                    <input
                      class="D-input-phone"
                      placeholder="Linkdein"
                      type="text"
                      onChange={(e) => {
                        setLinkedin(e.target.value);
                      }}
                    />
                  </div>

                  <div className="D-name">
                    <label class="D-label">Twitter</label>
                    <input
                      class="D-input-phone"
                      placeholder="Twitter"
                      type="text"
                      onChange={(e) => {
                        setTwitter(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div style={{ paddingBottom: "5vh" }}></div>
              </div>
              <footer style={{ marginLeft: "-34vw" }}>
                <div className="footer-butn">
                  <div className="footer-twobt">
                    <button
                      className="evtBack"
                      onClick={() => onButtonClick("pageone")}
                    >
                      Back{" "}
                    </button>

                    <button className="evtSave"> Next </button>
                  </div>
                </div>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
