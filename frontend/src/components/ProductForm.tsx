import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import { Product, ProductRequest, RawMaterial } from '../types/entities';
import { getRawMaterials } from '../services/rawMaterialService';

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductRequest>;
  initialData?: Product;
  isLoading?: boolean;
}

type FormValues = {
  name: string;
  price: number;
  composition: {
    rawMaterialId: number;
    quantityNeeded: number;
  }[];
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const [availableMaterials, setAvailableMaterials] = useState<RawMaterial[]>([]);

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: initialData?.name || '',
      price: initialData?.price || 0,
      composition: initialData?.composition.map(c => ({
        rawMaterialId: c.rawMaterialId,
        quantityNeeded: c.quantityNeeded
      })) || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'composition'
  });

  useEffect(() => {
    // Fetch all raw materials to populate the dropdown
    getRawMaterials().then(setAvailableMaterials);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FormValues>)}>
      {/* Name and Price Fields */}
      <div>
        <label>Name:</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      <div>
        <label>Price:</label>
        <input type="number" step="0.01" {...register('price', { required: 'Price is required', valueAsNumber: true, min: { value: 0.01, message: 'Price must be positive' } })} />
        {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}
      </div>

      {/* Composition Fields */}
      <h3>Composition</h3>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Controller
              name={`composition.${index}.rawMaterialId`}
              control={control}
              rules={{ required: 'Material is required' }}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select Material</option>
                  {availableMaterials.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              )}
            />
            <input
              type="number"
              {...register(`composition.${index}.quantityNeeded`, { required: 'Qty is required', valueAsNumber: true, min: { value: 1, message: 'Must be > 0' } })}
              placeholder="Quantity"
            />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append({ rawMaterialId: 0, quantityNeeded: 1 })}>
        Add Composition Item
      </button>

      <hr />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
};

export default ProductForm;
