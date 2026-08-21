import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const OrderSuccess = () => {
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
        if (found) {
          setOrder(found);
        }
      }
    } catch (e) {
      console.warn('Could not read orders from storage', e);
    }
  }, [orderId]);

  const displayOrderNumber = order?.orderNumber || orderId || 'ORD-2026-948201';
  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Hero Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>

          <span className="text-xs uppercase tracking-ultra text-luxury-gold block font-medium">
            TRANSACTION CONFIRMED
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
            Thank You for Your Order
          </h1>

          <p className="text-xs sm:text-sm text-luxury-muted font-light max-w-lg mx-auto leading-relaxed">
            Your bespoke order has been registered in our atelier system. A confirmation email and tracking link have been dispatched to your contact address.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/15 text-xs text-luxury-champagne font-mono">
            <span>Order Reference:</span>
            <strong className="text-white font-medium">{displayOrderNumber}</strong>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-luxury-charcoal/40 border border-white/10 p-6 sm:p-8 space-y-8 shadow-2xl animate-fade-in">
          {/* Top Meta Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-white/10 text-xs">
            <div>
              <span className="text-luxury-muted block uppercase tracking-wider text-[10px] mb-1">
                Order Date
              </span>
              <span className="text-white font-medium">{orderDate}</span>
            </div>
            <div>
              <span className="text-luxury-muted block uppercase tracking-wider text-[10px] mb-1">
                Estimated Transit
              </span>
              <span className="text-luxury-champagne font-medium">
                {order?.deliveryMethod?.estimate || '2–4 Business Days'}
              </span>
            </div>
            <div>
              <span className="text-luxury-muted block uppercase tracking-wider text-[10px] mb-1">
                Payment Method
              </span>
              <span className="text-white capitalize font-medium">
                {order?.paymentMethod === 'card'
                  ? 'Credit / Debit Card'
                  : order?.paymentMethod === 'upi'
                  ? 'UPI Gateway'
                  : 'Cash on Delivery'}
              </span>
            </div>
            <div>
              <span className="text-luxury-muted block uppercase tracking-wider text-[10px] mb-1">
                Total Amount
              </span>
              <span className="font-serif text-base text-luxury-champagne font-medium">
                ₹{(order?.total || 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Shipping Address & Delivery Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/10 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-luxury-champagne font-medium uppercase tracking-wider text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Delivery Address</span>
              </div>
              {order?.shippingAddress ? (
                <div className="text-luxury-cream/80 font-light space-y-0.5 pl-5 border-l border-white/15">
                  <p className="font-medium text-white">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.addressLine1} {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pinCode}</p>
                  <p className="text-luxury-muted">+91 {order.shippingAddress.phone || order.customer?.phone}</p>
                </div>
              ) : (
                <p className="text-luxury-muted pl-5">Express Air Delivery Destination</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-luxury-champagne font-medium uppercase tracking-wider text-[11px]">
                <Truck className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Shipping Carrier</span>
              </div>
              <div className="text-luxury-cream/80 font-light space-y-0.5 pl-5 border-l border-white/15">
                <p className="font-medium text-white">{order?.deliveryMethod?.name || 'Priority Express'}</p>
                <p className="text-luxury-muted">Dispatched with signature verification & temperature-controlled packaging.</p>
              </div>
            </div>
          </div>

          {/* Itemized Purchased Pieces */}
          {order?.items && order.items.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-serif text-base text-white font-medium">
                Purchased Pieces ({order.items.reduce((a, b) => a + b.quantity, 0)})
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
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to={`/account/orders/${displayOrderNumber}`}
              className="btn-shine w-full sm:w-auto px-8 py-3.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-all shadow-xl text-center flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>View Order Timeline</span>
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 hover:border-white text-luxury-cream hover:text-white text-xs uppercase tracking-widest font-medium transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
