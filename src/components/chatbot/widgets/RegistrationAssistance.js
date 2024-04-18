import React, { useState, useEffect } from "react";
import "../styles.css";
// import ClipLoader from "react-spinners/ClipLoader";
import Newuser from "../icons/newuser.png";

const Registration = () => {
  return (
    <div className="Chatbot-Registration">
      <h4>New User, Don't worry I will help you !!</h4>
      <div className="Chatbot-Registration-content">
        <img className="registration-img" src={Newuser} ></img>
        
      </div>
    </div>
  );
};

export default Registration;


{/* <div>1. If you are new to EventO portal, Click on SignUp.</div>
        <div>2. Fill out the details asked with a accurate mobile number.</div>
        <div>
          3. Now get back to login page, enter the mobile number entered while
          registering.
        </div>
        <div>4. Enter the 6 digit OTP sent to you mobile.</div>
        <div>5. You're all done, Enjoy creating new events !</div> */}