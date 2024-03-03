import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function PaletteWrapper() {
  const { id } = useParams(); // Now useParams has the context it needs
  if (!seedColors.find((p) => p.id === id)) {
    return (
      <div>
        <h1>PALETTE NOT FOUND!</h1>
        <p>palette example: /palette/flat-ui-colors-aussie</p>
      </div>
    );
  }
  const palette = generatePalette(seedColors.find((p) => p.id === id));
  return <Palette palette={palette} />;
}

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<PaletteList palettes={seedColors} />} />
        <Route exact path="/palette/:id" element={<PaletteWrapper />} />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
        <Route exact path="/palette/new" element={<NewPaletteForm />} />
      </Routes>

      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
