import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  Printer,
  ArrowLeft,
} from 'lucide-react';

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const savedOrdersStr = localStorage.getItem('elan_orders');
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
    : 'August 19, 2026';

  const timelineSteps = [
    { label: 'Order Confirmed', date: orderDate, status: 'completed' },
    { label: 'Tailoring & Packaging in Atelier', date: 'In Progress', status: 'active' },
    { label: 'Dispatched via Air Freight', date: 'Pending', status: 'upcoming' },
    { label: 'Out for Delivery', date: 'Pending', status: 'upcoming' },
    { label: 'Delivered', date: 'Expected in 2–4 Days', status: 'upcoming' },
  ];

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-luxury-muted mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/shop" className="hover:text-white transition-colors">
            Orders
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-luxury-champagne font-medium truncate">{displayOrderNum}</span>
        </nav>

        {/* Header with Print Invoice */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-2 font-medium">
              ORDER TRACKER
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
              Order {displayOrderNum}
            </h1>
            <p className="text-xs text-luxury-muted mt-1">Placed on {orderDate}</p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-luxury-cream hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>

        {/* Timeline Progress */}
        <div className="p-6 sm:p-8 bg-luxury-charcoal/40 border border-white/10 mb-8 space-y-6">
          <h3 className="font-serif text-lg text-white font-normal">
            Fulfillment Status: <span className="text-luxury-champagne font-medium">Preparing in Atelier</span>
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-white/15">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Dot Icon */}
                <div
                  className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 text-luxury-black'
                      : step.status === 'active'
                      ? 'bg-luxury-gold text-luxury-black ring-4 ring-luxury-gold/20'
                      : 'bg-neutral-800 border border-white/20'
                  }`}
                >
                  {step.status === 'completed' && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  {step.status === 'active' && <Clock className="w-2.5 h-2.5" />}
                </div>

                <div>
                  <span
                    className={`text-xs font-medium uppercase tracking-wider block ${
                      step.status === 'completed'
                        ? 'text-white'
                        : step.status === 'active'
                        ? 'text-luxury-champagne'
                        : 'text-luxury-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] text-luxury-muted block font-light mt-0.5">
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Items Breakdown */}
        <div className="p-6 sm:p-8 bg-luxury-charcoal/40 border border-white/10 space-y-6 mb-8">
          <h3 className="font-serif text-lg text-white font-normal pb-4 border-b border-white/10">
            Order Items & Summary
          </h3>

          {order?.items && (
            <div className="divide-y divide-white/5">
              {order.items.map((item, idx) => {
                const price = item.product?.price ?? item.price ?? 0;
                return (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.product?.image || item.image}
                        alt={item.product?.name || item.name}
                        className="w-14 h-16 object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-medium text-white block truncate">{item.product?.name || item.name}</span>
                        <span className="text-[11px] text-luxury-muted block">
                          Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="font-serif text-sm text-luxury-champagne font-medium flex-shrink-0">
                      ₹{(price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Totals Breakdown */}
          {order && (
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-luxury-muted">
                <span>Subtotal</span>
                <span className="text-white">₹{order.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-₹{order.discount?.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-luxury-muted">
                <span>Shipping ({order.deliveryMethod?.name || 'Standard'})</span>
                <span className="text-white">
                  {order.shipping === 0 ? 'FREE' : `₹${order.shipping?.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Estimated Tax (18% GST)</span>
                <span className="text-white">₹{order.tax?.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-serif text-base text-white">Total Amount Paid</span>
                <span className="font-serif text-xl text-luxury-champagne font-medium">
                  ₹{order.total?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Back Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest text-luxury-champagne hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collection</span>
          </Link>
        </div>
      </div>
    </main>
  );
};
