
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Image = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const usersCollectionRef = collection(db, "user");
        const usernameQuery = query(usersCollectionRef, where("username", "==", "nosh123"));
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const imageUrl = userData.profile_image;
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
    <div>
      {imageUrl ? <img src={imageUrl} style={{ width:"20vh",height:"20vh"}}/> : <img src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/application%2Fprofile_icon.jpg?alt=media&token=3d7d6c73-5e54-447f-be3f-a91b15c4c542" style={{width:"20vh",height:"20vh"}} />}
    </div>
  );
};

export default Image;