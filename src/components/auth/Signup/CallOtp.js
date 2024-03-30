/* eslint-disable no-unused-vars */
//import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import styles from "./CallOtp.module.css";
import OtpInput, { ResendOTP } from "otp-input-react";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { db } from "../../../config/firebase";
import { getDoc, collection, getDocs, setDoc, doc, documentId, where, query } from "firebase/firestore";
import { auth } from "../../../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
//import { custom_id } from "./Signup";
import { Box } from "@mui/material";
import { BorderAll } from "@mui/icons-material";
//import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import { idValue } from "./Slice";

//var curr_id=null;
const CallOtp = (props) => {
  
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const sessionId = sessionStorage.getItem("idValue");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [curr_id, setCurr_id] = useState("0");
  const [customId,setCustomId]= useState("0");
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    username: "",
  });
  const [signIn, toggle] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //fetchEventData();
    console.log()
  }, []);

  const fetchEventData = async (num) => {
      // const eventsCollectionRef = collection(db, "user");
      console.log(num);
      const docSnap = await getDoc(doc(db,"user",num));
      docSnap.exists()? onSignup():setShowOTP(false);
    };
      
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  const handleInputChange = async () => {    
    ph === "" ? toast.error("Enter Mobile Number !") : fetchEventData(ph);
    showOTP?console.log("user exist"):console.log("Please Sign Up");

    
  };

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    console.log(ph);
    const formatPh = "+" + ph;
    fetchEventData(formatPh);

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        
        console.log(ph);
        dispatch(idValue(ph));
        sessionStorage.setItem("idValue",ph);
        
      })
      .catch((err) => {
        console.log("Invalid OTP");
        setLoading(false);
      });
  }

  return (
    
    <section>
      <div className={styles.container}>
        <Toaster toastOptions={{ duration: 4000, position: "bottom-center" }} />
        <div id="recaptcha-container"></div>

        {user ? (
          // <h2 className="text-center  font-medium text-2xl" style={{color:"#7C14D9"}}>
          //   👍Login Success
          // </h2>
          navigate("/users")
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {/*<h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                Welcome to <br /> CODE A PROGRAM
          </h1>*/}
            {showOTP ? (
              <>
                {/*<div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
              </div>*/}
                <label
                  htmlFor="otp"
                  style={{ margin: "20px", color: "#7C14D9" }}
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  style={{ margin: "20px 0px 20px 20px" }}
                ></OtpInput>
                <button onClick={onOTPVerify} className={styles.button}>
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                {/*}
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label
                    htmlFor=""
                    className="font-bold text-xl text-white text-center"
                  >
                    Verify your phone number
                  </label>
              */}
                <h4 style={{marginLeft:"-45px"}}>Enter Your Mobile Number</h4>
                <PhoneInput
                  className={styles.phInput}
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                />
                <button
                  onClick={handleInputChange}
                  style={{ backgroundColor: "#9757C8" }}
                  className={styles.button}
                >
                  {loading && (
                    <CgSpinner
                      size={20}
                      className="mt-1 animate-spin"
                      style={{ color: "#fffff" }}
                    />
                  )}
                  <span >Sign In</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

//console.log(curr_id);
//console.log(customId); 
// enjxport { Custom_id } ;
//export { curr_id };


export default CallOtp;
