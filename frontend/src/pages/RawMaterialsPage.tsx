import React, { useState } from 'react';
import { RawMaterial, RawMaterialRequest } from '../types/entities';
import { getRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial } from '../services/rawMaterialService';
import RawMaterialForm from '../components/RawMaterialForm';
import { SubmitHandler } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import { Container, Button, Table, FormWrapper } from '../styles/components';

const RawMaterialsPage: React.FC = () => {
  const { data: rawMaterials, loading, error, fetchData } = useApi(getRawMaterials);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<RawMaterialRequest> = async (data) => {
    setFormLoading(true);
    setActionError(null);
    try {
      if (editingMaterial) {
        await updateRawMaterial(editingMaterial.id, data);
      } else {
        await createRawMaterial(data);
      }
      closeForm();
      fetchData();
    } catch (err) {
      setActionError(`Failed to ${editingMaterial ? 'update' : 'create'} raw material.`);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this raw material?')) {
      setActionError(null);
      try {
        await deleteRawMaterial(id);
        fetchData();
      } catch (err) {
        setActionError('Failed to delete raw material.');
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

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <h2>Raw Materials</h2>
      {actionError && <p style={{ color: 'red' }}>{actionError}</p>}

      {!isFormVisible && (
        <Button onClick={() => { setIsFormVisible(true); setEditingMaterial(null); }}>Add New Raw Material</Button>
      )}

      {isFormVisible && (
        <FormWrapper>
          <h3>{editingMaterial ? 'Edit Raw Material' : 'Add New Raw Material'}</h3>
          <RawMaterialForm
            onSubmit={handleFormSubmit}
            initialData={editingMaterial || undefined}
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
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rawMaterials?.map((material) => (
            <tr key={material.id}>
              <td data-label="ID">{material.id}</td>
              <td data-label="Name">{material.name}</td>
              <td data-label="Stock">{material.stockQuantity}</td>
              <td data-label="Actions">
                <Button onClick={() => handleEditClick(material)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(material.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RawMaterialsPage;
