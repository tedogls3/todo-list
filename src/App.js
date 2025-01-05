import TodoList from "./TodoList";
import { TodosProvider } from "./todoContext";

function App() {
  return (
    <div>
      <TodosProvider>
        <TodoList />
      </TodosProvider>
    </div>
  );
}

export default App;
