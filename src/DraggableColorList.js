import React, { useContext } from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";
import { styled } from "@mui/material";
import sizes from "./styles/sizes";
import {
  ColorsContext,
  ColorsDispatchContext,
} from "./contexts/NewPaletteForm.context";

const Colors = styled("div")({
  height: "100%",
  [sizes.down(599)]: {
    marginTop: "9px",
    height: `calc(100% - 1px)`,
  },
});

const DraggableColorList = SortableContainer(() => {
  const colors = useContext(ColorsContext);
  const colorsDispatch = useContext(ColorsDispatchContext);
  return (
    <Colors>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() =>
            colorsDispatch({ type: "REMOVE", colorName: color.name })
          }
        />
      ))}
    </Colors>
  );
});

export default DraggableColorList;
