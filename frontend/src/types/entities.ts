// Tipos que correspondem aos DTOs de Resposta do nosso Backend

export interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
}

export interface CompositionItem {
  rawMaterialId: number;
  rawMaterialName: string;
  quantityNeeded: number;
}

export interface Product {
  id: number;
  name:string;
  price: number;
  composition: CompositionItem[];
}

// Tipos para os DTOs de Requisição
export type RawMaterialRequest = Omit<RawMaterial, 'id'>;
export type ProductRequest = Omit<Product, 'id' | 'composition'> & {
  composition: Omit<CompositionItem, 'rawMaterialName'>[];
};
