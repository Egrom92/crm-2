import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hc from "../hc";
import { modes } from '../data';

export default function OrderPage(props) {
  const params = useParams();
  const orderId = parseInt(params.orderId);

  const [id, setId] = useState(0);
  const [fullName, setFullname] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [statusId, setStatusId] = useState(0);
  const [createAt, setCreateAt] = useState(0);
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState([]);

  /* ... */

  useEffect(() => {
    hc.get("/products", { _limit: 1000 }).then((products) =>
        setProducts(products)
    );
  }, []);

  useEffect(() => {
    hc.get(`/orders/${orderId}`).then((order) => {
      console.log(orderId, order);
      setId(order.id);
      setFullname(order.fullname);
      setStatuses(modes);
      setProductId(order.productId);
      // const data = new Date(order.createdAt)
      // setCreateAt(order.createdAt)
      // setCreateAt(`${data.getFullYear()}-${data.getMonth()}-${data.getDay()}`)
      /* ... */
    });
  }, [orderId]);

  const saveChanges = () => {
    hc.patch(`/orders/${id}`, {
      fullname: fullName
    })
  }
  


  return (
    <main
      role="main"
      className="ml-sm-auto col-lg-12 px-4 d-flex flex-column p-2"
    >
      <div className="card">
        <div className="card-header">
          <h2>{fullName}</h2>
        </div>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">ID:</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control-plaintext"
                readOnly
                value={id}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">ФИО:</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Заказ:</label>
            <div className="col-sm-10">
              <select
                  className="form-control"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
              >
                {products.map((product, i) => (
                    <option key={i + 1} value={product.id}>
                      {product.name}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Дата:</label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                value={createAt}
                onChange={e => console.log(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Статус:</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                value={statusId}
                onChange={(e) => setStatusId(e.target.value)}>
                {statuses.map((status, i) => (
                    <option key={i + 1} value={status.id}>
                      {status.name}
                    </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button className="btn btn-outline-danger mr-2">Удалить заказ</button>
          <button className="btn btn-success" onClick={saveChanges}>Сохранить</button>
        </div>
      </div>
    </main>
  );
}
