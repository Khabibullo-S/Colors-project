import React, { createContext, useReducer } from "react";
import colorsReducer from "../reducers/colors.reducer";
import seedColors from "../seedColors";

export const ColorsContext = createContext();
export const ColorsDispatchContext = createContext();

export const NewPaletteFormContext = createContext();

export const ColorsProvider = (props) => {
  const [colors, dispatch] = useReducer(colorsReducer, seedColors[0].colors);

  return (
    <ColorsContext.Provider value={colors}>
      <ColorsDispatchContext.Provider value={dispatch}>
        {props.children}
      </ColorsDispatchContext.Provider>
    </ColorsContext.Provider>
  );
};

export const NewPaletteFormProvider = (props) => {
  return (
    <NewPaletteFormContext.Provider>
      <ColorsProvider>{props.children}</ColorsProvider>
    </NewPaletteFormContext.Provider>
  );
};

export default NewPaletteFormProvider;
