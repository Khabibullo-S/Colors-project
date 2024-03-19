import seedColors from "../seedColors";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      console.log(action.newColors);
      return action.newColors;
    case "ADD":
      return [...state, action.newColor];
    case "ADD_RANDOM":
      const allColors = [...action.palettes, ...seedColors]
        .map((p) => p.colors)
        .flat();
      let rand = Math.floor(Math.random() * allColors.length);
      let randomColor = allColors[rand];
      while (state.some((color) => color.name === randomColor.name)) {
        rand = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[rand];
      }
      return [...state, randomColor];
    case "REMOVE":
      return state.filter((color) => color.name !== action.colorName);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export default reducer;
