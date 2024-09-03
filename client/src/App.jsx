import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/products', newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: '' });
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type='number'
          placeholder='Price'
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default App;
