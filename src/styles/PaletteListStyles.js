import styled from "@emotion/styled";
import sizes from "./sizes";
import bg from "./confetti-doodles.svg";

const getPaletteListStyles = () => {
  console.log(sizes.down("xs"));
  const RootDiv = styled.div`
    min-height: 100vh;
    height: min-content;
    padding: 0 0 100px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: #394bad;
    background-image: url(${bg});
    font-family: Roboto, sans-serif;
  `;

  const ContainerDiv = styled.div`
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    ${sizes.down(1300)} {
      width: 80%;
    }
    ${sizes.down("sm")} {
      width: 75%;
    }
  `;

  const Nav = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: white;
    a {
      color: white;
      font-weight: 100;
    }
    h1 {
      font-size: 2rem;
    }
  `;

  const PalettesDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-gap: 2.5rem;

    // I don't know why but if I use $ {sizes.down("md")}" kind of approach it is not working here
    @media (max-width: 991.98px) {
      grid-template-columns: repeat(2, 50%);
    }
    @media (max-width: 575.98px) {
      grid-template-columns: repeat(1, 100%);
      grid-gap: 2rem;
    }
  `;

  return { RootDiv, ContainerDiv, Nav, PalettesDiv };
};

export default getPaletteListStyles;
