'use client';

import Image from 'next/image';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Deterministic rating from product id
function getRating(id: string) {
  const num = id.charCodeAt(0) + id.charCodeAt(1);
  return 3.5 + (num % 15) / 10;
}

function getReviews(id: string) {
  const num = id.charCodeAt(2) + id.charCodeAt(3);
  return 100 + ((num * 37) % 3000);
}

function isNew(createdAt: string) {
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < 7 * 24 * 60 * 60 * 1000 * 30;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const rating = getRating(product.id);
  const reviews = getReviews(product.id);
  const badge = isNew(product.createdAt) ? 'New' : null;
  const originalPrice = (product.price * 1.25).toFixed(2);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-zinc-100 bg-white overflow-hidden transition-all duration-200 hover:border-zinc-200 hover:shadow-lg">
      <button
        onClick={() => setWished(!wished)}
        className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white shadow-sm border border-zinc-100 transition-colors hover:border-zinc-300"
      >
        <Heart
          className={`size-4 transition-colors ${wished ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`}
        />
      </button>

      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-amber-500 text-white text-xs hover:bg-amber-500">
            {badge}
          </Badge>
        </div>
      )}

      <div className="relative h-52 bg-zinc-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-col gap-2.5 p-4 flex-1">
        <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">
          {product.category.name}
        </span>

        <p className="text-sm font-semibold text-zinc-800 leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </p>

        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${
                  i < Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-zinc-200 text-zinc-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-400">
            {rating.toFixed(1)} ({reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-bold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-zinc-400 line-through">
            ${originalPrice}
          </span>
          <span className="ml-auto text-xs font-medium text-green-600">
            20% off
          </span>
        </div>

        <Button
          size="sm"
          onClick={handleAddToCart}
          className={`w-full gap-2 mt-1 transition-all ${
            added
              ? 'bg-green-600 hover:bg-green-600'
              : 'bg-zinc-900 hover:bg-zinc-700'
          }`}
        >
          <ShoppingCart className="size-3.5" />
          {added ? 'Added!' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
