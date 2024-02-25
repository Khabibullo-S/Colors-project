import chroma from "chroma-js";
import styled from "@emotion/styled";

const getPaletteFooterStyles = () => {
  const PaletteFooter = styled.footer`
    background-color: #fff;
    height: 5vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
  `;
  const EmojiSpan = styled.span`
    margin: 0 1rem;
  `;

  return { PaletteFooter, EmojiSpan };
};

export default getPaletteFooterStyles;
