import React, { useEffect, useState } from 'react';
import { RawMaterial, RawMaterialRequest } from '../types/entities';
import { getRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial } from '../services/rawMaterialService';
import RawMaterialForm from '../components/RawMaterialForm';
import { SubmitHandler } from 'react-hook-form';

const RawMaterialsPage: React.FC = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRawMaterials();
  }, []);

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

  const handleFormSubmit: SubmitHandler<RawMaterialRequest> = async (data) => {
    setFormLoading(true);
    try {
      if (editingMaterial) {
        const updated = await updateRawMaterial(editingMaterial.id, data);
        setRawMaterials(prev => prev.map(m => m.id === updated.id ? updated : m));
      } else {
        const created = await createRawMaterial(data);
        setRawMaterials(prev => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(`Failed to ${editingMaterial ? 'update' : 'create'} raw material.`);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this raw material?')) {
      try {
        await deleteRawMaterial(id);
        setRawMaterials(prev => prev.filter(m => m.id !== id));
      } catch (err) {
        setError('Failed to delete raw material.');
        console.error(err);
      }
    }
  };

  const handleEditClick = (material: RawMaterial) => {
    setEditingMaterial(material);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingMaterial(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Raw Materials</h2>
      {!isFormVisible && (
        <button onClick={() => { setIsFormVisible(true); setEditingMaterial(null); }}>Add New Raw Material</button>
      )}

      {isFormVisible && (
        <div>
          <h3>{editingMaterial ? 'Edit Raw Material' : 'Add New Raw Material'}</h3>
          <RawMaterialForm
            onSubmit={handleFormSubmit}
            initialData={editingMaterial || undefined}
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
                <button onClick={() => handleEditClick(material)}>Edit</button>
                <button onClick={() => handleDeleteClick(material.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterialsPage;
