'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { CheckCircle, Package, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
    };
  }[];
  user: {
    email: string;
  };
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/checkout?id=${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data || null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center py-12 px-4">
        <Package className="size-16 text-zinc-300 mb-4" />
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Order not found
        </h1>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-zinc-100 p-8">
          <div className="text-center mb-8">
            <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-zinc-900">
              Order Placed Successfully!
            </h1>
            <p className="text-zinc-500 mt-2">Thank you for your purchase</p>
          </div>

          <div className="border-t border-b border-zinc-100 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-zinc-500">Order ID</span>
              <span className="font-medium text-zinc-900">
                {order.id.slice(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-zinc-500">Status</span>
              <span className="font-medium text-green-600 capitalize">
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Total</span>
              <span className="font-medium text-zinc-900">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-zinc-900 mb-3">Order Items</h2>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span className="text-zinc-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="text-zinc-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="size-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-zinc-400" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
