import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppUser } from '../models/AppUser';
import { Todo } from '../models/Todo';

function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState<AppUser | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/appuser/${id}`)
      .then(res => res.json())
      .then(setUser);

    fetch(`http://localhost:8080/todos/user/${id}`)
      .then(res => res.json())
      .then(setTodos);
  }, [id]);

  return (
    <div>
      <h2>{user?.name} TODO-d</h2>
      <p>Email: {user?.email}</p>
      <ul>
        {todos.map(todo => (
          <div key={todo.id}>{todo.title} {todo.completed ? "✅" : "❌"}</div>
        ))}
      </ul>
    </div>
  );
}

export default SingleUser;
