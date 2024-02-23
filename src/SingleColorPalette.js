import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import seedColors from "./seedColors";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import getColorBoxStyles from "./ColorBoxStyles";
import styled from "@emotion/styled";

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

  const [format, setFormat] = useState("hex");

  /* EMOTION STYLES */
  const { ColorBoxSC, BackButtonSC } = getColorBoxStyles();
  const GoBackSC = styled.div`
    ${ColorBoxSC.__emotion_styles}
    cursor: default;
    background-color: black;
    ${BackButtonSC} {
      cursor: pointer;
    }
  `;
  /* END OF STYLES */

  const colorBoxes = shades.map((color) => (
    <ColorBox key={color.name} name={color.name} background={color[format]} />
  ));
  return (
    <div className="Palette SingleColorPalette">
      <Navbar changeFormat={setFormat} />
      <div className="Palette-colors">
        {colorBoxes}
        <GoBackSC>
          <Link to={`/palette/${paletteId}`}>
            <BackButtonSC>Go back</BackButtonSC>
          </Link>
        </GoBackSC>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
