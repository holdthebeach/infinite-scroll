import React from "react";

const Button = ({ handleSave }) => {
  return (
    //will need to receive list of favorited item id's to check if the card it belongs to is favorited and show it in the design
    <div className="button" onClick={handleSave}>
      Favorite
    </div>
  );
};

export default Button;
