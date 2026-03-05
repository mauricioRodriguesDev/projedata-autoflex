import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import { Product, ProductRequest, RawMaterial } from '../types/entities';
import { getRawMaterials } from '../services/rawMaterialService';
import { Button, FormGroup, Input, Select } from '../styles/components';

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
    getRawMaterials().then(setAvailableMaterials);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FormValues>)}>
      <FormGroup>
        <label>Name:</label>
        <Input {...register('name', { required: 'Name is required' })} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </FormGroup>
      <FormGroup>
        <label>Price:</label>
        <Input type="number" step="0.01" {...register('price', { required: 'Price is required', valueAsNumber: true, min: { value: 0.01, message: 'Price must be positive' } })} />
        {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}
      </FormGroup>

      <h3>Composition</h3>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Controller
              name={`composition.${index}.rawMaterialId`}
              control={control}
              rules={{ required: 'Material is required', min: { value: 1, message: 'Please select a material' } }}
              render={({ field }) => (
                <Select {...field} >
                  <option value={0}>Select Material</option>
                  {availableMaterials.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </Select>
              )}
            />
            <Input
              type="number"
              style={{ marginLeft: '0.5rem', width: '100px' }}
              {...register(`composition.${index}.quantityNeeded`, { required: 'Qty is required', valueAsNumber: true, min: { value: 1, message: 'Must be > 0' } })}
              placeholder="Quantity"
            />
            <Button type="button" onClick={() => remove(index)} style={{ marginLeft: '0.5rem' }}>Remove</Button>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={() => append({ rawMaterialId: 0, quantityNeeded: 1 })}>
        Add Composition Item
      </Button>

      <hr style={{ margin: '1.5rem 0' }} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Product'}
      </Button>
    </form>
  );
};

export default ProductForm;
