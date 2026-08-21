import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist, addToCart, showToast } = useShop();

  const wishlistedProducts = ALL_PRODUCTS.filter((product) =>
    wishlist.includes(product.id)
  );

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((product) => {
      addToCart(product, 1);
    });
    showToast('All wishlisted pieces moved to your bag.', 'success');
  };

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-2 font-medium">
              SAVED PIECES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
              Your Wishlist
            </h1>
            <p className="text-xs text-luxury-muted font-light mt-1">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved in your private collection
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleMoveAllToBag}
                className="btn-shine px-5 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-all shadow-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Grid / Empty State */}
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-6 max-w-md mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-luxury-muted">
              <Heart className="w-7 h-7 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-white font-normal">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs text-luxury-muted font-light leading-relaxed">
                Curate your personal atelier wardrobe. Save items you love while browsing our collection to review or purchase later.
              </p>
            </div>

            <Link
              to="/shop"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-all shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
