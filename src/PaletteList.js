import React from "react";
import { Link } from "react-router-dom";

const PaletteList = ({ palettes }) => {
  console.log(palettes);
  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map((palette) => (
        <div>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </div>
      ))}
    </div>
  );
};

export default PaletteList;
