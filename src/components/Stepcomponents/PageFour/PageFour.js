import React, { useState } from "react";
import tick from "./tick.jpg";
import Preview from "../../Preview/preview";
import {useNavigate} from "react-router-dom";
// import View from "../../view_event/View_event";

const PageFour = ({ onButtonClick }) => {
  const navigate=useNavigate();
  return (
    <div>
      <div>
        {/* <h1> Privew</h1> */}
        <Preview/>
        {/* <View/> */}
      </div>
      {/* <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "20%", backgroundColor: '#664DE5' }}
          type="submit"
          value="Launch Eden"
        /> */}
      <footer>
        <div
          className="footer-butn"
          style={{ width: "85vw", marginLeft: "114px" }}
        >
          <div className="footer-twobt">
            <button
              className="evtBack"
              onClick={() => {
                onButtonClick("pagethree");
              }}
            >
              {" "}
              Back{" "}
            </button>
            <button className="evtSave" type="submit"
            onClick={()=>{navigate("/orghome")}}>
              Create Event{" "}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageFour;
