import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

const PaletteList = ({ palettes }) => {
  console.log(palettes);
  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map((palette) => (
        <div>
          <MiniPalette {...palette} />
        </div>
      ))}
    </div>
  );
};

export default PaletteList;
