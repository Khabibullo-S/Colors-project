import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import getMiniPaletteStyles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
// import { css } from "@emotion/react";

const MiniPalette = React.memo(
  ({ paletteName, emoji, colors, id, openDialog }) => {
    const navigate = useNavigate();
    const handleDelete = (e) => {
      e.stopPropagation();
      openDialog(id);
    };
    /* EMOTION STYLES */
    const { MiniColorDiv, RootDiv, ColorsDiv, TitleH5, IconDiv } = useMemo(
      () => getMiniPaletteStyles(),
      []
    );
    /* END OF STYLES */

    // console.log(`RENDERING: ${paletteName}`);

    const miniColorBoxes = colors.map((color) => (
      <MiniColorDiv
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></MiniColorDiv>
    ));
    return (
      <RootDiv onClick={() => navigate(`/palette/${id}`)}>
        <IconDiv onClick={handleDelete}>
          <DeleteIcon />
        </IconDiv>
        <ColorsDiv>{miniColorBoxes}</ColorsDiv>
        <TitleH5>
          {paletteName} <span>{emoji}</span>
        </TitleH5>
      </RootDiv>
    );
  }
);

export default MiniPalette;
