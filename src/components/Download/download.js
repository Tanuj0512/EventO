import React, { useState, useEffect, useRef } from "react";
import "./download.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Event from "./Components/DownloadEvent";
import DownloadSchedule from "./Components/Download-schedule";

const Download = () => {
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoiscs.pdf");
    });
  };

  return (
    <div className="container">
      <div className="D-download_content" ref={pdfRef}>
        <div className="D-Logo">
          <div className="D-img">
          <img
            src="logo.png"
            style={{ maxWidth: "12vw", maxHeight: "11vh",  }}
          ></img>
          </div>
          <div className="D-head">Set-Create-Manage</div>
        </div>
        <div className="D-EventData">
          <Event />
        </div>
        <div className="D-scheduleData">
          <DownloadSchedule />
        </div>
      </div>

      <button onClick={downloadPDF} class="D-Downloadbutton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="20"
          viewBox="0 0 640 512"
        >
          <path
            d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
            fill="white"
          ></path>
        </svg>
        <span>Download</span>
      </button>
    </div>
  );
};

export default Download;
