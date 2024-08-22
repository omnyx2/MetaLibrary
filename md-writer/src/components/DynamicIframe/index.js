"use client"

// components/DynamicIframe.js
import React, { useState, useEffect } from 'react';
import JumpingBooks  from "@/components/SVGs/JumpingBooks";
const DynamicIframe = ({ src, width = '100%', height = '100%'}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can handle other side-effects or logic here
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      {loading && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#f0f0f0' // Background during loading
        }}>
        <JumpingBooks mode={"just"}/>
        </div>
      )}
      <iframe 
        src={src} 
        width={width} 
        height={height} 
        onLoad={handleLoad}
        frameBorder="0"
        allowFullScreen
        style={{ border: 'none' }} 
      />
    </div>
  );
};

export default DynamicIframe;
