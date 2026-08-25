import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const AdminCategories = () => {
  const { showToast } = useShop();
  const [categories, setCategories] = useState(
    CATEGORIES.map((c) => {
      const count = PRODUCTS.filter(
        (p) => (p.categorySlug || p.category || '').toLowerCase() === c.slug.toLowerCase()
      ).length;
      return { ...c, isActive: true, count };
    })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description,
      image: cat.image,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, ...formData } : c))
      );
      showToast('Category updated.', 'success');
    } else {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      const newCat = {
        id: slug,
        slug,
        ...formData,
        link: `/category/${slug}`,
        subcategories: ['All Items'],
        isActive: true,
        count: 0,
      };
      setCategories((prev) => [...prev, newCat]);
      showToast('Category created.', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category archived.', 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-[#F7F3EA]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            MARKETPLACE TAXONOMY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Store Categories ({categories.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="btn-shine px-4 py-2.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] uppercase tracking-wider text-xs font-semibold flex items-center gap-2 shadow-lg self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#101820] border border-white/10 overflow-hidden space-y-4 hover:border-[#C9A45C]/50 transition-all shadow-xl"
          >
            <div className="relative h-44 overflow-hidden bg-neutral-900">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="font-serif text-base text-white font-medium">{cat.name}</span>
                <span className="text-[10px] bg-[#C9A45C] text-[#101820] px-2 py-0.5 uppercase tracking-wider font-bold">
                  {cat.count} items
                </span>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-4">
              <p className="text-[#A9B0B5] font-light leading-relaxed line-clamp-2">
                {cat.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
                  Active
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-[#A9B0B5] hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-[#A9B0B5] hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#101820] border border-white/15 p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <h4 className="font-serif text-lg text-white">
              {editingCategory ? `Edit Category "${editingCategory.name}"` : 'New Marketplace Category'}
            </h4>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[#F7F3EA] uppercase tracking-wider text-[11px] block">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sporting Goods"
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C9A45C]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F7F3EA] uppercase tracking-wider text-[11px] block">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Curated high-performance gear..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F7F3EA] uppercase tracking-wider text-[11px] block">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C9A45C] font-mono"
                  required
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine px-6 py-2.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
