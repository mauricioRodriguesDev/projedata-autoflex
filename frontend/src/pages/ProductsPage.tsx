import React, { useEffect, useState } from 'react';
import { Product, ProductRequest } from '../types/entities';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';
import { SubmitHandler } from 'react-hook-form';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit: SubmitHandler<ProductRequest> = async (data) => {
    setFormLoading(true);
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, data);
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await createProduct(data);
        setProducts(prev => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(`Failed to ${editingProduct ? 'update' : 'create'} product.`);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete product.');
        console.error(err);
      }
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Products</h2>
      {!isFormVisible && (
        <button onClick={() => { setIsFormVisible(true); setEditingProduct(null); }}>Add New Product</button>
      )}

      {isFormVisible && (
        <div>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <ProductForm
            onSubmit={handleFormSubmit}
            initialData={editingProduct || undefined}
            isLoading={formLoading}
          />
          <button onClick={closeForm}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Composition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>
                {product.composition.map(c => `${c.quantityNeeded}x ${c.rawMaterialName}`).join(', ')}
              </td>
              <td>
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
