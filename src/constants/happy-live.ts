import storeIcon from '../assets/svg/building-store.svg'

interface Link {
  href: string;
  urlIcon: any;
  title: string;
}

export const shopLink: Link = {
  href: 'https://s.happylive.mx:1035/h/iCommerce/templates/Happylive/CarritoCompras/index.jsp?ID=2270',
  urlIcon: storeIcon,
  title: "Tienda en línea de Happy Live"
}

export type HappyLiveProducts = 'Happy Drop' | 'Happy Ending' | 'Happy Face Day' | 'Happy Face Night' | 'Happy Focus' | 'Happy Gummies' | 'Happy Honey' | 'Happy Kids' | 'Happy Oil 250ml' | 'Happy Oil 60ml' | 'Happy Pet' | 'Happy Sleep'
export type HappyLiveProductsId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

// El orden de los productos se aplica de forma ascendente 
export const HAPPY_PRODUCT_TO_ID: Record<HappyLiveProducts, HappyLiveProductsId> = {
  'Happy Drop': 1,
  'Happy Ending': 2,
  'Happy Face Day': 3,
  'Happy Face Night': 4,
  'Happy Focus': 5,
  'Happy Gummies': 6,
  'Happy Honey': 7,
  'Happy Kids': 8,
  'Happy Oil 250ml': 9,
  'Happy Oil 60ml': 10,
  'Happy Pet': 11,
  'Happy Sleep': 12
}

// El orden de los productos se aplica de forma ascendente 
export const HAPPY_ID_TO_PRODUCT: Record<HappyLiveProductsId, HappyLiveProducts> = {
  1: 'Happy Drop',
  2: 'Happy Ending',
  3: 'Happy Face Day',
  4: 'Happy Face Night',
  5: 'Happy Focus',
  6: 'Happy Gummies',
  7: 'Happy Honey',
  8: 'Happy Kids',
  9: 'Happy Oil 250ml',
  10: 'Happy Oil 60ml',
  11: 'Happy Pet',
  12: 'Happy Sleep'
}

interface Product {
  id: HappyLiveProductsId
  name: HappyLiveProducts
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Happy Drop' },
  { id: 2, name: 'Happy Ending' },
  { id: 3, name: 'Happy Face Day' },
  { id: 4, name: 'Happy Face Night' },
  { id: 5, name: 'Happy Focus' },
  { id: 6, name: 'Happy Gummies' },
  { id: 7, name: 'Happy Honey' },
  { id: 8, name: 'Happy Kids' },
  { id: 9, name: 'Happy Oil 250ml' },
  { id: 10, name: 'Happy Oil 60ml' },
  { id: 11, name: 'Happy Pet' },
  { id: 12, name: 'Happy Sleep' }
]

export interface dropType {
  portion: number,
  product: HappyLiveProductsId
}

export interface productType {
  portion: number,
  type: HappyLiveProductsId
}

// Interfaces para el registro de productos
export interface ProductLogEntry {
  id: string
  productId: HappyLiveProductsId
  productName: HappyLiveProducts
  portion: number
  timestamp: number
  date: string
  time: string
  notes?: string
}

export interface ProductLogFilters {
  productId?: HappyLiveProductsId
  dateFrom?: string
  dateTo?: string
  searchTerm?: string
}