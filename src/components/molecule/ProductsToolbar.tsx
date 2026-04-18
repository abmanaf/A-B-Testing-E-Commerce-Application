'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductsToolbarProps {
  total: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterToggle: () => void;
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
  { value: 'newest', label: 'Newest First' },
];

const ProductsToolbar = ({
  total,
  sortBy,
  onSortChange,
  onFilterToggle,
}: ProductsToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 pb-6 border-b border-zinc-100">
      <p className="text-sm text-zinc-500">
        <span className="font-semibold text-zinc-900">{total}</span> products
        found
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="flex lg:hidden gap-2"
        >
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent align="end">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductsToolbar;
