const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.todo];
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.newTodo.id ? action.newTodo : todo
      );
    default:
      return state;
  }
};

export default reducer;
