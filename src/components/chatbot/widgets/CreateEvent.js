import React, { useState, useEffect } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import "../styles.css";
import NewEvent from "../icons/NewEvent.png";
const CreateEvent = () => {
  return (
    <div className="Chatbot-Registration">
      <h4>Having Doubts with creating a new event ? I'll help you !!</h4>
      <div className="Chatbot-Registration-register">
        <img src={NewEvent}/>
      </div>
    </div>
  );
};

export default CreateEvent;


{/* <div>1. Click on Organiser button on User Selcetion page.</div>
        <div>2. You will be redirected to a stepper form.</div>
        <div>
          3. In first section metion all the required details about your event.
          Click on 'Next'
        </div>
        <div>
          4. In second section fill the information about organiser.Click on
          'Next'
        </div>
        <div>
          5. Now its time to create some schedules about your event, remember
          you should have minimum one schedule
        </div>
        <div>
          6. Clicl on 'Add More' to add multiple schdeules or clicl 'Next'
        </div>
        <div>
          7. In the fourth step you will see all the information you have filled
          in previous step. Click on 'Create Event' to save info.
        </div> */}