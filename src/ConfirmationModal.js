import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to discharge this bot?</h3>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
