import React, { createContext } from "react";
import palettesReducer from "../reducers/palettes.reducer";
import useReducerLocalStorage from "../hooks/useReducerLocalStorage";
import seedColors from "../seedColors";

export const PalettesContext = createContext();
export const DispatchContext = createContext();

export const PalettesProvider = (props) => {
  const [palettes, dispatch] = useReducerLocalStorage(
    palettesReducer,
    seedColors,
    "palettes"
  );

  return (
    <PalettesContext.Provider value={palettes}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </PalettesContext.Provider>
  );
};

export default PalettesContext;
