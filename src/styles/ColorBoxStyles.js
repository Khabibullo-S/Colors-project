import chroma from "chroma-js";
import styled from "@emotion/styled";
import sizes from "./sizes";

const getColorBoxStyles = (background) => {
  background = background ? background : "#000";
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  const DefLightTextSpan = styled.span`
    color: ${isLightColor ? "rgba(0,0,0,0.6)" : "white"};
  `;
  const DefDarkTextSpan = styled.span`
    color: ${isDarkColor ? "white" : "rgba(0,0,0,0.6)"};
  `;
  const ColorBoxDiv = styled.div`
    position: relative;
    width: 20%;
    height: 25%;
    margin: 0, auto;
    display: inline-block;
    cursor: pointer;
    margin-bottom: -4.5px;
    background: ${background};
    .SingleColorPalette & {
      height: 50%;
    }
    ${sizes.down("lg")} {
      width: 25%;
      height: 20%;
      margin-bottom: -3.9px;
      .SingleColorPalette & {
        width: 50%;
        height: 20%;
      }
    }
    ${sizes.down("md")} {
      width: 50%;
      height: 10%;
      margin-bottom: -4px;
      .SingleColorPalette & {
        width: 50%;
        height: 20%;
      }
    }
    ${sizes.down("xs")} {
      width: 100%;
      height: 5%;
      margin-bottom: -4px;
      .SingleColorPalette & {
        height: 10%;
      }
    }
  `;
  const BackButton = styled.button`
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
  const CopyButton = styled.button`
    ${BackButton.__emotion_styles}
    opacity: 0;
    ${ColorBoxDiv}:hover & {
      opacity: 1;
      transition: 0.5s;
    }
  `;
  const CopyOverlayDiv = styled.div`
    background: ${background};
    opacity: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    transform: scale(0.1);
    &.show {
      opacity: 1;
      transform: scale(50);
      z-index: 10;
      position: absolute;
    }
  `;
  const CopyMessageDiv = styled.div`
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
    transform: scale(0);
    opacity: 0;
    color: #fff;
    &.show {
      opacity: 1;
      transform: scale(1);
      z-index: 25;
      transition: opacity 0.4s ease-in-out;
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
  const BoxContentDiv = styled.div`
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 10px;
    color: black;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 12px;
  `;
  const SeeMoreSpan = styled.span`
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    border: none;
    right: 0;
    bottom: 0;
    color: #fff;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-transform: uppercase;
    ${sizes.down("xs")} {
      height: 100%;
    }
  `;

  return {
    DefDarkTextSpan,
    DefLightTextSpan,
    ColorBoxDiv,
    BackButton,
    CopyButton,
    CopyOverlayDiv,
    CopyMessageDiv,
    BoxContentDiv,
    SeeMoreSpan,
  };
};

export default getColorBoxStyles;
