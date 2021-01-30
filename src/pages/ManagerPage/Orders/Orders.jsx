import React, { useEffect, useState }  from 'react'
import { orderTableHeaders } from '../../../data'
import { Route, NavLink, Switch } from "react-router-dom";
import hc from '../../../hc';
import NewOrderPage from '../../NewOrderPage';
import OrderPage from '../../OrderPage';
import ManagerPage from '../index';

const statusClass = {
    new: 'badge-primary',
    process: 'badge-warning',
    back: 'badge-danger',
    archived: 'badge-dark',
};

export default function Orders(props) {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        hc.get("/orders", { _limit: 1000 })
            .then((orders) =>
                setOrders(orders)
            );
    }, []);

    useEffect(() => {
        hc.get("/products", { _limit: 1000 }).then((products) =>
            setProducts(products)
        );
    }, []);



    const fields = {
        ID: 'id',
        client: 'fullname',
        name: 'productId',
        price: 'productId',
        status: 'status',
        dateTime: 'createAr'
    }
    const trArr = [];
    orders.map((order, i) => {
        let tdArr= []
        orderTableHeaders.map((header, i) => {
            const value = order[fields[header.field]]
            let td
            if( header.field === 'status') {
                td = (
                    <td key={i} className={ `badge ${statusClass[value]}`}>
                    {value}
                </td>
                )
            } else if(header.field === 'action' ) {
                td = (
                    <td key={i}>
                        <NavLink to={`/order/${order.id}`} className='btn btn-outline-primary btn-sm'>Редактировать</NavLink>
                    </td>
                )
            } else if(header.field === 'dateTime') {
                const date = new Date(order.createdAt)
                const createdAt = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

                td = (
                    <td key={i}>
                        {createdAt}
                    </td>
                )
            } else if(header.field === 'name' || header.field === 'price' ) {
                products.map(product => {
                    if (order.productId === product.id) {
                        td = (
                            <td key={i}>
                                {product[header.field]}
                            </td>
                        )
                    }
                })
            } else (
                td = (
                    <td key={i}>
                        {value}
                    </td>
                )
            )

        tdArr.push(td)
        })
        const tr = (
            <tr key={i}>
                {tdArr}
            </tr>
        )
        trArr.push(tr)
    })
    
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        {orderTableHeaders.map((header, i) => (
                            <th key={i}>{header.label || header.field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{trArr}</tbody>
            </table>
        </div>
    )
}
