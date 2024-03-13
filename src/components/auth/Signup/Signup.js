import React, { useState, useEffect } from "react";
import * as Components from "./Components";
//import firebase from 'firebase/compat/app'
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import CallOtp from "./CallOtp";
import { toast } from "react-hot-toast";
import { db } from "../../../config/firebase";
import { getDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
//import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";


//var custom_id;

const Signup = () => {
  console.log(db);
  const userCollectionRef = collection(db, "user");
  const [users,setUsers]=useState([])
  
  const [signIn, toggle] = useState(true);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    username: ""
  });
  
  const { register, handleSubmit }= useForm();

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  //const {id}=useContext(UserContext)
  
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }; 

    getUsers()
  }, []);

  
  const onSubmit = ()=>{
      handleSubmission();
  }

  
  const SendData = async ()=>{
    
    const docSnap = await getDoc(doc(db,"user",values.mobile));
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      toast.error("Mobile Number Already Exists!");
      //toggle(true);
    } 

    else if(submitButtonDisabled===true){
        //CheckUser();
    }
    else
    {
      await setDoc (doc(db,"user",values.mobile), 
      { 
        firstName: values.firstName,
        lastName:values.lastName,
        mobile: Number(values.mobile),
        email: values.email,
        username: values.username 
      });
    }

  }


  const handleSubmission = () => {
    console.log("Account Added")
    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.mobile ||
      !values.username
    ) {
      setErrorMsg("Fill all fields");
      toast.error("Fill all fields");
      setSubmitButtonDisabled(!submitButtonDisabled)
      
    }
    else{
      
      SendData();
      setSubmitButtonDisabled(!submitButtonDisabled);
      //navigate("/");
      setValues({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        username: ""});
      toggle(true);
      //console.log(submitButtonDisabled);

    }
    //var custom_id=values.mobile;
    //console.log(custom_id)
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Head>EVENTO</Components.Head>
        <Components.Form className="signupform" onSubmit={handleSubmit(onSubmit)}>
          <Components.Title>Create Account</Components.Title>
          <div className="signup_gap">
          <Components.Input
            type="text"
            {...register("firstname",{required:true})}
            style={ {
              backgroundColor: "#eee",
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              position: "static",
              minWidth: "250px",
              maxWidth: "280px",
              padding: "11px 10px",
              fontSize: "0.8 rem",
              border: "2px #818CF8 solid",
              borderRadius: "5px",
              background: "#e8e8e8",
          }}
            value={values.firstName}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, firstName: event.target.value }))}
            placeholder="First Name"
            required
          />
          <Components.Input
            type="text"
            {...register("lastName",{required:true})}
              style={ {
              backgroundColor: "#eee",
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              position: "static",
              minWidth: "250px",
              maxWidth: "280px",
              padding: "11px 10px",
              fontSize: "0.8 rem",
              border: "2px #818CF8 solid",
              borderRadius: "5px",
              background: "#e8e8e8",
          }}
            value={values.lastName}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, lastName: event.target.value }))}
            placeholder="Last Name"
            required
          />
        
          {/* <PhoneInput
                  className={Components.phInput}
                  {...register("mobile"
  )}                country={"in"}
                  value={values.mobile}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, mobile: event.target.value }))}
          /> */}
          {/* <PhoneInput
          {...register("mobile",{required:true})}
                  className={styles.phInput2}
                  country={"in"}
                  value={values.mobile}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, mobile: event.target.value }))}
                /> */}
          <Components.Input
            type="mobile"
            {...register("mobile",{required:true}
  )}          style={ {
              backgroundColor: "#eee",
              display: "flex",
              flexDirection: "column",
              
              position: "static",
              minWidth: "230px",
              // maxWidth: "280px",
              padding: "11px 10px",
              fontSize: "0.8 rem",
              border: "2px #818CF8 solid",
              borderRadius: "5px",
              background: "#e8e8e8",
              height :"2vh"
          }}
            value={values.mobile}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, mobile: event.target.value }))}
            placeholder="Mobile Number"
            required
          />
          
          <Components.Input
            type="email"
            {...register("email",{required:true})}
              style={ {
              backgroundColor: "#eee",
              display: "flex",
              flexDirection: "column",
              
              position: "static",
              minWidth: "230px",
             
              padding: "11px 10px",
              fontSize: "0.8 rem",
              border: "2px #818CF8 solid",
              borderRadius: "5px",
              background: "#e8e8e8",
              height :"2vh",
              marginTop:"1vh",
          }}
            value={values.email}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            required
          />
          <Components.Input
            type="text"
            {...register("username",{required:true})}
              style={ {
              backgroundColor: "#eee",
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              position: "static",
              minWidth: "250px",
              maxWidth: "280px",
              padding: "11px 10px",
              fontSize: "0.8 rem",
              border: "2px #818CF8 solid",
              borderRadius: "5px",
              background: "#e8e8e8",
              
          }}
            value={values.username}
            onChange={(event) =>
            setValues((prev) => ({ ...prev, username: event.target.value }))}
            placeholder="Username"
            required
          />
</div>
                
          <Components.Button type="submit"   disabled={submitButtonDisabled}>
            Sign Up
          </Components.Button>
          
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Head>EVENTO</Components.Head>
        <Components.SignTitle>Sign In !</Components.SignTitle>
             
        <CallOtp getId={setValue} />
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>New Here ?</Components.Title>
            <Components.Paragraph>
              Signup and Discover New Events and Opportunities !
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              Happy to Assist your Schedule.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

//export { custom_id };
export default Signup;

