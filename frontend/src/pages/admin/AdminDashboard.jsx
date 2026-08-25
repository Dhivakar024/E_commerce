import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/index';
import { ALL_PRODUCTS } from '../../data/products';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  Clock,
  Plus,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 342500,
    totalOrders: 148,
    totalCustomers: 89,
    totalProducts: ALL_PRODUCTS.length,
    pendingOrders: 12,
    lowStockCount: ALL_PRODUCTS.filter((p) => p.stock <= 5).length,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      _id: 'ord-101',
      orderNumber: 'ORD-2026-8819',
      customer: { firstName: 'Arya', lastName: 'Kapoor' },
      total: 12499,
      status: 'Processing',
      createdAt: new Date().toISOString(),
      items: [{ quantity: 2 }],
    },
    {
      _id: 'ord-102',
      orderNumber: 'ORD-2026-8818',
      customer: { firstName: 'Rohan', lastName: 'Mehta' },
      total: 34999,
      status: 'Dispatched',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      items: [{ quantity: 1 }],
    },
    {
      _id: 'ord-103',
      orderNumber: 'ORD-2026-8817',
      customer: { firstName: 'Ananya', lastName: 'Sen' },
      total: 5890,
      status: 'Delivered',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      items: [{ quantity: 3 }],
    },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success && res.data) {
          setStats((prev) => ({ ...prev, ...res.data.stats }));
          if (res.data.recentOrders?.length) setRecentOrders(res.data.recentOrders);
        }
      } catch (e) {
        // Graceful mock data display
      }
    };
    fetchDashboard();
  }, []);

  const metricCards = [
    {
      label: 'Gross Marketplace Revenue',
      value: `₹${stats.totalSales.toLocaleString('en-IN')}`,
      sub: '+18.4% this month',
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toString(),
      sub: `${stats.pendingOrders} awaiting fulfillment`,
      icon: ShoppingBag,
      color: 'text-[#C9A45C]',
    },
    {
      label: 'Registered Customers',
      value: stats.totalCustomers.toString(),
      sub: 'Active marketplace accounts',
      icon: Users,
      color: 'text-[#C9A45C]',
    },
    {
      label: 'Total Products',
      value: stats.totalProducts.toString(),
      sub: `${stats.lowStockCount} items low in stock`,
      icon: Package,
      color: 'text-sky-400',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F7F3EA]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            EXECUTIVE OVERVIEW
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Marketplace Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="btn-shine px-4 py-2.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] uppercase tracking-wider text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-[#101820] border border-white/10 space-y-3 relative overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#A9B0B5] font-medium">
                  {card.label}
                </span>
                <div className={`p-2 bg-white/5 border border-white/10 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                  {card.value}
                </h3>
                <p className="text-[11px] text-[#A9B0B5] font-light">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column: Recent Orders + Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders List (7 Cols) */}
        <div className="lg:col-span-7 bg-[#101820] border border-white/10 p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="font-serif text-lg text-white font-normal">Recent Marketplace Orders</h3>
            <Link
              to="/admin/orders"
              className="text-xs uppercase tracking-wider text-[#C9A45C] hover:text-white flex items-center gap-1 font-medium"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="py-3.5 flex items-center justify-between text-xs hover:bg-white/5 px-2 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white font-medium">{order.orderNumber}</span>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : order.status === 'Dispatched'
                          ? 'bg-blue-950/80 text-blue-300 border border-blue-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[#A9B0B5] text-[11px]">
                    {order.customer?.firstName} {order.customer?.lastName} • {order.items?.length || 1} items
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="font-serif text-sm text-[#C9A45C] font-semibold block">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-[#A9B0B5]">
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock & Inventory Alerts (5 Cols) */}
        <div className="lg:col-span-5 bg-[#101820] border border-white/10 p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif text-lg text-white font-normal">Stock & Inventory Alerts</h3>
            </div>
            <span className="text-xs text-[#A9B0B5]">
              {ALL_PRODUCTS.filter((p) => p.stock <= 5).length} Items
            </span>
          </div>

          <div className="space-y-3">
            {ALL_PRODUCTS.filter((p) => p.stock <= 5).slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-12 object-cover border border-white/10 flex-shrink-0"
                />
                <div className="min-w-0 flex-grow">
                  <span className="font-medium text-white block truncate">{p.name}</span>
                  <span className="text-[10px] text-[#A9B0B5]">{p.category} • {p.brand}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-rose-950/80 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                    {p.stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/admin/inventory"
              className="btn-shine w-full py-2.5 bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] border border-white/15 text-xs text-center block uppercase tracking-wider font-semibold transition-colors"
            >
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
