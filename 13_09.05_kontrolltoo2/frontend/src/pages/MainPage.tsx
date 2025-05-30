import { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";
import { AppUser } from "../models/AppUser";
import { Link } from "react-router-dom";

function MainPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLSelectElement>(null);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then(res => res.json())
      .then(json => setTodos(json));
  

    fetch("http://localhost:8080/appuser")
      .then(res => res.json())
      .then(json => setUsers(json));
  }, []);

  const addTodo = () => {
    const newTodo = {
      title: titleRef.current?.value,
      completed: false,
      user: {
        id: Number(userRef.current?.value)
      }
    };
  
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    })
      .then(() => {
        if (titleRef.current) titleRef.current.value = "";
        fetch("http://localhost:8080/todos")
          .then(res => res.json())
          .then(json => setTodos(json));
      });
  };
  

  const toggleCompleted = (todo: Todo) => {
    fetch("http://localhost:8080/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: !todo.completed })
    })
      .then(() => {
        fetch("http://localhost:8080/todos")
          .then(res => res.json())
          .then(json => setTodos(json));
      });
  };

  const deleteTodo = (id: number) => {
    fetch(`http://localhost:8080/todo/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        fetch("http://localhost:8080/todos")
          .then(res => res.json())
          .then(json => setTodos(json));
      });
  };
  
  const searchTodos = () => {
    if (searchTerm.trim() === "") return;
  
    fetch(`http://localhost:8080/todos/search?title=${searchTerm}`)
      .then(res => res.json())
      .then(json => setTodos(json));
  };
  
  const showAllTodos = () => {
    setSearchTerm("");
    fetch("http://localhost:8080/todos")
      .then(res => res.json())
      .then(json => setTodos(json));
  };
  
  return (
    <div>
      <h3>TODO haldus</h3>
      <label>Pealkiri</label><br />
      <input ref={titleRef} type="text" /><br />
      <label>Kasutaja</label><br />
      <select ref={userRef}>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select><br />
      <button onClick={addTodo}>Lisa TODO</button>
      <br /><br />
      <div>
        <input
          type="text"
          placeholder="Otsi pealkirja järgi"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={searchTodos}>Otsi</button>
        <button onClick={showAllTodos}>Näita kõiki</button>
      </div>


      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-card ${todo.completed ? "completed" : ""}`}
          >
            <div>
              <strong>{todo.title}</strong><br />
              {todo.user?.name} – {todo.user?.email}
            </div>
            <div className="todo-actions">
              <button onClick={() => toggleCompleted(todo)}>
                {todo.completed ? "Tühista" : "Tehtud"}
              </button>
              <Link to={`/edit-todo/${todo.id}`}>
                <button>Muuda</button>
              </Link>
              <button onClick={() => deleteTodo(todo.id)}>Kustuta</button>
              <Link to={'/user/' + todo.user?.id}>
                <button>Vaata kasutajat</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
