import React from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { label: 'All Products', slug: 'all', path: '/shop' },
  { label: 'Fashion', slug: 'fashion', path: '/shop?category=fashion' },
  { label: 'Furniture', slug: 'furniture', path: '/shop?category=furniture' },
  { label: 'Electronics', slug: 'electronics', path: '/shop?category=electronics' },
  { label: 'Medicines', slug: 'medicines', path: '/shop?category=medicines' },
  { label: 'Cosmetics', slug: 'cosmetics', path: '/shop?category=cosmetics' },
];

export const CategoryNavTabs = ({ activeCategory = 'all', onSelectCategory }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    onSelectCategory?.(tab.slug);
    navigate(tab.path);
  };

  const normalizedActive = (activeCategory || 'all').toLowerCase();

  return (
    <div className="border-b border-black/10 bg-[#F7F3EA]/95 sticky top-[69px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none py-4">
          {TABS.map((tab) => {
            const isActive =
              normalizedActive === tab.slug.toLowerCase() ||
              normalizedActive === tab.label.toLowerCase() ||
              (tab.slug === 'all' && (!normalizedActive || normalizedActive === 'all'));

            return (
              <button
                key={tab.slug}
                onClick={() => handleTabClick(tab)}
                className={`relative flex-shrink-0 text-xs sm:text-xs uppercase tracking-widest transition-colors duration-300 py-1.5 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-[#C9A45C] font-semibold'
                    : 'text-[#101820]/70 hover:text-[#101820] font-medium'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C] transform origin-left transition-all duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
