import { useState } from "react";

function TodoList() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  function handleAddTodo(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteTodo(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleEditItem(id, title) {
    setEditingItemId(id);
    setEditedTitle(title);
  }

  function handleSaveEditedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, title: editedTitle } : item
      )
    );

    setEditingItemId(null);
    setEditedTitle("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: newItem,
      completed: false,
    };

    if (!newItem) return;

    handleAddTodo(newTodo);
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
              onChange={() => handleToggleItem(item.id)}
            />

            {editingItemId === item.id ? (
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

            {editingItemId === item.id ? (
              <button onClick={() => handleSaveEditedItem(item.id)}>
                Save
              </button>
            ) : (
              <button onClick={() => handleEditItem(item.id, item.title)}>
                Edit
              </button>
            )}
            <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
