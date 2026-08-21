import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, Trash2 } from 'lucide-react';

export const AdminCoupons = () => {
  const { showToast } = useShop();

  const [coupons, setCoupons] = useState([
    {
      id: 'c-1',
      code: 'SAVE10',
      type: 'percentage',
      value: 10,
      description: '10% promotional discount on entire order',
      usageCount: 48,
      isActive: true,
    },
    {
      id: 'c-2',
      code: 'FLAT500',
      type: 'fixed',
      value: 500,
      minOrder: 3000,
      description: '₹500 off on minimum purchase of ₹3,000',
      usageCount: 22,
      isActive: true,
    },
    {
      id: 'c-3',
      code: 'WELCOME15',
      type: 'percentage',
      value: 15,
      maxDiscount: 1500,
      description: '15% welcome discount capped at ₹1,500',
      usageCount: 91,
      isActive: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: 10,
    minOrder: 0,
    maxDiscount: 0,
    description: '',
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    const newCoupon = {
      id: `c-${Date.now()}`,
      code: formData.code.trim().toUpperCase(),
      type: formData.type,
      value: Number(formData.value),
      minOrder: Number(formData.minOrder) || undefined,
      maxDiscount: Number(formData.maxDiscount) || undefined,
      description: formData.description || 'Promotional coupon',
      usageCount: 0,
      isActive: true,
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    setIsModalOpen(false);
    showToast(`Coupon ${newCoupon.code} created successfully.`, 'success');
  };

  const handleDelete = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon deactivated and removed.', 'info');
  };

  const handleToggle = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Coupon status updated.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            PROMOTIONAL ENGINE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Discount & Privilege Codes ({coupons.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-shine px-4 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Privilege Code</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-luxury-black border border-white/10 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-luxury-muted border-b border-white/10 bg-white/5">
            <tr>
              <th className="py-3 px-4 font-medium">Privilege Code</th>
              <th className="py-3 px-4 font-medium">Type & Value</th>
              <th className="py-3 px-4 font-medium">Conditions</th>
              <th className="py-3 px-4 font-medium">Redemptions</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-mono text-sm text-luxury-champagne font-semibold block">
                    {c.code}
                  </span>
                  <span className="text-[10px] text-luxury-muted block">{c.description}</span>
                </td>

                <td className="py-3.5 px-4 font-medium text-white">
                  {c.type === 'percentage' ? `${c.value}% Off` : `₹${c.value} Flat`}
                </td>

                <td className="py-3.5 px-4 text-luxury-muted">
                  {c.minOrder ? `Min Order: ₹${c.minOrder}` : 'No minimum'}
                  {c.maxDiscount ? ` • Max: ₹${c.maxDiscount}` : ''}
                </td>

                <td className="py-3.5 px-4 font-mono text-white">
                  {c.usageCount} applied
                </td>

                <td className="py-3.5 px-4">
                  <button
                    onClick={() => handleToggle(c.id)}
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border font-medium transition-colors ${
                      c.isActive
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}
                  >
                    {c.isActive ? 'Active' : 'Disabled'}
                  </button>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 text-luxury-muted hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-luxury-black border border-white/15 p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <h4 className="font-serif text-lg text-white">Create Privilege Code</h4>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                  Promo Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. LUXURY20"
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-luxury-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                    Discount Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                    Max Cap (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="20% private seasonal privilege..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine px-6 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider font-medium"
                >
                  Generate Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
