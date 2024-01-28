import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ showModal, title, content, onSubmit, onCancel }) => {
  const [inputValue, setInputValue] = useState(content);
  useEffect(() => {
    // Reset input value when content changes
    setInputValue(content);
  }, [content]);

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        {title === "Edit your name" && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="modal-input"
          />
        )}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="submit-btn" onClick={() => onSubmit(inputValue)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
