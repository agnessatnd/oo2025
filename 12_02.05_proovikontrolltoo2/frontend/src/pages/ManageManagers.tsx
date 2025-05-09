import { useRef, useState, useEffect } from 'react';
import { Manager } from '../models/Manager';
import { ToastContainer, toast } from 'react-toastify';

function ManageManagers() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/manager")
      .then(res => res.json())
      .then(json => setManagers(json));
  }, []);

  const addManager = () => {
    const newManager = {
      name: nameRef.current?.value,
    };

    fetch("http://localhost:8080/manager", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newManager)
    })
      .then(res => res.json())
      .then(json => {
        setManagers(json);
        toast.success("Haldaja lisatud!");
        if (nameRef.current) nameRef.current.value = "";
      });
  };

  return (
    <div>
      <h3>Haldajate haldus</h3>
      <label>Nimi</label>
      <input ref={nameRef} type="text" /> <br />
      <button onClick={addManager}>Lisa haldaja</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nimi</th>
          </tr>
        </thead>
        <tbody>
          {managers.map(manager => (
            <tr key={manager.id}>
              <td>{manager.id}</td>
              <td>{manager.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default ManageManagers;
