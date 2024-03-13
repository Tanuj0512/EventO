import "./header.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";

const nav = document.querySelector("#nav");
const onScroll = () => {
  const scrollPosition = window.scrolloffsetY;
  
  // .classList()
  // .toggle ("scrolled-down", scrollPosition>56 
  // );
};

document.addEventListener("scroll", onScroll, {passive:true}
);

const Header = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const usersCollectionRef = collection(db, "user");
        const usernameQuery = query(
          usersCollectionRef,
          where(documentId(), "==", "new_id")
        );
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const imageUrl = userData.profile_pic;
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error retrieving image URL:", error);
      }
    };

    fetchImageUrl();

    // Clean up the Firestore listener when the component is unmounted
    return () => {
      // No listener to clean up in this case, but you can add it if needed
    };
  }, []);

  return (
   
    <nav id= "nav" className="border" > 
      <div className="header"
        style={{
          maxWidth: "100vw",
          height: "10vh",
          marginTop: "-15px",
          width: "-webkit-fill-available"
        }}
      >
        <header style={{ paddingTop: "8px" }}>
          <div
            className="navbar"
            style={{
              display: "flex",
              alignItems: "center",
              height: "12vh",
              width: "-webkit-fill-available",
              textDecoration: "none",
            }}
          >
           
              <div style={{ }}>
               <img src= "logo.png" style={{ maxWidth: "10vw",maxHeight: "10vh",marginLeft:"3vh"}}></img>
              </div>
              <nav className="menu"
                            style={{ display: "flex",   
                            flexDirection: "row",
                            marginLeft: "59vw",
                            textDecoration:"none" }}
                            >
                <ul
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                    fontSize:"18px",
                  }}
                >
                  <Link to="/" style={{ margin: '1em', textDecoration:"none"}}>Home</Link>
                  <Link to="/users" style={{ margin: '1em', textDecoration:"none" }}>User</Link>
                  <Link to="/aboutus" style={{ margin: '1em' , textDecoration:"none"}}>About</Link>
                  <Link to="/headerevent" style={{ margin: '1em' , textDecoration:"none"}}>Events</Link>
             
                </ul>
              </nav>

              <Link to="/myprofile" className="profile_icon">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    style={{
                      borderRadius: "50%",
                      maxWidth: "3vw",
                      maxHeight: "6vh",
                      margin: "3vh  3vh ",
                    }}
                    alt=""
                  />
                ) : (
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2Fprofile_icon.jpg?alt=media&token=3d7d6c73-5e54-447f-be3f-a91b15c4c542"
                    style={{
                      borderRadius: "50%",
                      maxWidth: "3vw",
                      maxHeight: "6vh",
                      margin: "3vh 7vw 4vh 0vw",
                    }}
                    alt=""
                  />
                )}
              </Link>
          </div>
        </header>
      </div>
      </nav>
  );
};

export default Header;
