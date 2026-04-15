export interface Category {
  id: string
  name: string
  description: string | null
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string
  categoryId: string
  category: Category
  createdAt: string
  updatedAt: string
}