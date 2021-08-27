import React, { useState } from "react";

import Button from "./Button.js";

const Card = ({ title, imageUrl, name, index, handleSave }) => {
  const [isHoveredOver, setIsHoveredOver] = useState(false);

  const showPhotoDetails = () => setIsHoveredOver(true);
  const hidePhotoDetails = () => setIsHoveredOver(false);

  return (
    <div
      className="card"
      key={`card-${index}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onMouseEnter={showPhotoDetails}
      onMouseLeave={hidePhotoDetails}
      onTouchStart={showPhotoDetails}
      onTouchEnd={hidePhotoDetails}
    >
      {isHoveredOver && (
        <div className="info">
          <h2 className="title">{title}</h2>
          <hr></hr>
          <h3 className="name">{name}</h3>
          <Button handleSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default Card;
