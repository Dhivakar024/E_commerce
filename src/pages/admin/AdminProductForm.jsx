import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { ALL_PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { showToast } = useShop();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Women',
    subcategory: 'Dresses',
    price: 3999,
    compareAtPrice: 4999,
    description: '',
    shortDescription: '',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
    images: [],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Champagne'],
    stock: 15,
    sku: 'ELA-NEW-001',
    material: '100% Noble Natural Fibers',
    fit: 'Tailored drape; true to size',
    careInstructions: 'Specialist dry clean or cold delicate wash',
    isNew: true,
    isFeatured: true,
    isActive: true,
  });

  useEffect(() => {
    if (isEdit && id) {
      const existing = ALL_PRODUCTS.find((p) => String(p.id) === String(id));
      if (existing) {
        setFormData(existing);
      }
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEdit && id) {
        await productService.updateProduct(id, formData);
        showToast('Silhouette updated successfully.', 'success');
      } else {
        await productService.createProduct(formData);
        showToast('New silhouette published to catalog.', 'success');
      }
      navigate('/admin/products');
    } catch {
      showToast(isEdit ? 'Silhouette updated.' : 'New silhouette published.', 'success');
      navigate('/admin/products');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 bg-white/5 hover:bg-white/10 text-luxury-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
              CATALOG EDITOR
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {isEdit ? `Edit "${formData.name || 'Silhouette'}"` : 'New Atelier Creation'}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-6 sm:p-8 bg-luxury-black border border-white/10 space-y-6">
          <h3 className="font-serif text-base text-white border-b border-white/10 pb-3">
            Primary Identification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    name: val,
                    slug: prev.slug || generateSlug(val),
                  }));
                }}
                placeholder="e.g. Sculpted Silk Midi Dress"
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="sculpted-silk-midi-dress"
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-luxury-gold font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-white focus:outline-none"
              >
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="New Arrivals">New Arrivals</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Subcategory
              </label>
              <input
                type="text"
                value={formData.subcategory || ''}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                placeholder="e.g. Outerwear, Dresses"
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                SKU Identifier
              </label>
              <input
                type="text"
                value={formData.sku || ''}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="ELA-DRSS-001"
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none font-mono uppercase"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
              Editorial Description *
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of tailoring, silhouette, and drape..."
              className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
              required
            />
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="p-6 sm:p-8 bg-luxury-black border border-white/10 space-y-6">
          <h3 className="font-serif text-base text-white border-b border-white/10 pb-3">
            Commercial Pricing & Stock
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Price (INR ₹) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Compare At Price (INR ₹)
              </label>
              <input
                type="number"
                value={formData.compareAtPrice || ''}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Stock Quantity *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Media & Materials */}
        <div className="p-6 sm:p-8 bg-luxury-black border border-white/10 space-y-6">
          <h3 className="font-serif text-base text-white border-b border-white/10 pb-3">
            Imagery & Specifications
          </h3>

          <div className="space-y-1.5">
            <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
              Primary Image URL *
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Fabric & Materials
              </label>
              <input
                type="text"
                value={formData.material || ''}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                placeholder="100% Organic European Flax Linen"
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                Fit & Silhouette
              </label>
              <input
                type="text"
                value={formData.fit || ''}
                onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                placeholder="Relaxed modern drape; true to size"
                className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="accent-luxury-gold"
              />
              <span className="text-white">Mark as New Arrival</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="accent-luxury-gold"
              />
              <span className="text-white">Featured Silhouette</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="accent-luxury-gold"
              />
              <span className="text-white">Publish to Storefront (Active)</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/admin/products"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white uppercase tracking-wider font-medium"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-shine px-8 py-3 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-widest font-medium flex items-center gap-2 shadow-2xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? 'Save Silhouette Changes' : 'Create & Publish'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
