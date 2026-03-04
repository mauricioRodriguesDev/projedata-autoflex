import React from 'react';
import { useApi } from '../hooks/useApi';
import { getProductionSuggestion } from '../services/productService';
import { Container, Table } from '../styles/components';

const ProductionSuggestionPage: React.FC = () => {
  const { data: suggestion, loading, error } = useApi(getProductionSuggestion);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  if (!suggestion || suggestion.suggestedProducts.length === 0) {
    return (
      <Container>
        <h2>Production Suggestion</h2>
        <p>No products can be produced with the current stock.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Production Suggestion</h2>
      <p>
        Based on the current stock of raw materials, you can produce the following items,
        prioritized by the highest value.
      </p>
      <h3>Total Obtainable Value: ${suggestion.totalObtainableValue.toFixed(2)}</h3>

      <Table>
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
              <td data-label="Product">{item.productName}</td>
              <td data-label="Quantity">{item.quantityProducible}</td>
              <td data-label="Unit Price">${item.unitPrice.toFixed(2)}</td>
              <td data-label="Total Value">${item.totalValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductionSuggestionPage;
