import React from "react";
import { PalettesProvider } from "./contexts/Palettes.context";
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
