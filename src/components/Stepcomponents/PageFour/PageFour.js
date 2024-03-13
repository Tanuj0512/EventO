import React, {useState} from "react";
import tick from "./tick.jpg";
import Preview from "../../Preview/preview";

const PageFour = ({onButtonClick}) => {
    return (
     <div>
      <div>
        <Preview/>
      </div>
        {/* <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "20%", backgroundColor: '#664DE5' }}
          type="submit"
          value="Launch Eden"
        /> */}
<footer>
        <div className="footer-butn" style={{width:"85vw",marginLeft:"114px"}}>
            <div className="footer-twobt">

            
            <button className="evtBack" onClick={()=>{
                            onButtonClick("pagethree")}} > Back </button> 
            <button className="evtSave" type = "submit">Create Event </button> 
          </div>
          </div>
          </footer>
      </div>
    );
}

export default PageFour;