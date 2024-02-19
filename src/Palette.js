import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500);

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <Navbar level={level} setLevel={setLevel} />
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer eventually */}
    </div>
  );
};

export default Palette;
