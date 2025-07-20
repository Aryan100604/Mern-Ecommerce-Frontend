import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Products.css";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...form,
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };
  return (
    <div className="admin-products-page main-content">
      <div className="admin-products-header">
        <h1 className="admin-products-title gradient-text">CoffeeZoo Products</h1>
        <p className="admin-products-subtitle">Manage all products in CoffeeZoo</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="admin-products-form glass">
        <form ref={frmRef} className="products-form-row" autoComplete="off">
          <input
            name="productName"
            value={form.productName}
            type="text"
            className="products-input"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            name="description"
            value={form.description}
            type="text"
            className="products-input"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            name="price"
            value={form.price}
            type="text"
            className="products-input"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            className="products-input"
            placeholder="Image Url"
            onChange={handleChange}
            required
          />
          {editId ? (
            <>
              <button className="products-btn products-update-btn" onClick={handleUpdate}>Update</button>
              <button className="products-btn products-cancel-btn" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="products-btn products-add-btn" onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>
      <div className="admin-products-search">
        <input type="text" className="products-input" placeholder="Search products..." onChange={(e) => setSearchVal(e.target.value)} />
        <button className="products-btn products-search-btn" onClick={fetchProducts}>Search</button>
      </div>
      <div className="admin-products-table glass">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value) => (
              <tr key={value._id}>
                <td>{value.productName}</td>
                <td>{value.description}</td>
                <td>{value.price}</td>
                <td>{value.imgUrl}</td>
                <td>
                  <button className="products-btn products-edit-btn" onClick={() => handleEdit(value)}>Edit</button>
                  <button className="products-btn products-delete-btn" onClick={() => handleDelete(value._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-products-pagination">
        <button className="products-btn products-pagination-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span className="products-pagination-info">Page {page} of {totalPages}</span>
        <button className="products-btn products-pagination-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
