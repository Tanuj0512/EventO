import React, { useState } from "react";
import "./Rating.css";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormReviews({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [hover, setHover] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission logic using 'rating' and 'opinion' states
    console.log(`Rating: ${rating}, Opinion: ${opinion}`);
    setShowModal(false);
  };

  const handleCancel = () => {
    // Reset the form values
    setRating(0);
    setOpinion("");
    setShowModal(false);
  };

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  // const thank = () => {
  //   toast.success("Success Notification !", {
  //     position: "top-center"
  //   });
  // };

  return (
    <div>
      {!showModal && (
        <button className="open-button" onClick={() => setShowModal(true)}>
          Review
        </button>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="R-wrapper">
              <h3>Rate EVENTO</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="R-rating">
                  {[...Array(noOfStars)].map((_, index) => {
                    index += 1;

                    return (
                      <FaStar
                        key={index}
                        className={
                          index <= (hover || rating) ? "R-active" : "R-inactive"
                        }
                        onClick={() => handleClick(index)}
                        onMouseMove={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        size={30}
                      />
                    );
                  })}
                </div>

                <textarea
                  className="R-textarea"
                  name="opinion"
                  cols="30"
                  rows="5"
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                  placeholder="Your opinion..."
                />
                <div className="R-btn-group">
                  <button type="submit" className="R-btn submit">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="R-btn cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
