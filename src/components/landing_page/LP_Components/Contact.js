import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h2 className="primary-heading">Have Question In Mind ?</h2>
      <h2 className="primary-heading1" style={{marginTop: "-20vh ",}}>Let Us Help You</h2>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
    </div>
  );
};

export default Contact;
