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
  &:hover: {
    cursor: pointer;
  }
`;
const Colors = styled.div`
  background-color: grey;
`;

const Title = styled.h5`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: black;
  padding-top: 0.5rem;
  font-size: 1rem;
  position: relative;
`;
const Emoji = styled.span`
  margin-left: 0.5rem;
  font-size: 1.5rem;
`;

const MiniPalette = ({ paletteName, emoji }) => {
  return (
    <Root>
      <Colors></Colors>
      <Title>
        {paletteName} <span>{emoji}</span>
      </Title>
    </Root>
  );
};

export default MiniPalette;
