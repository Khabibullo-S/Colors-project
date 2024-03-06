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

const ColorPickerForm = ({ isPaletteFull, colors, addNewColor }) => {
  const [currentColor, setCurrentColor] = useState("teal"); // Initialize with a default color
  const [newColorName, setNewColorName] = useState("");

  const handleSubmit = () => {
    addNewColor({ color: currentColor, name: newColorName });
    setNewColorName("");
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

    // Clean up the validation rule when the component unmounts (optional)
    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
    };
  }, [colors, currentColor]);

  return (
    <>
      <ChromePicker
        color={currentColor}
        onChange={(newColor) => setCurrentColor(newColor.hex)}
      />

      <ValidatorForm onSubmit={handleSubmit}>
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
    </>
  );
};

export default ColorPickerForm;
