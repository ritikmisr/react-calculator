import React from 'react';
import '../css/Button.css';

const Button = ({ label, onClick, className = '' }) => (
  <button className={`button ${className}`} onClick={() => onClick(label)}>
    {label}
  </button>
);

export default Button;
