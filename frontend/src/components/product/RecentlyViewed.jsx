import React, { useEffect, useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useTheme } from '../../context/ThemeContext';

export const RecentlyViewed = ({ currentProductId }) => {
  const [recentProducts, setRecentProducts] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('elan_recently_viewed');
      let ids = savedStr ? JSON.parse(savedStr) : [];

      ids = [currentProductId, ...ids.filter((id) => String(id) !== String(currentProductId))].slice(0, 6);
      localStorage.setItem('elan_recently_viewed', JSON.stringify(ids));

      const displayIds = ids.filter((id) => String(id) !== String(currentProductId)).slice(0, 4);
      const items = displayIds
        .map((id) => PRODUCTS.find((p) => String(p.id) === String(id)))
        .filter((p) => p !== undefined);

      setRecentProducts(items);
    } catch (e) {
      console.warn('Recently viewed storage error:', e);
    }
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <section className={`pt-16 border-t mb-20 animate-fade-in ${
      isDark ? 'border-white/10' : 'border-black/10'
    }`}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            HISTORY
          </span>
          <h3 className={`font-serif text-2xl sm:text-3xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            Recently Viewed
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {recentProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
