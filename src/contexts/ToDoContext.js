import React, { createContext, useReducer } from "react";
import todoReducer from "../reducers/todo.reducer";
import useReducerLocalStorage from "../hooks/useReducerLocalStorage";

export const ToDoContext = createContext();
export const DispatchContext = createContext();

export const ToDoProvider = (props) => {
  const initialTodos = [
    { id: "0", task: "Do homework", complete: true },
    { id: "1", task: "Cut hair, beard", complete: false },
    { id: "2", task: "Gain muscles", complete: false },
  ];

  const [todos, dispatch] = useReducerLocalStorage(
    todoReducer,
    initialTodos,
    "todos"
  );

  return (
    <ToDoContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
