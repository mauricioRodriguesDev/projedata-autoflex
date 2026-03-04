import React, { useState } from 'react';
import { Product, ProductRequest } from '../types/entities';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';
import { SubmitHandler } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import { Container, Button, Table, FormWrapper } from '../styles/components';

const ProductsPage: React.FC = () => {
  const { data: products, loading, error, fetchData } = useApi(getProducts);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<ProductRequest> = async (data) => {
    setFormLoading(true);
    setActionError(null);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
      } else {
        await createProduct(data);
      }
      closeForm();
      fetchData();
    } catch (err) {
      setActionError(`Failed to ${editingProduct ? 'update' : 'create'} product.`);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setActionError(null);
      try {
        await deleteProduct(id);
        fetchData();
      } catch (err) {
        setActionError('Failed to delete product.');
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

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <h2>Products</h2>
      {actionError && <p style={{ color: 'red' }}>{actionError}</p>}

      {!isFormVisible && (
        <Button onClick={() => { setIsFormVisible(true); setEditingProduct(null); }}>Add New Product</Button>
      )}

      {isFormVisible && (
        <FormWrapper>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <ProductForm
            onSubmit={handleFormSubmit}
            initialData={editingProduct || undefined}
            isLoading={formLoading}
          />
          <Button onClick={closeForm}>Cancel</Button>
        </FormWrapper>
      )}

      <Table>
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
          {products?.map((product) => (
            <tr key={product.id}>
              <td data-label="ID">{product.id}</td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Price">{product.price.toFixed(2)}</td>
              <td data-label="Composition">
                {product.composition.map(c => `${c.quantityNeeded}x ${c.rawMaterialName}`).join(', ')}
              </td>
              <td data-label="Actions">
                <Button onClick={() => handleEditClick(product)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductsPage;
