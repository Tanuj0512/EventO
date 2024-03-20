// import React from "react";
// import logo2 from './logo2.png';
// import './Logo.css';
// import Header from "../../header/header";
// const Logo = () => {
//     return(
//         <div>
//         <div className="header">
//         <Header />
//       </div>
//         <div className="ma5 center" style={{margin:"2rem"}}>
//             <img className='' style={{width: '45px', height: '45px'}} src={logo2} alt='logo'/>
//             <span className="mt3 f4">Create Your Event !!</span>
//         </div>
//         </div>
//     )
// }

// export default Logo;


import React, { useState, useEffect } from "react";
import logo2 from "./logo2.png";
import "./Logo.css";
import Header from "../../header/header";
import Modal from "../../Speech-Text/Modal/modal";
const Logo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="CE-AI" style={{ marginTop: "2vh" }}>
        <div className="AI-button">
          <button  class="button-icon" onClick={() => setModalOpen(true)}>
            
            <div class="icon"></div>
            <div class="cube">
              <span class="side front">AI transcription</span>
              <span class="side top">Use voice to fill details</span>
            </div>
          </button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
          
        </div>

        <div className="ma5 center" style={{ margin: "0rem" }}>
          <img
            className=""
            style={{ width: "45px", height: "45px" }}
            src={logo2}
            alt="logo"
          />
          <span className="mt3 f4">Create Your Event !!</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;