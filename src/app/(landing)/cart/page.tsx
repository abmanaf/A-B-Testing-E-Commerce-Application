'use client';

import { useCart } from '@/components/context/CartContext';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Loading from '@/components/shared/Loading';

export default function CartPage() {
  const {
    items,
    total,
    itemCount,
    isLoading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isUserLoaded) return;

    if (!user) {
      router.push('/sign-in?redirect_url=/cart');
      return;
    }

    if (items.length === 0) return;

    router.push('/checkout');
  };

  if (isLoading || !isUserLoaded) {
    return <Loading />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center py-12 px-4">
        <ShoppingCart className="size-16 text-zinc-300 mb-4" />
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-zinc-500 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/products">
          <Button className="bg-zinc-900 text-white hover:bg-zinc-700">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-900 mb-8">
          Shopping Cart ({itemCount} items)
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-4 border-b border-zinc-100"
              >
                <div className="w-24 h-24 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="size-20 object-contain rounded-lg"
                    />
                  ) : (
                    <ShoppingCart className="size-8 text-zinc-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-zinc-900">
                    {item.product.name}
                  </h3>
                  <p className="text-zinc-500 mt-1">
                    ₵{item.product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-zinc-900">
                    ₵{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
              <h2 className="font-semibold text-zinc-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-zinc-900">₵{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="text-zinc-900">Calculated at checkout</span>
                </div>
                <div className="border-t border-zinc-100 pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>₵{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full mt-6 bg-zinc-900 text-white hover:bg-zinc-700 disabled:bg-zinc-400"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
