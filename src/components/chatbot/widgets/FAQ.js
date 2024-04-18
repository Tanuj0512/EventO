import React from "react";
import faqOption from "../data";
import { useState } from "react";
import "../styles.css";
const Faq = () => {
  const [selectedId, setSelectedId] = useState(null); // State to track selected question ID

  const handleQuestionClick = (id) => {
    // Toggle the selected question
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="faq-container">
      {faqOption.map((faq) => (
        <div key={faq.id} className="faq-item">
          <div
            onClick={() => handleQuestionClick(faq.id)}
            style={{ cursor: "pointer" }}
          >
            <p className="faq-questions">{faq.name}</p>
          </div>
          {selectedId === faq.id && (
            <p className="faq-answer">
              {faq.ans}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;