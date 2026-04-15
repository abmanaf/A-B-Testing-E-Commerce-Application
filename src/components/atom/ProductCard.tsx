import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  emoji?: string;
  image?: string;
  onAddToCart?: () => void;
  btnLabel?: string;
  showButton?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  badge,
  emoji = '📦',
  image,
  onAddToCart,
  showButton = true,
  btnLabel = 'Add to Cart',
}: ProductCardProps) => {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-zinc-100 bg-white overflow-hidden transition-all hover:border-zinc-200 hover:shadow-md">
      {badge && (
        <Badge className="absolute left-3 top-3 z-10 bg-amber-500 text-white hover:bg-amber-500">
          {badge}
        </Badge>
      )}

      <div className="flex h-44 items-center justify-center bg-zinc-50 transition-transform group-hover:scale-105">
        {image ? (
          <img src={image} alt={name} className="size-24 object-contain" />
        ) : (
          <span className="text-4xl">{emoji}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        {rating && (
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${
                    i < rating
                      ? 'fill-amber-500 text-amber-500'
                      : 'fill-zinc-200 text-zinc-200'
                  }`}
                />
              ))}
            </div>
            {reviews && (
              <span className="text-xs text-zinc-500">
                ({reviews.toLocaleString()})
              </span>
            )}
          </div>
        )}

        <p className="text-sm font-semibold text-zinc-800 leading-snug line-clamp-2">
          {name}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-zinc-900">{price}</span>
          {originalPrice && (
            <span className="text-sm text-zinc-400 line-through">
              {originalPrice}
            </span>
          )}
        </div>
        {showButton && (
          <Button
            size="sm"
            onClick={onAddToCart}
            className="w-full gap-2 bg-zinc-900 text-white hover:bg-zinc-700 mt-2"
          >
            <ShoppingCart className="size-3.5" />
            {btnLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
