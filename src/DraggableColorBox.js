import React from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";
import { IconButton } from "@mui/material";

const Root = styled("div")({
  width: "20%",
  height: "25%",
  margin: "0, auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-6.5px",
  "&:hover svg": {
    color: "white",
    transform: "scale(1.5)",
  },
});

const BoxContent = styled("div")({
  position: "absolute",
  width: "100%",
  left: "0",
  bottom: "0",
  padding: "10px",
  color: "rgba(0,0,0,0.5)",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

const DeleteIconCustom = styled(DeleteIcon)({
  width: "18px",
  height: "18px",
  transition: "all 0.3s ease-in-out",
});

const DraggableColorBox = SortableElement((props) => {
  return (
    <Root style={{ backgroundColor: props.color }}>
      <BoxContent>
        <span>{props.name}</span>
        {/* <IconButton sx={{ padding: "6px" }}> */}
        <DeleteIconCustom onClick={props.handleClick} />
        {/* </IconButton> */}
      </BoxContent>
    </Root>
  );
});

export default DraggableColorBox;
