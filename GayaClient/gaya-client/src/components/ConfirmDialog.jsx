import React from "react";

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <>
      <p>{message || "Are you sure?"}</p>
      <div>
        <button onClick={onConfirm} style={{marginRight: "5px"}}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};

export default ConfirmDialog;
