'use client';

import { useEffect, useState } from 'react';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load stats:', err);
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      name: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      change: '+3.1%',
      changeType: 'positive',
    },
    {
      name: 'Total Customers',
      value: stats.totalCustomers.toString(),
      icon: Users,
      change: '-2.4%',
      changeType: 'negative',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl border border-zinc-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center">
                <stat.icon className="size-6 text-zinc-600" />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="size-4" />
                ) : (
                  <ArrowDownRight className="size-4" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            <p className="text-sm text-zinc-500 mt-1">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100">
        <div className="p-6 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">Recent Orders</h2>
        </div>
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
                  Total
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {order.user?.email || 'Guest'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          order.status === 'placed'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'shipped'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
