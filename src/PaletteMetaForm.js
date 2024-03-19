import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useInput from "./hooks/useInput";

const PaletteMetaForm = ({ handlePaletteSubmit, stage, setFormStage }) => {
  const [newPaletteName, changeNewPaletteName] = useInput("");

  const paletteNameFormRef = useRef(null);

  const showEmojiPicker = () => {
    setFormStage("emoji");
  };

  const handleClose = () => {
    setFormStage("");
  };

  const savePalette = (emoji) => {
    const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
    handlePaletteSubmit(newPalette);
    setFormStage("");
  };

  return (
    <React.Fragment>
      <Dialog open={stage === "emoji"} onClose={handleClose}>
        <Picker data={data} onEmojiSelect={savePalette} theme="light" />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={handleClose}
        // PaperProps={{
        //   component: "form",
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it's
            unique!
          </DialogContentText>

          <ValidatorForm ref={paletteNameFormRef} onSubmit={showEmojiPicker}>
            <TextValidator
              value={newPaletteName}
              label="Palette Name"
              onChange={changeNewPaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["this field is required", "Name already used!"]}
              margin="normal"
              fullWidth
            />
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => paletteNameFormRef.current.submit()}
          >
            Save Palette
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PaletteMetaForm;
