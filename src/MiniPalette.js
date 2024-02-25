import React, { useMemo } from "react";
import styled from "@emotion/styled";
import getMiniPaletteStyles from "./styles/MiniPaletteStyles";
// import { css } from "@emotion/react";

const MiniPalette = ({ paletteName, emoji, colors }) => {
  /* EMOTION STYLES */
  const { MiniColorDiv, RootDiv, ColorsDiv, TitleH5 } = useMemo(() =>
    getMiniPaletteStyles()
  );
  /* END OF STYLES */

  const miniColorBoxes = colors.map((color) => (
    <MiniColorDiv
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></MiniColorDiv>
  ));
  return (
    <RootDiv>
      <ColorsDiv>{miniColorBoxes}</ColorsDiv>
      <TitleH5>
        {paletteName} <span>{emoji}</span>
      </TitleH5>
    </RootDiv>
  );
};

export default MiniPalette;
