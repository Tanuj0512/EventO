import React from 'react';
import { db } from '../../config/firebase';
import { doc, setDoc, collection,query, where, deleteDoc, documentId, } from 'firebase/firestore';

const sessionId = sessionStorage.getItem("idValue");
export const mapEvent = async (eventId) =>{

    const collectionRef = collection(db,"user",sessionId,"AttendEvents");
    const eventQuery= await query(collectionRef, where(documentId(),"==",eventId));
    await setDoc(doc(db, "user",sessionId,"AttendEvents", eventId),{Id: eventId});
    console.log("Mapped Event");
};

export const unMapEvent = (eventId) =>{

    deleteDoc(doc(db,"user",sessionId,"AttendEvents",eventId));
    console.log("Unmapped Event");
};




