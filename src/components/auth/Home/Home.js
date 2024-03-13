import React from "react";
import {Link} from "react-router-dom";
function Home(props) {
  return (
    <div>
      <div>
          <h1>
              <Link to="/signup" >Signup</Link>
          </h1>
          <h1>
              <Link to="/users">UserType</Link>
          </h1>
          <h1>
            <Link to="/calendar">Calendar</Link>
          </h1>
      </div>
      <br/>
      <br/>
      <br/>
      <h2>{props.name ? `Welcome - ${props.name}` : "Login Please"}</h2>

    </div>
    )
}

export default Home;