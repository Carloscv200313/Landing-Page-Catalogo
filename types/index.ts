export interface Category {
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  categories: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  nombre: string;
  telefono?: string;
  direccion?: string;
  notas?: string;
}

export interface OrderPayload {
  cliente: CustomerInfo;
  items: {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    subtotal: number;
  }[];
  total: number;
  moneda: string;
  timestamp: string;
}
