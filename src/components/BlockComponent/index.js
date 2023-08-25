import React from 'react';
import './BlockComponent.css'; // You can define your shadow styles in a CSS file

const BlockComponent = () => {
  return (
    <div className="block-container">
      <div className="highlighted-block">
        <p>This is the first paragraph.</p>
      </div>
      <div className="highlighted-block">
        <p>This is the second paragraph.</p>
      </div>
      <div className="highlighted-block">
        <p>This is the third paragraph.</p>
      </div>
    </div>
  );
};

export default BlockComponent;
