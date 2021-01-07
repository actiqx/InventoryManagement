import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { APIConstants } from "../common/Contants";

const ViewProduct = (props) => {
  const [product, setproduct] = useState({});
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(APIConstants.urlroot + APIConstants.products + "/" + id)
      .then((res) => {
        setproduct(res.data.product);
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
