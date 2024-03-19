import React, { useContext, useEffect } from "react";
import {
  Route,
  Routes,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import PalettesContext from "./contexts/Palettes.context";

const ColorsApp = () => {
  const location = useLocation();

  const palettes = useContext(PalettesContext);

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
                  <PaletteList />
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
                  <SingleColorPalette />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/new"
              element={
                <Page className="page">
                  <NewPaletteForm />
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

export default ColorsApp;
