import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  Routes,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import { useLocalStorage } from "./hooks/useStorage";
import PalettesContext, {
  PalettesDispatchContext,
  PalettesProvider,
} from "./contexts/Palettes.context";
import ColorsApp from "./ColorsApp";

const App = () => {
  return (
    <>
      <PalettesProvider>
        <ColorsApp />
      </PalettesProvider>
    </>
  );
};

export default App;
