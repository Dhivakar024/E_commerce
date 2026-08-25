import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  Printer,
  ArrowLeft,
  Package,
} from 'lucide-react';

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const savedOrdersStr = localStorage.getItem('lax360_orders');
      if (savedOrdersStr) {
        const orders = JSON.parse(savedOrdersStr);
        const found = orders.find(
          (o) => o.orderNumber === orderId || o.id === orderId
        );
        if (found) setOrder(found);
      }
    } catch (e) {
      console.warn('Could not load order details', e);
    }
  }, [orderId]);

  const displayOrderNum = order?.orderNumber || orderId || 'ORD-2026-948201';
  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'August 25, 2026';

  const timelineSteps = [
    { label: 'Order Placed & Confirmed', date: orderDate, status: 'completed' },
    { label: 'Quality Inspection & Packaging', date: 'In Progress', status: 'active' },
    { label: 'Dispatched via Express Courier', date: 'Pending', status: 'upcoming' },
    { label: 'Out for Delivery', date: 'Pending', status: 'upcoming' },
    { label: 'Delivered', date: 'Expected in 2–4 Days', status: 'upcoming' },
  ];

  return (
    <main className="w-full bg-[#101820] text-[#F7F3EA] min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-[#A9B0B5] mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/account/orders" className="hover:text-white transition-colors">
            Orders
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#C9A45C] font-medium truncate">{displayOrderNum}</span>
        </nav>

        {/* Header with Print Invoice */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              ORDER STATUS
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
              Order {displayOrderNum}
            </h1>
            <p className="text-xs text-[#A9B0B5] mt-1">Placed on {orderDate}</p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#F7F3EA] hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>

        {/* Timeline Progress */}
        <div className="p-6 sm:p-8 bg-[#1B2630] border border-white/10 mb-8 space-y-6">
          <h3 className="font-serif text-lg text-white font-normal">
            Fulfillment Status: <span className="text-[#C9A45C] font-semibold">Processing & Packaging</span>
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-white/15">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Dot Icon */}
                <div
                  className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 text-black'
                      : step.status === 'active'
                      ? 'bg-[#C9A45C] text-black animate-pulse'
                      : 'bg-white/20'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-3 h-3 text-[#101820]" />
                  ) : step.status === 'active' ? (
                    <Clock className="w-2.5 h-2.5 text-[#101820]" />
                  ) : null}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white">{step.label}</h4>
                  <span className="text-[11px] text-[#A9B0B5]">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchased Items List */}
        {order?.items && order.items.length > 0 && (
          <div className="p-6 sm:p-8 bg-[#1B2630] border border-white/10 space-y-4 mb-8">
            <h4 className="font-serif text-lg text-white font-normal">
              Order Items ({order.items.reduce((a, b) => a + b.quantity, 0)})
            </h4>

            <div className="divide-y divide-white/5 border-y border-white/5">
              {order.items.map((item, idx) => {
                const price = item.product?.price ?? item.price ?? 0;
                return (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.product?.image || item.image}
                        alt={item.product?.name || item.name}
                        className="w-14 h-16 object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-medium text-white block truncate">{item.product?.name || item.name}</span>
                        <span className="text-[11px] text-[#A9B0B5] block">
                          Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                        </span>
                      </div>
                    </div>

                    <span className="font-serif text-sm text-[#C9A45C] font-semibold flex-shrink-0">
                      ₹{(price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between text-sm">
              <span className="text-[#A9B0B5]">Total Paid:</span>
              <span className="font-serif text-base text-[#C9A45C] font-bold">
                ₹{(order?.total || 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </Link>
        </div>
      </div>
    </main>
  );
};
