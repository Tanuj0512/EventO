import React from "react";
import logo2 from './logo2.png';
import './Logo.css';
import Header from "../../header/header";
const Logo = () => {
    return(
        <div>
        <div className="header">
        <Header />
      </div>
        <div className="ma5 center" style={{margin:"2rem"}}>
            <img className='' style={{width: '45px', height: '45px'}} src={logo2} alt='logo'/>
            <span className="mt3 f4">Create Your Event !!</span>
        </div>
        </div>
    )
}

export default Logo;