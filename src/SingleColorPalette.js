import React from "react";
import { useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import seedColors from "./seedColors";
import ColorBox from "./ColorBox";

const generateShades = (palette, colorToFilterBy) => {
  let shades = [];
  let allColors = palette.colors;

  for (let key in allColors) {
    shades = shades.concat(
      allColors[key].filter((color) => color.id === colorToFilterBy)
    );
  }

  // we don't need first item in the array which is color with key of 50:, which is white for all colors
  return shades.slice(1);
};

const SingleColorPalette = () => {
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(seedColors.find((p) => p.id === paletteId));

  const shades = generateShades(palette, colorId);

  const colorBoxes = shades.map((color) => (
    <ColorBox key={color.id} name={color.name} background={color.hex} />
  ));

  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
};

export default SingleColorPalette;
