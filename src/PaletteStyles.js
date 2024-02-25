import chroma from "chroma-js";
import styled from "@emotion/styled";

const getPaletteStyles = () => {
  const PaletteDiv = styled.div`
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  `;

  const ColorsDiv = styled.div`
    flex: 1;
  `;

  return { PaletteDiv, ColorsDiv };
};

export default getPaletteStyles;
