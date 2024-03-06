import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";

export const drawerWidth = 400;

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
    height: `calc(100vh - 50.5px)`,
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

const NewPaletteForm = (props) => {
  const { maxColors = 20 } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal"); // Initialize with a default color
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = useState("");

  const [isPaletteFull, setIsPaletteFull] = useState(
    colors.length >= props.maxColors
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    setColors([...colors, newColor]);
    setNewColorName("");
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const handlePaletteSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      colors: colors,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "🎨",
    };
    props.savePalette(newPalette);
    navigate("/");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((items) => arrayMove(items, oldIndex, newIndex));
  };

  useEffect(() => {
    // Custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return colors.every(({ color }) => color !== currentColor);
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });

    // Clean up the validation rule when the component unmounts (optional)
    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
      ValidatorForm.removeValidationRule("isPaletteNameUnique");
    };
  }, [colors, currentColor]);

  useEffect(() => {
    setIsPaletteFull(colors.length >= maxColors);
  }, [colors, maxColors]);

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
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
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Typography variant="h4">Design Your Palette</Typography>

        <div>
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
        </div>

        <ChromePicker
          color={currentColor}
          onChange={(newColor) => setCurrentColor(newColor.hex)}
        />

        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newColorName}
            onChange={(evt) => setNewColorName(evt.target.value)}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "Color name must be unique",
              "Color already used!",
            ]}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: isPaletteFull ? "#e0e0e0" : currentColor,
            }}
            type="submit"
            disabled={isPaletteFull}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
