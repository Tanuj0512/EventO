import React from "react";
import "./PageTwo.css";
import Details from "../../Details/details";
import { useNavigate } from "react-router-dom";
import { addEventToDatabase } from "../../utils/fireStoreUtils";


const PageTwo = ({onButtonClick}) => {
  const navigate = useNavigate();
    return (
      <div className="PG-two-whole">
          <div>
            <Details/>
          </div>   
          <div className="">
<footer>
          <div className="footer-butn">
              <div className="footer-twobt">

              
              <button className="evtBack" 
              onClick={() => onButtonClick("pageone")} > 
              Back </button> 



              <button className="evtSave"
              
              onClick={() => {
                addEventToDatabase();
                onButtonClick("pagethree")}}
              > Save & Continue </button> 
                </div>
                
          </div>

          </footer>
            {/* <input
              className="f6 grow br2 ph3 pv2 mb2 dib white"
              style={{ borderStyle: "none", width: "100%", backgroundColor: '#664DE5' }}
              type="submit"
              value="Create Workspace"
              onClick={() => onButtonClick("pagethree")}
            /> */}
          </div>
      </div> 
    );
}

export default PageTwo;