/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./components/header/header";

import OrgEvents from "./components/event/event";
import Schedule from "./components/schedule/schedule";
import View_sch from "./components/view_schedule/View_sch";
import Image from "./components/image/image";
import AttendEvents from "./components/Event _Dis/event_dis";
import Profile from "./components/my_profile/my_profile";
import ProfileUpdate from "./components/my_profile/my_profileupdate";
import Aboutus from "./components/aboutus/aboutus"
import Signup from "./components/auth/Signup/Signup";
import Users from "./components/auth/Users/Users";
//import Home from "./components/auth/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Calendar  from "./components/Calendar/Calendar";
import Calendaratnd from "./components/Calendar/Calendaratnd"
import LandingPage from "./components/landing_page/LandingPage";
import ViewEvent from "./components/view_event/View_event";
import EventInput from "./components/event/event";
import Orghome from "./components/Event _Dis/Orghome";
import Viewsch from "./components/view_schedule/View_sch";
import Specificsch from "./components/specific_sch/specific_sch"
import Headerevent from "./components/headerevent/headerevent";
import Details from "./components/Details/details";
import Preview from "./components/Preview/preview";
import AllEvent from "./components/allEvents-desc/allEvent";
import CrtEvent from "./components/Stepcomponents/stepper/stepper";

function App() {
  console.log("trial log");
  return (
    <div className="App">
      <div className="Authorization">
        
        <Router>
          <Routes>
            {/* <Route path="/" element={<OrgEvents/>} /> */}
            <Route path="/" element={<LandingPage/>}/>;
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<Users />} />
            <Route path="/aboutus" element={<Aboutus/>}/>
            <Route path="/calendar" element={<Calendar/>}/>;
            <Route path="/calendaratnd" element={<Calendaratnd/>}/>;
            <Route path="/orgevents" element={<OrgEvents/>}/>;
            <Route path="/orghome" element={<Orghome/>}/>;
            <Route path="/attendevents" element={<AttendEvents/>}/>;
            <Route path="/schedule" element={<Schedule/>}/>
            <Route path="/myprofile" element={<Profile/>}/>
            <Route path="/myprofileupdate" element={<ProfileUpdate/>}/>
            <Route path="/viewevent" element={<ViewEvent/>}/>
            <Route path="/viewsch" element={<Viewsch/>}/>
            <Route path="/specificsch" element={<Specificsch/>} />
            <Route path="/headerevent" element= {<Headerevent/>}/>
            <Route path="/details" element= {<Details/>}/>
            <Route path="/preview" element= {<Preview/>}/>
            <Route path="/allEvent" element= {<AllEvent/>}/>
            <Route path="/crtevnets" element= {<CrtEvent/>}/>
           
          </Routes>
        </Router>
      </div>
      
      {/* <Calendar/> */}
      {/* <LandingPage/> */}
      {/* <AboutUsScreen/> */}
     {/* <EventInput />*/}
      {/* <Event_dis/> */}
      {/* <Image /> */}
     {/*  <ProfileScreen/> */}
       {/* <Schedule />  */}
       {/* <EventInput /> */}
      {/* <View_event/> */}
      {/* <View_sch/> */}
    </div>
  );
}

export default App;
