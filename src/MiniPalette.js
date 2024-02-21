import React from "react";
import styled from "@emotion/styled";
// import { css } from "@emotion/react";

const Root = styled.div`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;
const Colors = styled.div`
  height: 120px;
  width: 100%;
  background-color: #dae1e4;
  border-radius: 5px;
  overflow: hidden;
`;

const Title = styled.h5`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: black;
  padding-top: 0.5rem;
  position: relative;
`;
const Emoji = styled.span`
  margin-left: 0.5rem;
  font-size: 1.5rem;
`;
const MiniColor = styled.div`
  height: 25%;
  width: 20%;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  margin-bottom: -4px;
`;

const MiniPalette = ({ paletteName, emoji, colors }) => {
  const miniColorBoxes = colors.map((color) => (
    <MiniColor
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></MiniColor>
  ));
  return (
    <Root>
      <Colors>{miniColorBoxes}</Colors>
      <Title>
        {paletteName} <span>{emoji}</span>
      </Title>
    </Root>
  );
};

export default MiniPalette;
