import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RawMaterial, RawMaterialRequest } from '../types/entities';

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
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="stockQuantity">Stock Quantity:</label>
        <input
          id="stockQuantity"
          type="number"
          {...register('stockQuantity', {
            required: 'Stock quantity is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Stock must be zero or positive' }
          })}
        />
        {errors.stockQuantity && <p style={{ color: 'red' }}>{errors.stockQuantity.message}</p>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default RawMaterialForm;
