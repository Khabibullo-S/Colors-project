import React, { useMemo } from "react";
import getPaletteFooterStyles from "./styles/PaletteFooterStyles";

const PaletteFooter = ({ paletteName, emoji }) => {
  /* EMOTION STYLES */
  const { PaletteFooter, EmojiSpan } = useMemo(
    () => getPaletteFooterStyles(),
    []
  );
  /* END OF STYLES */
  return (
    <PaletteFooter>
      {paletteName}
      <EmojiSpan>{emoji}</EmojiSpan>
    </PaletteFooter>
  );
};

export default PaletteFooter;
