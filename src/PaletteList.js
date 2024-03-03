import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import getPaletteListStyles from "./styles/PaletteListStyles";

const PaletteList = ({ palettes }) => {
  const navigate = useNavigate();

  /* EMOTION STYLES */
  const { RootDiv, ContainerDiv, Nav, PalettesDiv } = useMemo(
    () => getPaletteListStyles(),
    []
  );
  /* END OF STYLES */
  return (
    <RootDiv>
      <ContainerDiv>
        <Nav>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </Nav>
        <PalettesDiv>
          {palettes.map((palette) => (
            <div onClick={() => navigate(`/palette/${palette.id}`)}>
              <MiniPalette {...palette} />
            </div>
          ))}
        </PalettesDiv>
      </ContainerDiv>
    </RootDiv>
  );
};

export default PaletteList;
