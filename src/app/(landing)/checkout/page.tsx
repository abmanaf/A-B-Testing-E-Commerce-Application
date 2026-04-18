'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/context/CartContext';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, isLoading: isCartLoading, clearCart } = useCart();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    if (!isCartLoading && items.length === 0 && !orderPlaced) {
      router.push('/products');
    }
  }, [items.length, isCartLoading, router, orderPlaced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmittingRef.current) {
      console.log('Already submitting...');
      return;
    }

    if (!isUserLoaded || !user) {
      router.push('/sign-in');
      return;
    }

    if (items.length === 0) {
      router.push('/products');
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const payload = {
        shipping: formData,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setOrderPlaced(true);
        await clearCart();
        router.push(`/order-confirmation?orderId=${data.id}`);
      } else {
        console.error('Checkout failed:', data);
        alert(data.error || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  if (isCartLoading || !isUserLoaded) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  const shippingCost = total > 500 ? 0 : 20;
  const grandTotal = total + shippingCost;

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/cart"
          className="flex items-center text-zinc-500 mb-6 hover:text-zinc-900"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-2xl font-bold text-zinc-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center">
                  <MapPin className="size-5 mr-2" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      <Phone className="size-4 inline mr-1" />
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      <MapPin className="size-4 inline mr-1" />
                      Street Address
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, Apt 4"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      City
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Adenta"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Region
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Greater Accra"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      ZIP/Postal Code
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Ghana"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-zinc-100 p-6 mt-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center">
                  <CreditCard className="size-5 mr-2" />
                  Payment Method
                </h2>
                <div className="bg-zinc-50 rounded-lg p-4 text-center text-zinc-500">
                  <p>Payment integration coming soon</p>
                  <p className="text-sm mt-1">Orders will be placed for now</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
                <h2 className="font-semibold text-zinc-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-zinc-500">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-zinc-900">
                        ₵{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-zinc-900">₵{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Shipping</span>
                    <span className="text-zinc-900">
                      {shippingCost === 0
                        ? 'Free'
                        : `₵${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-zinc-100">
                    <span>Total</span>
                    <span>₵{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-zinc-900 text-white hover:bg-zinc-700 disabled:bg-zinc-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
