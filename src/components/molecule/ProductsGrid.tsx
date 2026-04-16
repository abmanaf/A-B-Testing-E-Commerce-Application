'use client';

import ProductCard from '@/components/atom/ProductCard';
import { Product } from '@/types';
import { PackageSearch } from 'lucide-react';
import { useCart } from '@/components/context/CartContext';

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  btnLabel?: string;
}

const ProductCardSkeleton = () => (
  <div className="rounded-2xl border border-zinc-100 bg-white overflow-hidden animate-pulse">
    <div className="h-52 bg-zinc-100" />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-3 w-16 bg-zinc-100 rounded" />
      <div className="h-4 bg-zinc-100 rounded" />
      <div className="h-4 w-3/4 bg-zinc-100 rounded" />
      <div className="h-3 w-24 bg-zinc-100 rounded" />
      <div className="h-8 bg-zinc-100 rounded-lg mt-2" />
    </div>
  </div>
);

const ProductsGrid = ({ products, loading, btnLabel }: ProductsGridProps) => {
  const { addItem } = useCart();

  const handleAddToCart = async (product: Product) => {
    await addItem(product.id, 1);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch className="size-12 text-zinc-300 mb-4" />
        <p className="text-zinc-500 font-medium">No products found</p>
        <p className="text-zinc-400 text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={`₵${product.price}`}
          image={product.imageUrl}
          onAddToCart={() => handleAddToCart(product)}
          btnLabel={btnLabel}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
