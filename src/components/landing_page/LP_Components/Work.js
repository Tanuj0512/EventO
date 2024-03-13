import React from "react";

const Work = () => {
  const workInfoData = [
    {
      image: "https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fpick-meals-image.png?alt=media&token=1cc99e59-d50e-43d1-a6cb-92a2c625474b",
      title: "Schedule",
      text: "Plan and schedule all your meetings at one place.",
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fchoose-image.png?alt=media&token=e6db5ae9-184f-4b77-82cb-83f91329fe3e",
      title: "Notify",
      text: "Make your attendees aware of your event, meeting, conference and notify them for it. ",
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/landingpage%2Fdelivery-image.png?alt=media&token=e2500918-3157-400d-ba63-015e9f6dcef3",
      title: "Manage",
      text: "Manage the flow of events, manage the attendees for better user experience.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        <h2>Plan your Meetings, Events, Conferences and execute smoothly</h2>
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
