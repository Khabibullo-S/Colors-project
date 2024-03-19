import React, { createContext } from "react";
import palettesReducer from "../reducers/palettes.reducer";
import useReducerLocalStorage from "../hooks/useReducerLocalStorage";
import seedColors from "../seedColors";

export const PalettesContext = createContext();
export const PalettesDispatchContext = createContext();

export const PalettesProvider = (props) => {
  const [palettes, dispatch] = useReducerLocalStorage(
    palettesReducer,
    seedColors,
    "palettes"
  );

  return (
    <PalettesContext.Provider value={palettes}>
      <PalettesDispatchContext.Provider value={dispatch}>
        {props.children}
      </PalettesDispatchContext.Provider>
    </PalettesContext.Provider>
  );
};

export default PalettesContext;
