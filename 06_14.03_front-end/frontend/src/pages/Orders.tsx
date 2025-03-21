import { useEffect, useState } from "react"
import { Order } from "../models/Order";

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/orders")
        .then(res => res.json())
        .then(json => setOrders(json))
    }, []);

  return (
    <div>
      {orders.map(order =>
        <div key={order.id}>
            <div>ID: {order.id}</div>
            <div>Loodud: {order.created?.toString()}</div>
            <div>Email: {order.person?.email}</div>
            <div>{order.product?.map(product =>
                <div>
                    <div>Toote nimi: {product.name}</div>
                    <div>Hind: {product.price}</div>
                </div>
            )}
            </div>
            <div>Kokku: {order.totalSum}$</div>
        </div>)}
        <br></br>
    </div>
  )
}

export default Orders
