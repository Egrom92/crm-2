import React, { useEffect, useState } from "react";

import hc from "../hc";

export default function NewOrderPage(props) {
  const [productId, setProductId] = useState(0);
  const [fullname, setFullname] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    hc.get("/products", { _limit: 1000 }).then((products) =>
      setProducts(products)
    );
  }, []);

  const sendNewOrder = () => {
    const order = {
      fullname,
      productId: parseInt(productId),
      createdAt: Date.now(), // timestamp
      status: "new"
    };

    hc.post("/orders", order).then((order) => {
      console.log(order);
    });
  };

  return (
    <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-center">
        <div className="card" style={{ width: 500 }}>
          <div className="card-header">
            <h2>Новый заказ</h2>
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">ФИО:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onInput={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Заказ:</label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option key={0} value={"default"}>
                    Выберите заказ
                  </option>
                  {products.map((product, i) => (
                    <option key={i + 1} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <button className="btn btn-success" onClick={sendNewOrder}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
