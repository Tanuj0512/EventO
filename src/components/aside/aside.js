import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
const Aside = () =>{
    return(
<aside>
      <p> My Event </p>
      <div className="sidebar-link">

        <Link to="/orgevents" className="l" id="aa" style={{  textDecoration:"none"}}>
        Basic Info</Link>

        <Link to="/details" className="l" id="bb" style={{  textDecoration:"none"}}>
          Details</Link>
          
        <Link to="/schedule" className="l" style={{  textDecoration:"none"}}>
          Add Schedule</Link>
        
        <Link to="/preview" className="l" style={{  textDecoration:"none"}}>
          Preview</Link>
        </div>
        
</aside>
    );

};

export default Aside ;