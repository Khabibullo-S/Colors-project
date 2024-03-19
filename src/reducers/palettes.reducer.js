const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      return state.filter((palette) => palette.id !== action.id);
    case "SAVE":
      return [...state, action.newPalette];
    default:
      return state;
  }
};

export default reducer;
