// --- Types ---
export interface ProductData {
  nombre: string;
  tipo: number;
  img: string;
  precio_publico: number;
  contenido: string;
  description: string;
}

export interface ProductItem {
  data: ProductData;
  slug: string;
}