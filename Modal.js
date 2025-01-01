// src/components/Modal.js

import React from 'react'

function Modal({ isOpen, children, onClose }) {
    if (!isOpen) return null;
  return (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>×</span>
            {children}
        </div>
    </div>
  )
}

export default Modal