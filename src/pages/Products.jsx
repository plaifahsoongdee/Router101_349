// ปรับ Products.js: ใช้ useSelector เพื่อดึงข้อมูลจาก Redux store และ useDispatch เพื่อส่ง action

import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { addProduct, removeProduct } from '../features/productSlice'; 

function Products() { 
  const dispatch = useDispatch(); 
  const productList = useSelector((state) => state.products); 
  
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => { 
    if (newProduct.id && newProduct.name && newProduct.price) {
      dispatch(addProduct(newProduct)); 
      setNewProduct({ id: '', name: '', price: '', description: '' }); // clear form
    }
  }; 

  const handleRemoveProduct = (id) => { 
    dispatch(removeProduct(id)); 
  }; 

  return ( 
    <div> 
      <h2>Product List</h2> 
      <ul> 
        {productList.map(product => ( 
          <li key={product.id}> 
            <Link to={`/product/${product.id}`}> 
              {product.name} - {product.price} 
            </Link> 
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button> 
          </li> 
        ))} 
      </ul> 

      <h3>Add a new product</h3>
      <input
        type="text"
        name="id"
        value={newProduct.id}
        onChange={handleInputChange}
        placeholder="Product ID"
      />
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleInputChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
        placeholder="Product Price"
      />
      <input
        type="text"
        name="description"
        value={newProduct.description}
        onChange={handleInputChange}
        placeholder="Product Description"
      />
      <button onClick={handleAddProduct}>Add Product</button> 
    </div> 
  ); 
} 

export default Products;