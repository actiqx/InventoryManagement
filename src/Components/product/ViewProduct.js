import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";

const ViewProduct = (props) => {
  const [product, setproduct] = useState({});
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get("http://localhost:4000/productList/" + id)
      .then((res) => {
        setproduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const goBackToProductList = () => {
    props.history.push("/product");
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button color="primary" onClick={goBackToProductList}>
          Back
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(product).map((pkey, key) => (
            <tr key={key}>
              <td>{pkey}</td>
              <td>{product[pkey]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ViewProduct;
