import React from "react";
import { styled } from "@mui/material/styles";

const Root = styled("div")({
  width: "20%",
  height: "25%",
  margin: "0, auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-4.5px",
});

const DraggableColorBox = ({ color, name }) => {
  return <Root style={{ backgroundColor: color }}>{name}</Root>;
};

export default DraggableColorBox;
