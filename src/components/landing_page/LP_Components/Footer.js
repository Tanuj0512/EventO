import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one" style={{marginLeft:"4vw"}}>
        <div className="footer-logo-container">
          <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2FLogo.svg?alt=media&token=377ebe24-bc83-4307-a47a-78346999cf2a" alt="" />
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
