import React, { useState } from 'react';
import { ALL_PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { Save, Plus, Minus, Search } from 'lucide-react';

export const AdminInventory = () => {
  const { showToast } = useShop();
  const [inventory, setInventory] = useState(
    ALL_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku || `SKU-${p.id}`,
      category: p.category,
      price: p.price,
      stock: p.stock,
      image: p.image,
    }))
  );

  const [search, setSearch] = useState('');
  const lowStockThreshold = 8;

  const handleStockChange = (id, delta) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const handleSaveAll = () => {
    showToast('Inventory stock allocations synchronized successfully.', 'success');
  };

  const filteredInventory = inventory.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.sku.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            ATELIER SUPPLY & STOCK
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Inventory Management
          </h1>
        </div>

        <button
          onClick={handleSaveAll}
          className="btn-shine px-5 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Commit Stock Updates</span>
        </button>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-luxury-black border border-white/10 space-y-1">
          <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Total Units in Atelier</span>
          <span className="font-serif text-2xl text-white font-medium">
            {inventory.reduce((a, b) => a + b.stock, 0)} units
          </span>
        </div>

        <div className="p-4 bg-luxury-black border border-white/10 space-y-1">
          <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Low Stock Watch (&le; 8 units)</span>
          <span className="font-serif text-2xl text-rose-400 font-medium">
            {inventory.filter((i) => i.stock <= lowStockThreshold).length} silhouettes
          </span>
        </div>

        <div className="p-4 bg-luxury-black border border-white/10 space-y-1">
          <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Inventory Capital Valuation</span>
          <span className="font-serif text-2xl text-luxury-champagne font-medium">
            ₹{inventory.reduce((a, b) => a + b.stock * b.price, 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-luxury-black p-4 border border-white/10 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter inventory by silhouette, SKU..."
            className="w-full bg-white/5 border border-white/10 py-2 pl-9 pr-3 text-white focus:outline-none focus:border-luxury-gold/50"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-luxury-black border border-white/10 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-luxury-muted border-b border-white/10 bg-white/5">
            <tr>
              <th className="py-3 px-4 font-medium">Silhouette</th>
              <th className="py-3 px-4 font-medium">SKU</th>
              <th className="py-3 px-4 font-medium">Unit Price</th>
              <th className="py-3 px-4 font-medium">Stock Level</th>
              <th className="py-3 px-4 font-medium text-right">Adjust Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-12 object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                    />
                    <div>
                      <span className="text-white font-medium block">{item.name}</span>
                      <span className="text-[10px] text-luxury-muted">{item.category}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-mono text-luxury-muted">
                  {item.sku}
                </td>

                <td className="py-3.5 px-4 font-serif text-white">
                  ₹{item.price.toLocaleString('en-IN')}
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`font-mono text-xs px-2.5 py-1 border font-medium ${
                      item.stock <= lowStockThreshold
                        ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        : 'bg-white/5 text-white border-white/15'
                    }`}
                  >
                    {item.stock} in stock
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStockChange(item.id, -1)}
                      className="w-7 h-7 bg-white/5 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-mono text-white">{item.stock}</span>
                    <button
                      onClick={() => handleStockChange(item.id, 1)}
                      className="w-7 h-7 bg-white/5 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
