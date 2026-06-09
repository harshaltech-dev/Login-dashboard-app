import React, { useState } from "react";
import "./Product.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] =
  useState(1);

const itemsPerPage = 3;

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    if (!productName || !weight || !price) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setProducts(
        products.map((product) =>
          product.id === editId
            ? {
                ...product,
                productName,
                weight,
                price,
              }
            : product
        )
      );

      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        productName,
        weight,
        price,
      };

      setProducts([...products, newProduct]);
    }

    setProductName("");
    setWeight("");
    setPrice("");
  };

  const handleEdit = (product) => {
    setProductName(product.productName);
    setWeight(product.weight);
    setPrice(product.price);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(
      products.filter(
        (product) => product.id !== id
      )
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.weight
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.price
        .toString()
        .includes(search)
  );
  const lastIndex =
  currentPage * itemsPerPage;

const firstIndex =
  lastIndex - itemsPerPage;

const currentProducts =
  filteredProducts.slice(
    firstIndex,
    lastIndex
  );

const totalPages = Math.ceil(
  filteredProducts.length / itemsPerPage
);

  return (
    <div className="employee-container">
      <div className="employee-card">

        <h1 className="employee-title">
          Product Dashboard
        </h1>

        <div className="form-container">

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          {editId
            ? "Update Product"
            : "Add Product"}
        </button>

        <br /><br />

        <input
          type="text"
          placeholder="Search Product..."
          className="search-input"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <hr />

        <table className="employee-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4">
                  No Product Found
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.productName}</td>
                  <td>{product.weight}</td>
                  <td>₹{product.price}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
            <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
  >
    Prev
  </button>

  <span>
    Page {currentPage}
  </span>

  <button
    disabled={
      currentPage === totalPages ||
      totalPages === 0
    }
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    Next
  </button>

</div>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Products;