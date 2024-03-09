import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
// import seedColors from "./seedColors";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import getColorBoxStyles from "./styles/ColorBoxStyles";
import styled from "@emotion/styled";
import getPaletteStyles from "./styles/PaletteStyles";
import sizes from "./styles/sizes";

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

const SingleColorPalette = ({ palettes }) => {
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(palettes.find((p) => p.id === paletteId));
  const shades = generateShades(palette, colorId);

  const [format, setFormat] = useState("hex");

  /* EMOTION STYLES */
  const { ColorBoxDiv, BackButton } = useMemo(() => getColorBoxStyles(), []);
  const { PaletteDiv, ColorsDiv } = useMemo(() => getPaletteStyles(), []);
  const GoBackDiv = useMemo(
    () => styled.div`
      ${ColorBoxDiv.__emotion_styles}
      cursor: default;
      background-color: black;
      ${BackButton} {
        cursor: pointer;
      }
      ${sizes.down("lg")} {
        .SingleColorPalette & {
          width: 50%;
          height: 20%;
          margin-bottom: -3.9px;
        }
      }
      ${sizes.down("md")} {
        .SingleColorPalette & {
          width: 50%;
          height: 20%;
          margin-bottom: -4px;
        }
      }
      ${sizes.down("xs")} {
        .SingleColorPalette & {
          width: 100%;
          height: 10%;
        }
      }
    `,
    []
  );
  /* END OF STYLES */

  const colorBoxes = shades.map((color) => (
    <ColorBox key={color.name} name={color.name} background={color[format]} />
  ));
  return (
    <PaletteDiv className="SingleColorPalette">
      <Navbar changeFormat={setFormat} />
      <ColorsDiv>
        {colorBoxes}
        <GoBackDiv>
          <Link to={`/palette/${paletteId}`}>
            <BackButton>Go back</BackButton>
          </Link>
        </GoBackDiv>
      </ColorsDiv>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </PaletteDiv>
  );
};

export default SingleColorPalette;
