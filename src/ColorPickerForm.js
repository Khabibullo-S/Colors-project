import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { styled } from "@mui/material";

const Picker = styled(ChromePicker)({
  width: "100% !important",
  marginTop: "2rem",
});

const ColorNameInput = styled(TextValidator)({
  width: "100%",
  height: "70px",
  //   marginTop: ".8rem",
});

const AddColor = styled(Button)({
  width: "100%",
  padding: ".5rem",
  marginTop: "1rem",
  fontSize: "1.5rem",
});

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
      <Picker
        color={currentColor}
        onChange={(newColor) => setCurrentColor(newColor.hex)}
      />

      <ValidatorForm
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
        instantValidate={false}
      >
        <ColorNameInput
          variant="filled"
          margin="normal"
          value={newColorName}
          label="Color Name"
          onChange={(evt) => setNewColorName(evt.target.value)}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "this field is required",
            "Color name must be unique",
            "Color already used!",
          ]}
        />
        <AddColor
          variant="contained"
          style={{
            backgroundColor: isPaletteFull ? "#e0e0e0" : currentColor,
          }}
          type="submit"
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </AddColor>
      </ValidatorForm>
    </>
  );
};

export default ColorPickerForm;
