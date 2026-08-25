import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext(undefined);

export const ShopProvider = ({ children }) => {
  // 1. Initialize Cart with localStorage persistence & basic validation
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lax360_cart') || localStorage.getItem('elan_atelier_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item) => item && item.product && item.quantity > 0);
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // 2. Initialize Wishlist with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lax360_wishlist') || localStorage.getItem('elan_atelier_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // 3. Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('lax360_applied_coupon') || localStorage.getItem('elan_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // 5. Toast notifications
  const [toasts, setToasts] = useState([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lax360_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lax360_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Sync applied coupon to localStorage
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('lax360_applied_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('lax360_applied_coupon');
      }
    } catch (e) {
      console.warn('Could not save coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to cart with duplicate merging
  const addToCart = (
    product,
    quantity = 1,
    selectedSize = undefined,
    selectedColor = undefined
  ) => {
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const color = selectedColor || product.colors?.[0] || 'Default';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(product.stock, updated[existingIndex].quantity + quantity);
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        const newQty = Math.min(product.stock, quantity);
        return [...prev, { product, quantity: newQty, selectedSize: size, selectedColor: color }];
      }
    });

    showToast(`${product.name} added to your bag.`);
  };

  const removeFromCart = (
    productId,
    selectedSize = undefined,
    selectedColor = undefined
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!selectedSize || item.selectedSize === selectedSize) &&
            (!selectedColor || item.selectedColor === selectedColor)
          )
      )
    );
    showToast('Item removed from your cart.', 'info');
  };

  const updateQuantity = (
    productId,
    quantity,
    selectedSize = undefined,
    selectedColor = undefined
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (!selectedSize || item.selectedSize === selectedSize) &&
          (!selectedColor || item.selectedColor === selectedColor)
        ) {
          const clampedQty = Math.min(item.product.stock, quantity);
          if (quantity > item.product.stock) {
            showToast(`Only ${item.product.stock} units available in stock.`, 'info');
          }
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const moveToWishlist = (
    productId,
    selectedSize = undefined,
    selectedColor = undefined
  ) => {
    setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));

    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!selectedSize || item.selectedSize === selectedSize) &&
            (!selectedColor || item.selectedColor === selectedColor)
          )
      )
    );

    showToast('Moved to wishlist.', 'success');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    showToast('Your cart has been cleared.', 'info');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.product?.price ?? item.price ?? 0) * item.quantity,
    0
  );

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved items.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Quick View actions
  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToWishlist,
        clearCart,
        cartCount,
        cartTotal,
        appliedCoupon,
        setAppliedCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
