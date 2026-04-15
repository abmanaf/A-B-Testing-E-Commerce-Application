'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductFilters from '@/components/molecule/ProductFilters';
import ProductsToolbar from '@/components/molecule/ProductsToolbar';
import ProductsGrid from '@/components/molecule/ProductsGrid';
import { Product, Category } from '@/types';
import { useCart } from '@/components/context/CartContext';

const PRODUCT_EXPERIMENT_ID = process.env.NEXT_PUBLIC_PRODUCT_EXPERIMENT_ID;

function trackEvent(
  eventType: string,
  variantId: string,
  userId: string,
  metadata?: object
) {
  fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      variantId,
      experimentId: PRODUCT_EXPERIMENT_ID,
      eventType,
      metadata: {
        page: 'products',
        timestamp: new Date().toISOString(),
        ...metadata,
      },
    }),
  }).catch(console.error);
}

export default function ProductsPage() {
  const { user, isLoaded } = useUser();

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [variantId, setVariantId] = useState<string>('');
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);

  // Filters & sorting

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const [cartToast, setCartToast] = useState<string | null>(null);

  const { addItem, itemCount } = useCart();

  const getUserId = () =>
    user?.id || localStorage.getItem('anonymous_user_id') || 'anonymous';

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoaded || !PRODUCT_EXPERIMENT_ID) return;

    const userId = getUserId();

    fetch('/api/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, experimentId: PRODUCT_EXPERIMENT_ID }),
    })
      .then((r) => r.json())
      .then((data) => {
        const v = data.variant?.name as 'A' | 'B';
        setVariant(v);
        setVariantId(data.variantId);
        trackEvent('page_view', data.variantId, userId);
      })
      .catch(() => setVariant('A'));
  }, [isLoaded, user]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory)
      result = result.filter((p) => p.categoryId === selectedCategory);

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, sortBy]);

  const ctaLabel = useMemo(() => {
    if (!variant) return 'Add to Cart';
    return variant === 'A' ? 'Add to Cart' : 'Buy Now';
  }, [variant]);

  console.log(products);

  const handleAddToCart = async (product: Product) => {
    await addItem(product.id, 1);
    setCartToast(product.name);
    setTimeout(() => setCartToast(null), 2500);

    if (variantId) {
      trackEvent('add_to_cart', variantId, getUserId(), {
        productId: product.id,
        productName: product.name,
        price: product.price,
      });
    }
  };

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange([0, 9999]);
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-1">
            Our collection
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                All Products
              </h1>
              <p className="mt-2 text-sm text-zinc-500 max-w-md">
                Browse our full collection of curated products across all
                categories.
              </p>
            </div>

            {itemCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                <ShoppingCart className="size-4 text-zinc-700" />
                <span className="text-sm font-medium text-zinc-700">
                  {itemCount} items
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 rounded-2xl border border-zinc-100 bg-white p-5">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                onCategoryChange={setSelectedCategory}
                onPriceChange={setPriceRange}
                onReset={handleReset}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <ProductsToolbar
              total={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onFilterToggle={() => setShowFilters(!showFilters)}
            />

            {showFilters && (
              <div className="lg:hidden mt-4 mb-6 rounded-2xl border border-zinc-100 bg-white p-5">
                <ProductFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  priceRange={priceRange}
                  onCategoryChange={(id) => {
                    setSelectedCategory(id);
                    setShowFilters(false);
                  }}
                  onPriceChange={(range) => {
                    setPriceRange(range);
                    setShowFilters(false);
                  }}
                  onReset={() => {
                    handleReset();
                    setShowFilters(false);
                  }}
                />
              </div>
            )}

            {(selectedCategory || priceRange[1] !== 9999) && (
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {selectedCategory && (
                  <Badge
                    variant="secondary"
                    className="gap-1.5 pl-3 pr-2 py-1 cursor-pointer hover:bg-zinc-200"
                    onClick={() => setSelectedCategory('')}
                  >
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="size-3" />
                  </Badge>
                )}
                {priceRange[1] !== 9999 && (
                  <Badge
                    variant="secondary"
                    className="gap-1.5 pl-3 pr-2 py-1 cursor-pointer hover:bg-zinc-200"
                    onClick={() => setPriceRange([0, 9999])}
                  >
                    ${priceRange[0]} – $
                    {priceRange[1] === 9999 ? '∞' : priceRange[1]}
                    <X className="size-3" />
                  </Badge>
                )}
              </div>
            )}
            <div className="mt-6">
              <ProductsGrid
                products={filteredProducts}
                loading={loading}
                btnLabel={ctaLabel}
              />
            </div>
          </div>
        </div>
      </div>

      {cartToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex size-6 items-center justify-center rounded-full bg-green-100">
            <ShoppingCart className="size-3.5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-zinc-700 max-w-xs truncate">
            <span className="text-green-600">Added!</span> {cartToast}
          </p>
        </div>
      )}
    </div>
  );
}
