import React from "react";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fabout-background.png?alt=media&token=1428972f-1f1c-48e2-adc1-cc60624def02" alt="" />
      </div>
      <div className="about-section-image-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fabout-background-image.png?alt=media&token=b0b7a72f-36db-4208-ad47-8bda0957d8b7" alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About Us</p>
        <div className="primary-heading"style={{textAlign:"center", fontWeight:"bold", fontSize:"50px",}} >Plan-Execute-Enjoy</div>
        <p className="primary-text">
          Welcome to our event management website ! The portal is dedicated in planning and organizing events. With
          our expertise and attention to detail, we ensure that every event is a
          resounding success. Our primary goal is to take the stress out of
          event planning for our clients. Whether you're organizing a corporate
          conference, a wedding, a charity fundraiser, or any other type of
          event, we are here to provide you with a seamless and unforgettable
          experience.
        </p>
        {/* <p className="primary-text">
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p> */}
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
