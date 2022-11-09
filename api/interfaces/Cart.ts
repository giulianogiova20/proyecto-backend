import { StoredProduct } from './StoredProduct'

export interface Cart {
  _id: any
  user_id: string,
  user_email: string
  timestamp: string
  products: StoredProduct[]
}
