import React, {useState} from "react";
import user from "./user.png";
import users from "./users.png";
import "./PageThree.css";
import Schedule from "../../schedule/schedule";

const PageThree = ({onButtonClick}) => {


 

    return (
      <div className="PG-two-whole">
          <div>
            <Schedule/>
          </div> 
        {/* <input
          className="f6 grow br2 ph3 pv2 mb2 dib white submitButton"
          style={{
            borderStyle: "none",
            width: "20%",
            backgroundColor: "#664DE5",
          }}
          type="submit"
          value="Create Workspace"
          onClick={() => onButtonClick("pagefour")}
        /> */}
<footer>
              <div className="footer-butn">
                  <div className="footer-twobt">

                  
                  <button className="evtBack" onClick={() => onButtonClick("pagetwo")}> Back </button> 
                  <button className="evtSave" onClick={
                      ()=>{
                        // handleSchedules();
                        onButtonClick("pagefour")

                      }
                    }> Save & Continue </button> 
                    </div>
                  
              </div>
              </footer>
      </div>
    );
}

export default PageThree;