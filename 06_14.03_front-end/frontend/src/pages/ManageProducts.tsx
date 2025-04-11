import { useEffect,  useRef,  useState } from "react";
import { Product } from '../models/Product';
import { Category } from "../models/Category";
import { ToastContainer, toast } from 'react-toastify';


function ManageProducts() {
      const [products, setProducts] = useState<Product[]>([]);
      const [categories, setCategories] = useState<Category[]>([]);

      useEffect(() => {
        fetch ("http://localhost:8080/categories")
          .then(res => res.json())
          .then(json => setCategories(json))
      }, []);
  
      useEffect(() => {
        fetch("http://localhost:8080/products")
          .then(res => res.json())
          .then(json => setProducts(json))
      }, []);

      const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/products/${id}`, {
          method: "DELETE",
        }).then(() => 
          setProducts(products.filter(product => product.id !== id)));
        ;
      };

      const nameRef = useRef<HTMLInputElement>(null);
      const priceRef = useRef<HTMLInputElement>(null);
      const imageRef = useRef<HTMLInputElement>(null);
      const activeRef = useRef<HTMLInputElement>(null);
      const categoryRef = useRef<HTMLSelectElement>(null);

      const addProduct = () => {
        const newProduct = {
          name: nameRef.current?.value,
          price: Number(priceRef.current?.value),
          image: imageRef.current?.value,
          active: activeRef.current?.checked,
          category: {"id": Number(categoryRef.current?.value)}
        }
    
        fetch(`http://localhost:8080/products`, {
          method: "POST",
          body: JSON.stringify(newProduct),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>res.json())
          .then(json=> {
            if (json.message === undefined && json.timestamp === undefined 
                            && json.status === undefined) {
              setProducts(json);
              toast.success("Uus toode lisatud!");
            } else {
              toast.error(json.message);
            }
          })
      }

      
  return (
    <div>
      <h3>Manage Products</h3>
      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Image</label><br />
      <input ref={imageRef} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <label>Category</label> <br />
      <select ref={categoryRef}>
        {categories.map(category => <option value={category.id}>{category.name}</option>)}
      </select> <br />
      <button onClick={() => addProduct()}>Add product</button> <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nimi</th>
            <th>Hind</th>
            <th>Pilt</th>
            <th>Aktiivne</th>
            <th>Kategooria</th>
            <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.image}</td>
              <td>{product.active ? "Jah" : "Ei"}</td>
              <td>{product.category ? product.category.name : "Kategooria puudub"}</td>
              <td>
          <button onClick={() => handleDelete(product.id)}>Kustuta</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}

export default ManageProducts
