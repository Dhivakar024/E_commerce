import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/index';
import { ALL_PRODUCTS } from '../../data/products';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Plus,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 284500,
    totalOrders: 38,
    totalCustomers: 124,
    totalProducts: ALL_PRODUCTS.length,
    lowStockCount: 2,
    pendingOrders: 4,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      orderNumber: 'ORD-2026-984210',
      customer: 'Eleanor Vance',
      email: 'eleanor@vance.com',
      total: 12999,
      status: 'Preparing in Atelier',
      itemsCount: 1,
      date: '10 mins ago',
    },
    {
      orderNumber: 'ORD-2026-874312',
      customer: 'Julian Sterling',
      email: 'julian@sterling.com',
      total: 7499,
      status: 'Order Confirmed',
      itemsCount: 2,
      date: '1 hour ago',
    },
    {
      orderNumber: 'ORD-2026-654921',
      customer: 'Dhivakar Kumar',
      email: 'dhivakar@client.com',
      total: 16898,
      status: 'Dispatched',
      itemsCount: 3,
      date: '4 hours ago',
    },
    {
      orderNumber: 'ORD-2026-432190',
      customer: 'Sophia Laurent',
      email: 'sophia@laurent.com',
      total: 4999,
      status: 'Delivered',
      itemsCount: 1,
      date: 'Yesterday',
    },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success && res.data) {
          if (res.data.metrics) setStats(res.data.metrics);
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
      label: 'Gross Atelier Revenue',
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
      color: 'text-luxury-champagne',
    },
    {
      label: 'VIP Client Base',
      value: stats.totalCustomers.toString(),
      sub: 'Active registered patrons',
      icon: Users,
      color: 'text-luxury-gold',
    },
    {
      label: 'Catalog Silhouettes',
      value: stats.totalProducts.toString(),
      sub: `${stats.lowStockCount} items low in stock`,
      icon: Package,
      color: 'text-sky-400',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            EXECUTIVE OVERVIEW
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Atelier Performance Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="btn-shine px-4 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create Silhouette</span>
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
              className="p-6 bg-luxury-black border border-white/10 space-y-4 hover:border-white/20 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-luxury-muted font-medium">
                  {card.label}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl text-white font-medium block">
                  {card.value}
                </span>
                <span className="text-[11px] text-luxury-muted block mt-1">
                  {card.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column: Recent Orders + Quick Atelier Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-luxury-black border border-white/10 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-serif text-lg text-white font-normal">Recent Transactions</h3>
              <p className="text-xs text-luxury-muted">Latest customer purchases awaiting or in fulfillment.</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs uppercase tracking-wider text-luxury-champagne hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>All Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-luxury-muted border-b border-white/10 pb-2">
                <tr>
                  <th className="pb-3 font-medium">Order Reference</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 font-mono text-luxury-gold font-medium">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3.5">
                      <span className="text-white block font-medium">{ord.customer || ord.customer?.email}</span>
                      <span className="text-[10px] text-luxury-muted">{ord.email || ord.date}</span>
                    </td>
                    <td className="py-3.5 font-serif text-white">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-white/10 text-luxury-champagne border border-white/10">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        to={`/admin/orders`}
                        className="text-luxury-muted hover:text-white uppercase tracking-wider text-[11px]"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Low Stock & Category Performance (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Alerts */}
          <div className="p-6 bg-luxury-black border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 pb-3 border-b border-white/10">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-medium">Stock Watch Alerts</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5">
                <div>
                  <span className="text-white block font-medium">Tailored Cashmere Overcoat</span>
                  <span className="text-[10px] text-luxury-muted">ELA-COAT-003</span>
                </div>
                <span className="px-2 py-1 text-[10px] text-rose-400 bg-rose-950/60 border border-rose-500/30 font-mono">
                  5 in stock
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5">
                <div>
                  <span className="text-white block font-medium">Silk Blend Slip Dress</span>
                  <span className="text-[10px] text-luxury-muted">ELA-DRSS-002</span>
                </div>
                <span className="px-2 py-1 text-[10px] text-rose-400 bg-rose-950/60 border border-rose-500/30 font-mono">
                  8 in stock
                </span>
              </div>
            </div>

            <Link
              to="/admin/inventory"
              className="btn-shine block w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-center uppercase tracking-wider text-[11px] font-medium transition-colors"
            >
              Manage Atelier Inventory
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-6 bg-luxury-black border border-white/10 space-y-3 shadow-xl text-xs">
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-medium">
              Management Actions
            </span>
            <div className="space-y-2">
              <Link
                to="/admin/coupons"
                className="block p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              >
                + Generate Promotional Discount Code
              </Link>
              <Link
                to="/admin/banners"
                className="block p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              >
                🎨 Update Homepage Campaign Banner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
