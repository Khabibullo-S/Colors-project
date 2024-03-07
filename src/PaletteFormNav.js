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
import PaletteMetaForm from "./PaletteMetaForm";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
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

const NavBtns = styled("div")({
  marginRight: "1rem",
  "& .MuiButton-root": {
    margin: "0 0.5rem",
  },
});

const PaletteFormNav = ({ open, handleDrawerOpen, handlePaletteSubmit }) => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Save
          </Button>
        </NavBtns>
      </AppBar>
      {openForm && (
        <PaletteMetaForm
          handlePaletteSubmit={handlePaletteSubmit}
          open={openForm}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default PaletteFormNav;
