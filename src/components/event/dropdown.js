import React, { useState } from "react";
import "./event.css";

const DropdownWithTextField = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    sessionStorage.setItem("eventCategory",event.target.value)

    if (value !== "Others") {
      setOtherValue("");
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  return (
    <div className="CE-drop">
      <label htmlFor="dropdown"  style={{paddingBottom:"1em"}} class = "CE-label">Category</label>
      <select
        
        id="CE-dropdown"
        value={selectedOption}
        onChange={handleDropdownChange}
        
      >
        <option value="">Select...</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Sports">Sports</option>
        <option value="Community">Community</option>
        <option value="Business">Business</option>
        <option value="Art">Art</option>
        <option value="Technology">Technology</option>
        <option value="Religious">Religious</option>
        <option value="Environmental">Environmental</option>
        <option value="Educational">Educational</option>
        <option value="Others">Others</option>
        
      </select>

      {selectedOption === "others" &&  (
        <div>
          <input
          class="CE-input-part"
          placeholder="other"
            type="text"
            id="otherInput"
            value={otherValue}
            onChange={handleOtherInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownWithTextField;
