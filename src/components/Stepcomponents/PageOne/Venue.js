import React, { useState, useEffect } from "react";

const Venue = () => {
  const [status, setStatus] = useState("online");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const handleOnline = () => {
      setStatus("online");
    };

    const handleOffline = () => {
      setStatus("offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="CE-Venue">
      <div className="CE-typeEvent">
       
        <label  class = "CE-label1">
          Type of Event:
         
          <select id="CE-dropdown" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>
      </div> 

      {status === "online" ? (
        <div className="CE-address">
          <label  class = "CE-label1">
            Platform 
            <input
              class="CE-input-title"
              type="text"
              value={location}
              onChange={handleChangeLocation}
            />
          </label>
          {/* Render the textbox component based on the online status */}
        </div>
      ) : (
        <div className="CE-address" >
          <label  class = "CE-label1">
            Address 
            <input
            class="CE-input-title"
              type="text"
              value={location}
              onChange={handleChangeLocation}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Venue;
