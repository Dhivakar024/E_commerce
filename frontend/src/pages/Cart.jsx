import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
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
    <main className="w-full bg-[#F7F3EA] text-[#101820] min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* 1. Header & Breadcrumbs */}
        <CartHeader itemCount={cartCount} />

        {cart.length === 0 ? (
          /* 2. Empty Cart State */
          <CartEmptyState />
        ) : (
          /* 3. Active Cart Layout: 2-Column Desktop Grid / Vertical Mobile */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
            {/* Left Column: Items, Shipping Banner, Coupon & Toolbar (7-8 Cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Dynamic Free Shipping Threshold Banner */}
              <ShippingInfoBanner subtotal={subtotal} />

              {/* Cart Items List */}
              <div className="bg-white border border-black/10 p-4 sm:p-6 divide-y divide-black/10 shadow-sm">
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

              {/* Cart Toolbar: Continue Shopping & Clear Cart */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/shop"
                  className="text-xs uppercase tracking-widest text-[#101820] hover:text-[#C9A45C] font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>← Continue Shopping</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsClearModalOpen(true)}
                  className="text-xs uppercase tracking-wider text-[#A9B0B5] hover:text-rose-600 transition-colors cursor-pointer font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {/* Coupon Box on Mobile/Tablet or Left Column */}
              <div className="pt-4">
                <CouponBox
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={(coupon) => setAppliedCoupon(coupon)}
                  onRemoveCoupon={() => setAppliedCoupon(null)}
                />
              </div>
            </div>

            {/* Right Column: Sticky Order Summary (4-5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <OrderSummaryCard
                items={cart}
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                tax={tax}
                grandTotal={grandTotal}
                appliedCoupon={appliedCoupon}
              />
            </div>
          </div>
        )}

        {/* 4. Recommended Products ("You May Also Like") */}
        {recommendedProducts.length > 0 && (
          <section className="pt-16 border-t border-black/10 mb-20 animate-fade-in">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
                  CURATED FOR YOU
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#101820] font-normal">
                  You May Also Like
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#101820] transition-colors font-semibold"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Checkout Bar */}
      <MobileCheckoutBar grandTotal={grandTotal} items={cart} />

      {/* Clear Cart Confirmation Modal */}
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearCart}
      />

      {/* VIP Newsletter */}
      <NewsletterSection />
    </main>
  );
};
