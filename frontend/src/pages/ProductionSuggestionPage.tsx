import React, { useEffect, useState } from 'react';
import { ProductionSuggestion } from '../types/entities';
import { getProductionSuggestion } from '../services/productService';

const ProductionSuggestionPage: React.FC = () => {
  const [suggestion, setSuggestion] = useState<ProductionSuggestion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        setLoading(true);
        const data = await getProductionSuggestion();
        setSuggestion(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch production suggestion.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!suggestion) return <div>No suggestion available.</div>;

  return (
    <div>
      <h2>Production Suggestion</h2>
      <p>
        Based on the current stock of raw materials, you can produce the following items,
        prioritized by the highest value.
      </p>
      <h3>Total Obtainable Value: ${suggestion.totalObtainableValue.toFixed(2)}</h3>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity Producible</th>
            <th>Unit Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {suggestion.suggestedProducts.map((item) => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td>{item.quantityProducible}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>${item.totalValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionSuggestionPage;
