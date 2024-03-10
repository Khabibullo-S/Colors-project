import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import getPaletteListStyles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "@emotion/styled";

const TRANSITION_TIME = 500;

const PaletteList = ({ palettes, deletePalette }) => {
  const navigate = useNavigate();

  /* EMOTION STYLES */
  const { RootDiv, ContainerDiv, Nav, PalettesDiv } = useMemo(
    () => getPaletteListStyles(),
    []
  );
  const TransitionGroupStyled = useMemo(
    () => styled(TransitionGroup)`
      ${PalettesDiv.__emotion_styles} // Apply the PalettesDiv styles here
      .fade-exit {
        opacity: 1;
      }
      .fade-exit-active {
        opacity: 0;
        transition: opacity ${TRANSITION_TIME}ms ease-out;
      }
    `,
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
        {/* <PalettesDiv> */}
        <TransitionGroupStyled>
          {palettes.map((palette) => (
            <CSSTransition
              key={palette.id}
              classNames="fade"
              timeout={TRANSITION_TIME}
            >
              <div onClick={() => navigate(`/palette/${palette.id}`)}>
                <MiniPalette
                  {...palette}
                  deletePalette={deletePalette}
                  key={palette.id}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroupStyled>
        {/* </PalettesDiv> */}
      </ContainerDiv>
    </RootDiv>
  );
};

export default PaletteList;
