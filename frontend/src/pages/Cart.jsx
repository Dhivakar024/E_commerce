import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { CartHeader } from '../components/cart/CartHeader';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CouponBox } from '../components/cart/CouponBox';
import { ShippingInfoBanner } from '../components/cart/ShippingInfoBanner';
import { OrderSummaryCard } from '../components/cart/OrderSummaryCard';
import { ClearCartModal } from '../components/cart/ClearCartModal';
import { CartEmptyState } from '../components/cart/CartEmptyState';
import { MobileCheckoutBar } from '../components/cart/MobileCheckoutBar';
import {
  calculateSubtotal,
  calculateDiscount,
  calculateShipping,
  calculateTax,
  calculateGrandTotal,
} from '../utils/cartCalculations';

export const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    moveToWishlist,
    clearCart,
    cartCount,
  } = useShop();
  const { isDark } = useTheme();

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Dynamic calculations
  const subtotal = calculateSubtotal(cart);
  const discount = calculateDiscount(subtotal, appliedCoupon);
  const shipping = calculateShipping(subtotal);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = calculateTax(taxableAmount);
  const grandTotal = calculateGrandTotal(subtotal, discount, shipping, tax);

  // 4 Smart Recommended products: products not already in the cart
  const cartProductIds = new Set(cart.map((item) => String(item.product?.id || item.id)));
  const recommendedProducts = PRODUCTS.filter(
    (p) => !cartProductIds.has(String(p.id))
  ).slice(0, 4);

  return (
    <main className={`w-full min-h-screen pt-22 sm:pt-24 pb-12 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* 1. Header & Breadcrumbs */}
        <CartHeader itemCount={cartCount} />

        {cart.length === 0 ? (
          /* 2. Empty Cart State */
          <CartEmptyState />
        ) : (
          /* 3. Active Cart Layout: 2-Column Desktop Grid / Vertical Mobile */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-12">
            {/* Left Column: Items, Shipping Banner, Coupon & Toolbar (7-8 Cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Dynamic Free Shipping Threshold Banner */}
              <ShippingInfoBanner subtotal={subtotal} />

              {/* Cart Items List */}
              <div className={`border p-4 sm:p-6 divide-y shadow-sm ${
                isDark
                  ? 'bg-[#1B2630] border-white/10 divide-white/10 text-white'
                  : 'bg-white border-black/10 divide-black/10 text-[#101820]'
              }`}>
                {cart.map((item, idx) => {
                  const prodId = item.product?.id || item.id;
                  return (
                    <CartItemRow
                      key={`${prodId}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                      item={item}
                      onUpdateQuantity={(newQty) =>
                        updateQuantity(
                          prodId,
                          newQty,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      onRemove={() =>
                        removeFromCart(
                          prodId,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      onMoveToWishlist={() =>
                        moveToWishlist(
                          prodId,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                    />
                  );
                })}
              </div>

              {/* Cart Actions Toolbar: Clear Cart & Continue Shopping */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsClearModalOpen(true)}
                  className="text-xs uppercase tracking-wider text-rose-500 hover:text-rose-700 underline transition-colors cursor-pointer"
                >
                  Clear Bag
                </button>
                <Link
                  to="/shop"
                  className={`text-xs uppercase tracking-wider underline transition-colors font-medium ${
                    isDark ? 'text-[#F7F3EA] hover:text-[#C9A45C]' : 'text-[#101820] hover:text-[#B08B43]'
                  }`}
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Coupon Code Section */}
              <CouponBox
                subtotal={subtotal}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={(c) => setAppliedCoupon(c)}
                onRemoveCoupon={() => setAppliedCoupon(null)}
              />
            </div>

            {/* Right Column: Sticky Order Summary & Trust Badges (4-5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <OrderSummaryCard
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                tax={tax}
                grandTotal={grandTotal}
                appliedCoupon={appliedCoupon}
                itemCount={cartCount}
              />
            </div>
          </div>
        )}

        {/* 4. Cross-Sell / Recommended Marketplace Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-black/10 dark:border-white/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-1 font-semibold">
                  RECOMMENDED FOR YOU
                </span>
                <h2 className={`font-serif text-2xl sm:text-3xl font-normal ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  You May Also Like
                </h2>
              </div>
              <Link
                to="/shop"
                className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] font-semibold transition-colors hidden sm:block"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal to Clear Cart */}
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsClearModalOpen(false);
        }}
      />

      {/* Mobile Sticky Checkout Bar */}
      {cart.length > 0 && <MobileCheckoutBar grandTotal={grandTotal} />}

      {/* Reusable VIP Newsletter */}
      <div className="mt-16">
        <NewsletterSection />
      </div>
    </main>
  );
};
