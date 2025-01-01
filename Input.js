// src/components/Input.js
import React from 'react';

function Input({ label, type, value, onChange, error, ...rest }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
       {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default Input;