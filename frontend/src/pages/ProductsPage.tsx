import React, { useEffect, useState } from 'react';
import { Product } from '../types/entities';
import { getProducts } from '../services/productService';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Products</h2>
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
                {product.composition.map(c =>
                  `${c.quantityNeeded}x ${c.rawMaterialName}`
                ).join(', ')}
              </td>
              <td>
                {/* Botões de Ação (Edit, Delete) virão aqui */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Formulário de Adicionar/Editar virá aqui */}
    </div>
  );
};

export default ProductsPage;
