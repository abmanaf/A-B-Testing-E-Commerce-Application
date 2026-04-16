'use client';

import { useEffect, useState } from 'react';
import { Package, Eye, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    email: string;
  };
  shippingAddress: string;
  shippingPhone: string;
  items: {
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load orders:', err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-zinc-100 text-zinc-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>
          <p className="text-zinc-500 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-zinc-900">
                          {order.user?.email || 'Guest'}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {order.shippingPhone || 'No phone'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                      ₵{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="gap-1"
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    <Package className="size-12 mx-auto mb-4 text-zinc-300" />
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-900">
                Order #{selectedOrder.id.slice(0, 8)}
              </h2>
              <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Status</span>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 mb-2">Customer</h3>
                <p className="text-zinc-600">
                  {selectedOrder.user?.email || 'Guest'}
                </p>
                <p className="text-zinc-500 text-sm">
                  {selectedOrder.shippingPhone || 'No phone'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 mb-2">
                  Shipping Address
                </h3>
                <p className="text-zinc-600">
                  {selectedOrder.shippingAddress || 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 mb-2">Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-zinc-600">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-zinc-900">
                        ₵{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-100 mt-4 pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₵{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
