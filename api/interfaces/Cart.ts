import { StoredProduct } from './StoredProduct'

export interface Cart {
  cartId: any
  timestamp: string
  products: StoredProduct[]
}
