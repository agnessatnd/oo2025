import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Product} from '../models/Product'
function SingleProduct() {
    const {productId} = useParams();

    const [product, setProduct] = useState<Product>();

    
    useEffect(() => {
        fetch("http://localhost:8080/products/" + productId)
            .then(res => res.json())
            .then(json => setProduct(json))
    }, [productId]);
return (
    <div>
      <div>Nimi: {product?.name}</div>
      <div>Hind: {product?.price}</div>
      <div>Kategooria: {product?.category?.name}</div>
      <img src="{product?.image}" alt="" />
    </div>
  )
} 

export default SingleProduct

