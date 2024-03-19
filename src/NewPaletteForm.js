import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import { APPBAR_HEIGHT, DRAWER_WIDTH } from "./constants";
import sizes from "./styles/sizes";
import seedColors from "./seedColors";
import useToggle from "./hooks/useToggle";
import PalettesContext, {
  PalettesDispatchContext,
} from "./contexts/Palettes.context";

const drawerWidth = DRAWER_WIDTH;
const appBarHeight = APPBAR_HEIGHT;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    height: `calc(100vh - ${appBarHeight}px)`,
    [sizes.down("sm")]: {
      marginLeft: `-100%`,
      height: `calc(100vh - ${appBarHeight}px)`,
    },
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Buttons = styled("div")({
  width: "100%",
  "& .MuiButton-root": {
    width: "50%",
  },
});
const Container = styled("div")({
  height: "100%",
  width: "100%",
  padding: "0 10%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const NewPaletteForm = (props) => {
  const palettes = useContext(PalettesContext);
  const palettesDispatch = useContext(PalettesDispatchContext);

  const { maxColors = 20 } = props;
  const navigate = useNavigate();
  const [open, toggleOpen] = useToggle(true);
  const [colors, setColors] = useState(seedColors[0].colors);

  const [isPaletteFull, setIsPaletteFull] = useState(
    colors.length >= props.maxColors
  );

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const addRandomColor = () => {
    const allColors = [...palettes, ...seedColors].map((p) => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];
    while (colors.some((color) => color.name === randomColor.name)) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
    }
    setColors([...colors, randomColor]);
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const handlePaletteSubmit = (newPalette) => {
    newPalette.colors = colors;
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    palettesDispatch({ type: "SAVE", newPalette: newPalette });
    navigate("/");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((items) => arrayMove(items, oldIndex, newIndex));
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });

    // Clean up the validation rule when the component unmounts (optional)
    return () => {
      ValidatorForm.removeValidationRule("isPaletteNameUnique");
    };
  }, []);

  useEffect(() => {
    setIsPaletteFull(colors.length >= maxColors);
  }, [colors, maxColors]);

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={toggleOpen}
        handlePaletteSubmit={handlePaletteSubmit}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          [sizes.down("sm")]: {
            width: "100%",
            "& .MuiDrawer-paper": {
              width: "100%",
            },
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={toggleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Container>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <Buttons>
            <Button variant="contained" color="secondary" onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={isPaletteFull}
            >
              Random Color
            </Button>
          </Buttons>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            colors={colors}
            addNewColor={addNewColor}
          />
        </Container>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={10}
        />
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
