import chroma from "chroma-js";
import styled from "@emotion/styled";

const getColorBoxStyles = (background) => {
  background = background ? background : "#000";
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  const DefLightTextSC = styled.span`
    color: ${isLightColor ? "rgba(0,0,0,0.6)" : "white"};
  `;
  const DefDarkTextSC = styled.span`
    color: ${isDarkColor ? "white" : "rgba(0,0,0,0.6)"};
  `;
  const ColorBoxSC = styled.div`
    width: 20%;
    height: 25%;
    margin: 0, auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -4.5px;
    background: ${background};
    .SingleColorPalette & {
      height: 50%;
    }
  `;
  const BackButtonSC = styled.button`
    width: 100px;
    height: 30px;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -50px;
    text-align: center;
    outline: none;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 1rem;
    line-height: 30px;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
  `;
  const CopyButtonSC = styled.button`
    ${BackButtonSC.__emotion_styles}
    opacity: 0;
    ${ColorBoxSC}:hover & {
      opacity: 1;
      transition: 0.5s;
    }
  `;
  const CopyOverlaySC = styled.div`
    background: ${background};
    opacity: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    transition: transform 10s ease-in-out;
    transform: scale(0.1);
    &.show {
      opacity: 1;
      transform: scale(50);
      z-index: 10;
      position: absolute;
    }
  `;
  const CopyMessageSC = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    transform: scale(0.1);
    opacity: 0;
    color: #fff;
    &.show {
      opacity: 1;
      transform: scale(1);
      z-index: 25;
      transition: all 0.4s ease-in-out;
      transition-delay: 0.3s;
    }
    h1 {
      font-weight: 400;
      text-shadow: 1px 2px black;
      background: rgba(255, 255, 255, 0.2);
      width: 100%;
      margin-bottom: 0;
      text-align: center;
      text-transform: uppercase;
    }
    p {
      font-size: 2rem;
      font-weight: 100;
    }
  `;

  return {
    DefDarkTextSC,
    DefLightTextSC,
    ColorBoxSC,
    BackButtonSC,
    CopyButtonSC,
    CopyOverlaySC,
    CopyMessageSC,
  };
};

export default getColorBoxStyles;
