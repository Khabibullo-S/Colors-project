import React from "react";
import { Route, Routes } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<h1>PALETTE LIST GOES HERE</h1>} />
        <Route
          exact
          path="/palette/:id"
          element={<h1>INDIVIDUAL PALETTE</h1>}
        />
      </Routes>

      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
