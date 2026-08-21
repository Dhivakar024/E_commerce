import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, Trash2 } from 'lucide-react';

export const AdminBanners = () => {
  const { showToast } = useShop();

  const [banners, setBanners] = useState([
    {
      id: 'b-1',
      title: 'THE SEASON’S EDIT',
      subtitle: 'Elevate Your Everyday with Sculptural Elegance',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
      cta: 'Explore Collection',
      ctaUrl: '/shop',
      isActive: true,
    },
    {
      id: 'b-2',
      title: 'SUMMER CASHMERE & LINEN',
      subtitle: 'Bespoke textures woven in Italian mills',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80',
      cta: 'View Curations',
      ctaUrl: '/shop/men',
      isActive: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    cta: 'Shop Now',
    ctaUrl: '/shop',
  });

  const handleSave = (e) => {
    e.preventDefault();
    const newBanner = {
      id: `b-${Date.now()}`,
      ...formData,
      isActive: true,
    };
    setBanners((prev) => [newBanner, ...prev]);
    setIsModalOpen(false);
    showToast('Campaign banner created successfully.', 'success');
  };

  const handleDelete = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    showToast('Campaign banner archived.', 'info');
  };

  const handleToggle = (id) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
    showToast('Campaign display status toggled.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            CAMPAIGN CREATIVE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Storefront Banners & Highlights ({banners.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-shine px-4 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign Banner</span>
        </button>
      </div>

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-luxury-black border border-white/10 overflow-hidden space-y-4 shadow-xl"
          >
            <div className="relative h-48 sm:h-56">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 space-y-1">
                <span className="font-serif text-lg text-white font-normal block">{b.title}</span>
                <p className="text-[11px] text-luxury-muted font-light">{b.subtitle}</p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(b.id)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border font-medium transition-colors ${
                    b.isActive
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}
                >
                  {b.isActive ? 'Active on Storefront' : 'Draft / Inactive'}
                </button>
                <span className="text-[10px] text-luxury-muted font-mono">
                  CTA: {b.cta} → {b.ctaUrl}
                </span>
              </div>

              <button
                onClick={() => handleDelete(b.id)}
                className="p-1.5 text-luxury-muted hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-luxury-black border border-white/15 p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <h4 className="font-serif text-lg text-white">Create Campaign Banner</h4>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. THE AUTUMN ATELIER EDIT"
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                  Subheading
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Bespoke outerwear and liquid silk drapery..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                  Hero Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white font-mono focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">
                    Target URL
                  </label>
                  <input
                    type="text"
                    value={formData.ctaUrl}
                    onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
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
                  Publish Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
