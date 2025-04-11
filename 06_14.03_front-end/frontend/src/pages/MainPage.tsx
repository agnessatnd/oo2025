import { useCallback, useEffect, useState, useRef } from 'react'
import { Category } from '../models/Category';
import { Product } from '../models/Product';

function MainPage() {
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productsByPage, setProductByPage] = useState(1);
  const [page, setPage] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8080/categories")
        .then(res=>res.json())
        .then(json=> setKategooriad(json))
  }, []);



  const [activeCategory, setActiveCategory] = useState(-1);


  const showByCategory = useCallback((categoryId: number, currentPage: number) => {
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId + 
      "&size=" + productsByPage +
      "&page=" + currentPage
    )
        .then(res=>res.json()) 
        .then(json=> {
          setProducts(json.content);
          setTotalProducts(json.totalElements);
          setTotalPages(json.totalPages);
        })
  }, [productsByPage])

  useEffect(() => {
    showByCategory(-1, 0);
  }, [showByCategory]);

  function updatePage(newPage: number) {
    showByCategory(activeCategory, newPage);
  }

  const productsByPageRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      <select ref={productsByPageRef} onChange={() => setProductByPage(Number(productsByPageRef.current?.value))}>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
      </select>
      <button onClick={() => showByCategory(-1, 0)}>Kõik kategooriad</button>
      {kategooriad.map(kategooria => 
      <button key={kategooria.id} onClick={() => showByCategory(kategooria.id, 0)}>
        {kategooria.name}
      </button> )}
      <br />
      <br />
      <div>Kokku tooteid: {totalProducts} tk</div>
      {products.map(product => 
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>
        {/* <div>{product.active}</div> */}
      </div> )}
      <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
      <span>{page + 1}</span>
      <button disabled={page === totalPages} onClick={() => updatePage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default MainPage