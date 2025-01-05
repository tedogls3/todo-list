import { useState } from "react";
import { useTodos } from "./todoContext";

function TodoList() {
  const [newItem, setNewItem] = useState("");
  const [editedId, setEditedId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const { items, addTodo, toggleTodo, saveEditedItem, deleteTodo } = useTodos();

  const handleEditItem = (id, newTitle) => {
    setEditedId(id);
    setEditedTitle(newTitle);
  };

  const handleSaveEditedItem = () => {
    if (editedTitle.trim()) {
      saveEditedItem(editedId, editedTitle);
      setEditedId(null);
      setEditedTitle("");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const newObj = {
      id: Date.now(),
      title: newItem,
      completed: false,
    };

    if (!newItem) return;
    addTodo(newObj);
    setNewItem("");
  }

  return (
    <div>
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add todo..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            {editedId === item.id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <span
                style={item.completed ? { textDecoration: "line-through" } : {}}
              >
                {item.title}
              </span>
            )}
            {editedId === item.id ? (
              <button onClick={() => handleSaveEditedItem(item.id)}>
                save
              </button>
            ) : (
              <button onClick={() => handleEditItem(item.id, item.title)}>
                Edit
              </button>
            )}
            <button onClick={() => deleteTodo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
