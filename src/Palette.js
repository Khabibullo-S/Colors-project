import React, { useMemo, useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import getPaletteStyles from "./styles/PaletteStyles";

const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  /* EMOTION STYLES */
  const { PaletteDiv, ColorsDiv } = useMemo(() => getPaletteStyles(), []);
  /* END OF STYLES */

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
    />
  ));

  return (
    <PaletteDiv>
      <Navbar level={level} setLevel={setLevel} changeFormat={setFormat} />
      <ColorsDiv>{colorBoxes}</ColorsDiv>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </PaletteDiv>
  );
};

export default Palette;
