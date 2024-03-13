import React, { useState } from 'react';
import UserContext from './UserContext';


const UserContextProvider=({children})=>{
    const [id,setId]=useState();
    const toggleTheme = () => {
        setId(1);
      };
    return (
        <UserContext.Provider value={{id,toggleTheme}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider