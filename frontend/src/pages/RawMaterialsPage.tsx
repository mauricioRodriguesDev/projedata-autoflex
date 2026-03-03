import React, { useEffect, useState } from 'react';
import { RawMaterial } from '../types/entities';
import { getRawMaterials } from '../services/rawMaterialService';

const RawMaterialsPage: React.FC = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        setLoading(true);
        const data = await getRawMaterials();
        setRawMaterials(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch raw materials.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRawMaterials();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Raw Materials</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rawMaterials.map((material) => (
            <tr key={material.id}>
              <td>{material.id}</td>
              <td>{material.name}</td>
              <td>{material.stockQuantity}</td>
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

export default RawMaterialsPage;
