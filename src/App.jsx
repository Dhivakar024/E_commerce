import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastNotification } from './components/shop/ToastNotification';

// Customer Storefront Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { OrderDetails } from './pages/OrderDetails';
import { Account } from './pages/Account';
import { SearchPage } from './pages/Search';
import { Collections } from './pages/Collections';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { LegalPage } from './pages/Legal';
import { NotFound } from './pages/NotFound';

// Customer Auth Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

// Admin Portal Pages & Layout
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminBanners } from './pages/admin/AdminBanners';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AppContent = () => {
  const { pathname } = useLocation();
  const isCheckoutPage = pathname === '/checkout';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-luxury-black text-luxury-cream selection:bg-luxury-gold/30 selection:text-white">
      <ScrollToTop />

      {/* Global Floating Toast Notifications */}
      <ToastNotification />

      {/* Sticky Glassmorphic Navbar (Hidden on distraction-free Checkout and Admin Portal) */}
      {!isCheckoutPage && !isAdminRoute && <Navbar />}

      {/* Main Content Viewport */}
      <div className="flex-grow">
        <Routes>
          {/* Customer Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/women" element={<Shop categoryName="Women" />} />
          <Route path="/shop/men" element={<Shop categoryName="Men" />} />
          <Route path="/shop/new-arrivals" element={<Shop categoryName="New Arrivals" />} />
          <Route path="/shop/accessories" element={<Shop categoryName="Accessories" />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />

          {/* Customer Account Routes */}
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Account />} />
          <Route path="/account/orders/:orderId" element={<OrderDetails />} />
          <Route path="/account/addresses" element={<Account />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Editorial & Information Routes */}
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/shipping" element={<LegalPage />} />
          <Route path="/returns" element={<LegalPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Portal Layout & Subroutes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="banners" element={<AdminBanners />} />
          </Route>

          {/* 404 Wildcard */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Luxury 5-Column Footer (Hidden on distraction-free Checkout and Admin Portal) */}
      {!isCheckoutPage && !isAdminRoute && <Footer />}
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ShopProvider>
          <AppContent />
        </ShopProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
