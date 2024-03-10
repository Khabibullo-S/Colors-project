import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import "rc-slider/assets/index.css";
import { Icon, IconButton } from "@mui/material";
import getNavbarStyles from "./styles/NavbarStyles";

const Navbar = ({ level, setLevel, changeFormat }) => {
  const [format, setFormat] = useState("hex");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setSnackbarOpen(true);
  };

  /* EMOTION STYLES */
  const { NavbarHeader, LogoDiv, SliderDiv, SelectContainerDiv } = useMemo(
    () => getNavbarStyles(),
    []
  );
  /* END OF STYLES */

  return (
    <NavbarHeader>
      <LogoDiv>
        <Link to="/">reactcolorpicker</Link>
      </LogoDiv>
      {level && setLevel && (
        <div>
          <span>Level: {level}</span>
          <SliderDiv>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChangeComplete={setLevel}
            />
          </SliderDiv>
        </div>
      )}
      <SelectContainerDiv>
        <FormControl
          variant="standard"
          sx={{
            background: "none",
          }}
        >
          <Select value={format} onChange={handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </FormControl>
      </SelectContainerDiv>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={() => setSnackbarOpen(false)}
        action={[
          <IconButton
            onClick={() => setSnackbarOpen(false)}
            color="inherit"
            key={"close"}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </NavbarHeader>
  );
};

export default Navbar;
