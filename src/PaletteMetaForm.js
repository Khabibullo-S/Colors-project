import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const PaletteMetaForm = ({ handlePaletteSubmit }) => {
  const [open, setOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");

  const paletteNameFormRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
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
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
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
            />
          </ValidatorForm>
          <Button
            variant="contained"
            color="primary"
            onClick={() => paletteNameFormRef.current.submit()}
          >
            Save Palette
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PaletteMetaForm;
