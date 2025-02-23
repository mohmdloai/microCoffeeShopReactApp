import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { deleteProduct, getAllProducts } from "../api/product";
import { MoonLoader } from "react-spinners";
import { guard } from "../guard/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Products = () => {
  let [products, setProducts] = useState([]);
  let [errors, setErrors] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    guard("admin"); // allow only user with the "admin" role
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        let res = await getAllProducts();
        setProducts(res.data);
        setIsLoading(false);
      } catch (error) {
        setErrors(error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const deleteHandler = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    await deleteProduct(productId)
      .then(() => {
        setProducts(products.filter((product) => product.id != productId));
        toast.success("Product deleted successfully");
      })
      .catch((error) => toast.error(`${error.message}`));
  };
  return (
    <div className="container mt-3">
      <h1 className="text-center text-muted">this is products tab</h1>
      <div className="d-flex justify-content-between">
        <Link className="btn btn-outline-primary" to=":id/edit">
          Add product
        </Link>
        <input
          type="text"
          className="w-25 form-controller rounded"
          placeholder="search here ....."
        />
      </div>
      {isLoading && !errors && (
        <MoonLoader
          color="#00db00"
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading
          size={130}
          speedMultiplier={2}
        />
      )}
      {errors && <div className="alert alert-danger">{errors.message}</div>}

      {!isLoading && !errors && (
        <Table className="mt-5" striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Product price</th>
              <th>Product quantity</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>

                <td className="d-flex justify-content-center">
                  <Link to={`${product.id}/edit`}>
                    <FaEdit className="text-info mx-2 fs-3" />
                  </Link>
                  <Link to={`${product.id}`}>
                    <IoEye className="text-success mx-2 fs-3" />
                  </Link>
                  <Link>
                    <MdDelete
                      className="text-danger  mx-2 fs-3"
                      onClick={() => deleteHandler(product.id)}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Products;
