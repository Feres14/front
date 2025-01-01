import React from 'react';

function Button({ type = "button", children, className = "", ...rest }) {
    return (
        <button type={type} className={`btn ${className}`} {...rest}>
            {children}
        </button>
    );
}

export default Button;