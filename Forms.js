import React from 'react';

function Form({ onSubmit, children, className = "" }) {
  return (
    <form className={`form ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;