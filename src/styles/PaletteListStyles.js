import styled from "@emotion/styled";

const getPaletteListStyles = () => {
  const RootDiv = styled.div`
    background-color: blue;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  `;

  const ContainerDiv = styled.div`
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
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
  `;

  const PalettesDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-gap: 5%;
  `;

  return { RootDiv, ContainerDiv, Nav, PalettesDiv };
};

export default getPaletteListStyles;
