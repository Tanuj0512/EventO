import React from "react";
import "../modal.css";
import Indes from "../indes";

function Modal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="AI-modalBackground">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="AI-modalContainer"
      >
        <p
          className="AI-titleCloseBtn"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        >
          <button class="AI-close-button">
            <span class="X"></span>
            <span class="Y"></span>
            <div class="close">Close</div>
          </button>
        </p>



        <div className="AI-modalBox">
          <Indes />
        </div>
      </div>
    </div>
  );
}

export default Modal;
