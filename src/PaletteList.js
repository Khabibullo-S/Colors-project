import React, { useCallback, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import getPaletteListStyles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "@emotion/styled";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
import PalettesContext, {
  PalettesDispatchContext,
} from "./contexts/Palettes.context";

const TRANSITION_TIME = 500;

const PaletteList = ({ deletePalette }) => {
  const palettes = useContext(PalettesContext);
  const palettesDispatch = useContext(PalettesDispatchContext);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const openDialog = useCallback((id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  }, []);
  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };
  const handleDeletePalette = () => {
    palettesDispatch({ type: "DELETE", id: deletingId });
    closeDialog();
  };

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

  // console.log("RENDERING PALETTE LIST!");

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
              <MiniPalette
                {...palette}
                // deletePalette={deletePalette}
                openDialog={openDialog}
                key={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroupStyled>
        {/* </PalettesDiv> */}
      </ContainerDiv>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItemButton onClick={handleDeletePalette}>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: blue[100], color: blue[600] }}>
                <Check />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItemButton>
          <ListItemButton onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: red[100], color: red[600] }}>
                <Close />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItemButton>
        </List>
      </Dialog>
    </RootDiv>
  );
};

export default PaletteList;
