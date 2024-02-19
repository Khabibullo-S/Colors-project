import React from "react";
import "./ColorBox.css";

const ColorBox = (props) => {
  return (
    <div className="ColorBox" style={{ backgroundColor: props.background }}>
      <span>{props.name}</span>
      <span>More</span>
    </div>
  );
};

export default ColorBox;
