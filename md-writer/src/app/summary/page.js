import React from 'react';

const layout = ({ children, modal }) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default layout;