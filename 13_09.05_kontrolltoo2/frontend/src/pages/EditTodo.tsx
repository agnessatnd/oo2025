import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppUser } from "../models/AppUser";
import { Todo } from "../models/Todo";

function EditTodo() {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState<Todo>();
  const [users, setUsers] = useState<AppUser[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/todo/${todoId}`)
      .then(res => res.json())
      .then(json => setTodo(json));

    fetch("http://localhost:8080/appuser")
      .then(res => res.json())
      .then(json => setUsers(json));
  }, [todoId]);

  const updateTodo = () => {
    const updated = {
      id: todoId,
      title: titleRef.current?.value,
      completed: todo?.completed ?? false,
      user: { id: Number(userRef.current?.value) }
    };

    fetch("http://localhost:8080/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })
      .then(() => navigate("/")); // Suuna pealehele tagasi peale uuendamist
  };

  if (!todo) return <div>Laen...</div>;

  return (
    <div>
      <h2>Muuda TODO</h2>
      <label>Pealkiri</label><br />
      <input type="text" ref={titleRef} defaultValue={todo.title} /><br />
      <label>Kasutaja</label><br />
      <select ref={userRef} defaultValue={todo.user?.id}>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select><br />
      <button onClick={updateTodo}>Salvesta</button>
    </div>
  );
}

export default EditTodo;
