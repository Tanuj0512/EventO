import React, { useState } from "react";
import "./event.css";

const DropdownWithTextField = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value !== "others") {
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
        <option value="option1">Entertainment</option>
        <option value="option2">Sports</option>
        <option value="option3">Community</option>
        <option value="option3">Business</option>
        <option value="option3">Art</option>
        <option value="option3">Technology</option>
        <option value="option3">Religious</option>
        <option value="option3">Environmental</option>
        <option value="option3">Educational</option>
        <option value="others">Others</option>
        
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
