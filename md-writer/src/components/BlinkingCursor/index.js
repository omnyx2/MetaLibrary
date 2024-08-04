import React, { useState, useEffect } from 'react';
import './BlinkingCursor.css';

const BlinkingCursor = ({text}) => {

  return (
    <div className="blinking-cursor">
      {text}
      <span className="cursor">_</span>
    </div>
  );
};

export default BlinkingCursor;