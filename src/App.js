import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import "./App.css";

const App = () => {
  const location = useLocation();
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const syncLocalStorage = () => {
    // save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  const PaletteWrapper = () => {
    const { id } = useParams(); // Now useParams has the context it needs
    if (!palettes.find((p) => p.id === id)) {
      return (
        <div>
          <h1>PALETTE NOT FOUND!</h1>
          <p>palette example: /palette/flat-ui-colors-aussie</p>
        </div>
      );
    }
    const palette = generatePalette(palettes.find((p) => p.id === id));
    return <Palette palette={palette} />;
  };

  return (
    // <div>
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Routes location={location}>
          <Route
            exact
            path="/"
            element={
              <div className="page">
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </div>
            }
          />
          <Route exact path="/palette/:id" element={<PaletteWrapper />} />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            element={
              <div className="page">
                <SingleColorPalette palettes={palettes} />
              </div>
            }
          />
          <Route
            exact
            path="/palette/new"
            element={
              <div className="page">
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </div>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
    // </div>
  );
};

export default App;
