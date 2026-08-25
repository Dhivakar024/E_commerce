import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { useShop } from '../../context/ShopContext';
import {
  Search,
  Filter,
  X,
  Printer,
} from 'lucide-react';

const STATUS_OPTIONS = [
  'Order Confirmed',
  'Processing & Packaging',
  'Dispatched',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

export const AdminOrders = () => {
  const { showToast } = useShop();

  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getAllOrdersAdmin();
        if (res.success && res.data?.length) {
          setOrders(res.data);
        } else {
          loadLocalOrders();
        }
      } catch {
        loadLocalOrders();
      }
    };

    const loadLocalOrders = () => {
      try {
        const local = localStorage.getItem('elan_orders');
        if (local) {
          setOrders(JSON.parse(local));
        } else {
          // Mock orders
          setOrders([
            {
              id: 'ord-demo-1',
              orderNumber: 'ORD-2026-984210',
              createdAt: new Date(Date.now() - 3600000).toISOString(),
              customer: { email: 'eleanor@vance.com', phone: '9876543210', newsletterOptIn: true },
              shippingAddress: {
                firstName: 'Eleanor',
                lastName: 'Vance',
                phone: '9876543210',
                addressLine1: '42 Marine Drive',
                city: 'Mumbai',
                state: 'Maharashtra',
                pinCode: '400020',
                country: 'India',
              },
              deliveryMethod: { id: 'express', name: 'Priority Air Express', estimate: '1–2 Days', price: 199 },
              paymentMethod: 'card',
              items: [
                {
                  product: { id: 3, name: 'Tailored Cashmere Overcoat', price: 12999, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80', description: '', category: 'Men', rating: 5, reviewCount: 64, stock: 5 },
                  quantity: 1,
                  selectedSize: 'M',
                  selectedColor: 'Camel',
                },
              ],
              subtotal: 12999,
              discount: 1300,
              shipping: 199,
              tax: 2106,
              total: 14004,
              status: 'Processing & Packaging',
            },
            {
              id: 'ord-demo-2',
              orderNumber: 'ORD-2026-874312',
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              customer: { email: 'julian@sterling.com', phone: '9876543211', newsletterOptIn: true },
              shippingAddress: {
                firstName: 'Julian',
                lastName: 'Sterling',
                phone: '9876543211',
                addressLine1: '7 Golf Links',
                city: 'New Delhi',
                state: 'Delhi',
                pinCode: '110003',
                country: 'India',
              },
              deliveryMethod: { id: 'standard', name: 'Standard Insured Delivery', estimate: '3–5 Days', price: 0 },
              paymentMethod: 'upi',
              items: [
                {
                  product: { id: 4, name: 'Structured Leather Tote', price: 7499, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80', description: '', category: 'Accessories', rating: 4.8, reviewCount: 84, stock: 12 },
                  quantity: 1,
                  selectedSize: 'One Size',
                  selectedColor: 'Cognac',
                },
              ],
              subtotal: 7499,
              discount: 0,
              shipping: 0,
              tax: 1350,
              total: 8849,
              status: 'Order Confirmed',
            },
          ]);
        }
      } catch (e) {
        console.warn('Orders load error', e);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatusAdmin(orderId, newStatus);
    } catch {
      // Local state update
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o))
    );

    // Also update local storage if order exists there
    try {
      const local = localStorage.getItem('elan_orders');
      if (local) {
        const parsed = JSON.parse(local);
        const updated = parsed.map((o) =>
          o.orderNumber === orderId || o.id === orderId ? { ...o, status: newStatus } : o
        );
        localStorage.setItem('elan_orders', JSON.stringify(updated));
      }
    } catch {}

    showToast(`Order status updated to "${newStatus}".`, 'success');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchesSearch =
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.firstName?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            FULFILLMENT & LOGISTICS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Client Order Transactions ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-luxury-black p-4 border border-white/10">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, email, recipient name..."
            className="w-full bg-white/5 border border-white/10 py-2 pl-9 pr-3 text-white focus:outline-none focus:border-luxury-gold/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-luxury-muted" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-neutral-900 border border-white/10 text-white px-3 py-2 text-xs focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-luxury-black border border-white/10 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-luxury-muted border-b border-white/10 bg-white/5">
            <tr>
              <th className="py-3 px-4 font-medium">Order Number</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Items</th>
              <th className="py-3 px-4 font-medium">Grand Total</th>
              <th className="py-3 px-4 font-medium">Fulfillment Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredOrders.map((order) => (
              <tr key={order.id || order.orderNumber} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-mono text-luxury-gold font-medium">
                  {order.orderNumber}
                  <span className="text-[10px] text-luxury-muted block font-sans">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-white font-medium block">
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                  </span>
                  <span className="text-[10px] text-luxury-muted block">{order.customer?.email}</span>
                </td>

                <td className="py-3.5 px-4 text-luxury-cream/80">
                  {order.items?.reduce((a, b) => a + b.quantity, 0)} pieces
                </td>

                <td className="py-3.5 px-4 font-serif text-white font-medium">
                  ₹{order.total?.toLocaleString('en-IN')}
                </td>

                <td className="py-3.5 px-4">
                  <select
                    value={order.status || 'Order Confirmed'}
                    onChange={(e) => handleStatusChange(order.id || order.orderNumber, e.target.value)}
                    className="bg-white/10 border border-white/15 text-luxury-champagne text-[11px] px-2.5 py-1 focus:outline-none cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status} className="bg-neutral-900 text-white">
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn-shine px-3 py-1 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-[10px] font-medium"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Inspection Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-luxury-black border border-white/15 p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
                  ORDER INVOICE BREAKDOWN
                </span>
                <h3 className="font-serif text-xl text-white font-normal">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-luxury-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Client Information</span>
                <p className="text-white font-medium">{selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}</p>
                <p className="text-luxury-muted">{selectedOrder.customer?.email}</p>
                <p className="text-luxury-muted">+91 {selectedOrder.customer?.phone}</p>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Destination Address</span>
                <p className="text-white font-medium">{selectedOrder.shippingAddress?.addressLine1}</p>
                <p className="text-luxury-muted">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} – {selectedOrder.shippingAddress?.pinCode}</p>
                <p className="text-luxury-champagne">{selectedOrder.deliveryMethod?.name}</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-medium">
                Purchased Silhouettes
              </span>
              <div className="divide-y divide-white/5 border-y border-white/10">
                {selectedOrder.items?.map((item, idx) => {
                  const itemImg = item.product?.image || item.image;
                  const itemName = item.product?.name || item.name;
                  const itemPrice = item.product?.price || item.price || 0;

                  return (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={itemImg}
                          alt={itemName}
                          className="w-10 h-12 object-cover border border-white/10 bg-neutral-900"
                        />
                        <div>
                          <span className="font-medium text-white block">{itemName}</span>
                          <span className="text-[10px] text-luxury-muted">
                            Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-serif text-white">
                        ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financials */}
            <div className="p-4 bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-luxury-muted">
                <span>Subtotal</span>
                <span className="text-white">₹{selectedOrder.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-₹{selectedOrder.discount?.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-luxury-muted">
                <span>Shipping</span>
                <span className="text-white">₹{selectedOrder.shipping?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Estimated Tax (18% GST)</span>
                <span className="text-white">₹{selectedOrder.tax?.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="font-serif text-sm text-white">Grand Total</span>
                <span className="font-serif text-lg text-luxury-champagne font-medium">
                  ₹{selectedOrder.total?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white uppercase tracking-wider text-xs flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
