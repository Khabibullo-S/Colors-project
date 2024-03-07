import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { drawerWidth } from "./NewPaletteForm";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  height: "64px",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBtns = styled("div")({});

const PaletteFormNav = ({ open, handleDrawerOpen, handlePaletteSubmit }) => {
  const navigate = useNavigate();
  const [newPaletteName, setNewPaletteName] = useState("");

  const paletteNameFormRef = useRef(null);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
        </Toolbar>
        <NavBtns>
          <ValidatorForm
            ref={paletteNameFormRef}
            onSubmit={() => handlePaletteSubmit(newPaletteName)}
          >
            <TextValidator
              value={newPaletteName}
              label="Palette Name"
              onChange={(evt) => setNewPaletteName(evt.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["this field is required", "Name already used!"]}
            />
          </ValidatorForm>
          <Button
            variant="contained"
            color="primary"
            onClick={() => paletteNameFormRef.current.submit()}
          >
            Save Palette
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
        </NavBtns>
      </AppBar>
    </>
  );
};

export default PaletteFormNav;
