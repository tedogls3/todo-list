import { createContext, useContext, useReducer } from "react";

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return { ...state, items: [...state.items, action.payload] };

    case "toggleItem":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        ),
      };

    case "saveEditedItem":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        ),
      };

    case "deleteItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      throw new Error("Uknown Action");
  }
}

const TodosContext = createContext();

function TodosProvider({ children }) {
  const [{ items }, dispatch] = useReducer(reducer, initialState);

  const addTodo = (item) => {
    dispatch({ type: "addItem", payload: item });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "toggleItem", payload: id });
  };

  const saveEditedItem = (id, title) => {
    dispatch({ type: "saveEditedItem", payload: { id, title } });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "deleteItem", payload: id });
  };

  return (
    <TodosContext.Provider
      value={{
        items,
        addTodo,
        toggleTodo,
        saveEditedItem,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodosContext);
  if (context === "undefined")
    throw new Error("TodoContext was used outside of TodoProvider");

  return context;
}

export { TodosProvider, useTodos };
