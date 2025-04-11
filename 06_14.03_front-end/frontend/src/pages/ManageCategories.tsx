import { useRef, useEffect,  useState } from "react";
import { Category } from '../models/Category';
import { ToastContainer, toast } from 'react-toastify';

function ManageCategories() {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategory(json))
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategory(json))
  }, []);

  function handleDelete(id: number): void {
    fetch(`http://localhost:8080/categories/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) {
          throw new Error("Kategooria kustutamine ebaõnnestus");
        }
        return res.json();
      })
      .then(json => setCategory(json))
      .catch(error => console.error("Viga kustutamisel:", error));
  }

  const nameRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);

  const addCategory = () => {
    const newCategory = {
      name: nameRef.current?.value,
      active: activeRef.current?.checked
    }
    fetch("http://localhost:8080/categories", {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          setCategory(json)
          toast.success("Uus kategooria lisatud!");
          
          if(nameRef.current && activeRef.current){
            nameRef.current.value = "";
            activeRef.current.checked = false;
          }
        } else {
          toast.error(json.message);
        }
      })
    }
  

  return (
    <div>
      <h3>Manage Categories</h3>
      <label>Name</label>
      <input ref={nameRef} type="text" /> <br />
      <label>Active</label>
      <input ref={activeRef} type="checkbox" /> <br />
      <button onClick={() => addCategory()}>
        Add category
      </button> <br />
      <table>
        <thead>
          <tr>
        <th>ID</th>
        <th>Nimi</th>
        <th>Aktiivne</th>
        <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          {category.map(category => (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.active ? "Jah" : "Ei"}</td>
          <td>
            <button onClick={() => handleDelete(category.id)}>Kustuta</button>
          </td>
        </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}

export default ManageCategories
