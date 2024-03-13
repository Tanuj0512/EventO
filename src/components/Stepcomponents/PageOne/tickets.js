
import React, { useState, useEffect } from "react";

const Ticket = () => {
  const [status, setStatus] = useState("free");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const handleFree = () => {
      setStatus("free");
    };

    const handlePaid = () => {
      setStatus("paid");
    };

    window.addEventListener("free", handleFree);
    window.addEventListener("paid", handlePaid );

    return () => {
      window.removeEventListener("free", handleFree);
      window.removeEventListener("paid", handlePaid );
    };
  }, []);

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="CE-Tickets">
      <label class = "CE-label1">
        Type of Event:
        <select id="CE-dropdown" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </label>

      {status === "paid" ? (
        <div>
          <label class = "CE-label1">
            Ticket Price:
            <input 
            class="CE-input-title" style={{width:"12vw"}}
              type="text"
              value={location}
              onChange={handleChangeLocation}
            />
          </label>
        </div>
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default Ticket;
