import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

import PaletteMetaForm from "./PaletteMetaForm";
import { APPBAR_HEIGHT, DRAWER_WIDTH } from "./constants";
import { AddToPhotos } from "@mui/icons-material";
import sizes from "./styles/sizes";

const drawerWidth = DRAWER_WIDTH;
const appBarHeight = APPBAR_HEIGHT;

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
  height: `${appBarHeight}px`,
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
    [sizes.down("md")]: {
      margin: "0 0.2rem",
      padding: "0.3rem",
    },
  },
  [sizes.down("md")]: {
    marginRight: "0.5rem",
  },
});

const PaletteFormNav = ({ open, handleDrawerOpen, handlePaletteSubmit }) => {
  const navigate = useNavigate();
  const [formStage, setFormStage] = useState("");

  const handleClickOpen = () => {
    setFormStage("form");
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
            <AddToPhotos />
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
      <PaletteMetaForm
        handlePaletteSubmit={handlePaletteSubmit}
        stage={formStage}
        setFormStage={setFormStage}
      />
    </>
  );
};

export default PaletteFormNav;
