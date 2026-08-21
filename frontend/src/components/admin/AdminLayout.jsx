import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  Boxes,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
} from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Categories', path: '/admin/categories', icon: Layers },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', path: '/admin/customers', icon: Users },
  { label: 'Coupons', path: '/admin/coupons', icon: Tag },
  { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
  { label: 'Banners', path: '/admin/banners', icon: ImageIcon },
];

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If not authenticated or not admin, redirect to admin login
  if (!isAuthenticated || !isAdmin) {
    navigate(`/admin/login?redirect=${encodeURIComponent(location.pathname)}`);
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-luxury-cream flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-luxury-black border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-luxury-gold" />
          <span className="font-cinzel text-sm font-semibold tracking-widest text-white">
            LAX360 ADMIN
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-luxury-muted hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-luxury-black border-r border-white/10 p-6 flex flex-col justify-between z-40 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Logo & Portal Badge */}
          <div>
            <Link to="/" className="group flex items-center gap-2">
              <div className="flex flex-col">
                <span className="font-cinzel text-lg tracking-[0.25em] font-semibold text-white">
                  LAX360
                </span>
                <span className="text-[8px] uppercase tracking-ultra text-luxury-gold font-light">
                  PVT LTD MANAGEMENT
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isExact = item.path === '/admin';
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={isExact}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 text-xs tracking-wider uppercase transition-colors rounded-none ${
                      isActive
                        ? 'bg-white/10 text-white font-medium border-l-2 border-luxury-gold'
                        : 'text-luxury-muted hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4 h-4 text-luxury-gold opacity-80" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Bar & Storefront Link */}
        <div className="space-y-4 pt-6 border-t border-white/10 text-xs">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-luxury-muted hover:text-white transition-colors p-2 bg-white/5"
          >
            <span className="text-[11px] uppercase tracking-wider">Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="min-w-0">
              <span className="text-white font-medium block truncate text-[11px]">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-[10px] text-luxury-gold block uppercase tracking-wider">
                Director
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-luxury-muted hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
