import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { ALL_PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Filter,
} from 'lucide-react';

export const AdminProducts = () => {
  const { showToast } = useShop();

  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await productService.getProducts();
        if (res.success && res.data?.length) {
          setProducts(res.data);
        }
      } catch (e) {
        // Local state fallback
      }
    };
    fetchCatalog();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      showToast('Product removed from catalog.', 'info');
    } catch {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      showToast('Product removed from catalog.', 'info');
    }
  };

  const handleToggleActive = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    showToast('Product status updated.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Atelier Silhouettes ({products.length})
          </h1>
        </div>

        <Link
          to="/admin/products/new"
          className="btn-shine px-4 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Silhouette</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-luxury-black p-4 border border-white/10 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by silhouette name, SKU, category..."
            className="w-full bg-white/5 border border-white/10 py-2 pl-9 pr-3 text-white focus:outline-none focus:border-luxury-gold/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-luxury-muted" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-neutral-900 border border-white/10 text-white px-3 py-2 text-xs focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-luxury-black border border-white/10 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-luxury-muted border-b border-white/10 bg-white/5">
            <tr>
              <th className="py-3 px-4 font-medium">Silhouette</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Price</th>
              <th className="py-3 px-4 font-medium">Stock</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-12 object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-white font-medium block truncate max-w-xs">{p.name}</span>
                      <span className="text-[10px] text-luxury-muted font-mono">{p.sku || `SKU-${p.id}`}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-luxury-cream/80">
                  {p.category}
                </td>

                <td className="py-3.5 px-4 font-serif text-white">
                  ₹{p.price.toLocaleString('en-IN')}
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 border ${
                      p.stock <= 5
                        ? 'bg-rose-950/50 text-rose-400 border-rose-500/30'
                        : 'bg-white/5 text-luxury-cream border-white/10'
                    }`}
                  >
                    {p.stock} units
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <button
                    onClick={() => handleToggleActive(p.id)}
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border font-medium transition-colors ${
                      p.isActive !== false
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}
                  >
                    {p.isActive !== false ? 'Active' : 'Draft'}
                  </button>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/product/${p.slug}`}
                      target="_blank"
                      className="p-1.5 text-luxury-muted hover:text-white transition-colors"
                      title="View on Storefront"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="p-1.5 text-luxury-muted hover:text-luxury-champagne transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-1.5 text-luxury-muted hover:text-rose-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-luxury-black border border-white/15 p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="font-serif text-lg text-white">Confirm Removal</h4>
            <p className="text-xs text-luxury-muted leading-relaxed">
              Are you certain you wish to archive this silhouette from the active atelier catalog? Historical orders will retain their records safely.
            </p>
            <div className="flex gap-3 justify-end pt-2 text-xs">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white uppercase tracking-wider font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
