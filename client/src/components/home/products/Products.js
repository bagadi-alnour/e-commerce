import React, { useState, useEffect } from "react";
import axios from "axios";
export const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(async () => {
    try {
      const res = await axios.get("/api/product/");
      setProduct(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const products = product.map((p) => (
    <div className="col-lg-3 col-md-3 col-sm-12 " key={p._id}>
      <img className="card-img-top" src={p.imageUrl} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">
          {p.name} - {p.weight}
        </h5>
        <p className="card-text">{p.description}</p>
        <p className="card-text">{p.category}</p>
        <hr />
        <p className="text-danger h5">
          {p.price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
          }
        </p>
      </div>
    </div>
  ));
  return (
    <div className="container my-4">
      <div className="row">{products} </div>
    </div>
  );
};
