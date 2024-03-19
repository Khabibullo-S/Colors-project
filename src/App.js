import React, { useEffect, useState } from "react";
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

const App = () => {
  const location = useLocation();
  const [palettes, setPalettes] = useLocalStorage("palettes", seedColors);

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);

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
    <div style={{ position: "relative" }}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="page" timeout={500}>
          <Routes location={location}>
            <Route
              exact
              path="/"
              element={
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/:id"
              element={
                <Page>
                  <PaletteWrapper />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/:paletteId/:colorId"
              element={
                <Page className="page">
                  <SingleColorPalette palettes={palettes} />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/new"
              element={
                <Page className="page">
                  <NewPaletteForm
                    savePalette={savePalette}
                    palettes={palettes}
                  />
                </Page>
              }
            />
            <Route exact path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
