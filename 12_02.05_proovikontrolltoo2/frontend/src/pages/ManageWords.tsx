import { useEffect, useRef, useState } from 'react';
import { Word } from '../models/Word';
import { Manager } from '../models/Manager';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ManageWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);

  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const managerIdRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/words")
      .then(res => res.json())
      .then(json => setWords(json));
    fetch("http://localhost:8080/manager")
      .then(res => res.json())
      .then(json => setManagers(json));
  }, []);

  const addWord = () => {
    const newWord = {
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
      manager: {
        id: Number(managerIdRef.current?.value)
      }
    };

    fetch("http://localhost:8080/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord)
    })
      .then(res => res.json())
      .then(json => {
        setWords(json);
        toast.success("Uus sõna lisatud!");
        if (typeRef.current) typeRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";
      });
  };

  const deleteWord = (id: number) => {
    fetch(`http://localhost:8080/word/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(json => {
        setWords(json);
        toast.success("Sõna kustutatud!");
      });
  };

  return (
    <div>
      <h3>Sõnade haldus</h3>
      <label>Sõna</label>
      <input ref={typeRef} type="text" /> <br />
      <label>Tähendus</label>
      <input ref={descriptionRef} type="text" /> <br />
      <label>Haldaja</label>
      <select ref={managerIdRef}>
        {managers.map(manager => (
          <option key={manager.id} value={manager.id}>
            {manager.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={addWord}>Lisa sõna</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sõna</th>
            <th>Tähendus</th>
            <th>Haldaja</th>
            <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          {words.map(word => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.type}</td>
              <td>{word.description}</td>
              <td>{word.manager?.name}</td>
              <td>
                <button onClick={() => deleteWord(word.id)}>Kustuta</button>
                <Link to={`/manage/edit-word/${word.id}`}>
                    <button>Muuda</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default ManageWords;
