import styled from "@emotion/styled";
import sizes from "./sizes";

const getNavbarStyles = () => {
  const NavbarHeader = styled.header`
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `;
  const LogoDiv = styled.div`
    margin-right: 15px;
    padding: 0 13px;
    font-size: 22px;
    background-color: #eceff1;
    font-family: Roboto;
    height: 100%;
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      color: black;
    }
    ${sizes.down("xs")} {
      display: none;
      .SingleColorPalette & {
        display: flex;
      }
    }
  `;
  const SliderDiv = styled.div`
    width: 340px;
    margin: 0 10px;
    display: inline-block;
    & .rc-slider-track {
      background-color: transparent;
    }
    & .rc-slider-rail {
      height: 8px;
    }
    & .rc-slider-handle,
    .rc-slider-handle:active,
    .rc-slider-handle:focus,
    .rc-slider-handle:hover {
      background-color: green;
      outline: none;
      border: 2px solid green;
      box-shadow: none;
      width: 13px;
      height: 13px;
      margin-top: -2.5px;
    }
    ${sizes.down("sm")} {
      width: 150px;
    }
  `;
  const SelectContainerDiv = styled.div`
    margin-left: auto;
    margin-right: 1rem;
    & .Mui-focused .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input:focus {
    background-color: #fff;
  `;

  return { NavbarHeader, LogoDiv, SliderDiv, SelectContainerDiv };
};

export default getNavbarStyles;
