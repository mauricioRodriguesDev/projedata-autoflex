import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RawMaterial, RawMaterialRequest } from '../types/entities';
import { Button, FormGroup, Input } from '../styles/components';

interface RawMaterialFormProps {
  onSubmit: SubmitHandler<RawMaterialRequest>;
  initialData?: RawMaterial;
  isLoading?: boolean;
}

const RawMaterialForm: React.FC<RawMaterialFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RawMaterialRequest>({
    defaultValues: initialData || { name: '', stockQuantity: 0 }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label htmlFor="name">Name:</label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </FormGroup>
      <FormGroup>
        <label htmlFor="stockQuantity">Stock Quantity:</label>
        <Input
          id="stockQuantity"
          type="number"
          {...register('stockQuantity', {
            required: 'Stock quantity is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Stock must be zero or positive' }
          })}
        />
        {errors.stockQuantity && <p style={{ color: 'red' }}>{errors.stockQuantity.message}</p>}
      </FormGroup>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

export default RawMaterialForm;
