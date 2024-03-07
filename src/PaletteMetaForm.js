import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const PaletteMetaForm = ({ handlePaletteSubmit, open, handleClose }) => {
  const [newPaletteName, setNewPaletteName] = useState("");

  const paletteNameFormRef = useRef(null);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it's
            unique!
          </DialogContentText>
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
              margin="normal"
              fullWidth
            />
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
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
