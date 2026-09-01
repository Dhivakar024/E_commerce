import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { orderService } from '../services/orderService';
import { addressService } from '../services/index';
import { ALL_PRODUCTS } from '../data/products';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
} from 'lucide-react';
import { PrivacyConsent } from '../components/common/PrivacyConsent';

export const Account = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') || 'profile';

  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { wishlist, showToast } = useShop();

  const [activeTab, setActiveTab] = useState(activeTabParam);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  // Orders State
  const [orders, setOrders] = useState([]);

  // Addresses State
  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [hasReadAddressPrivacy, setHasReadAddressPrivacy] = useState(false);
  const [acknowledgedAddressPrivacy, setAcknowledgedAddressPrivacy] = useState(false);
  const [addressPrivacyError, setAddressPrivacyError] = useState('');
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/account');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getUserOrders();
        if (res.success && res.data) {
          setOrders(res.data);
        }
      } catch {
        try {
          const localOrders = localStorage.getItem('elan_orders');
          if (localOrders) {
            setOrders(JSON.parse(localOrders));
          }
        } catch (e) {
          console.warn('Orders fallback error', e);
        }
      }
    };

    fetchOrders();
  }, []);

  // Load saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await addressService.getAddresses();
        if (res.success && res.data) {
          setAddresses(res.data);
        }
      } catch {
        try {
          const localAddr = localStorage.getItem('elan_saved_address');
          if (localAddr) {
            setAddresses([{ ...JSON.parse(localAddr), _id: 'local-addr-1', isDefault: true }]);
          }
        } catch (e) {
          console.warn('Addresses fallback error', e);
        }
      }
    };

    fetchAddresses();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      setIsEditingProfile(false);
      showToast('Profile information updated.', 'success');
    } catch {
      showToast('Profile updated.', 'success');
      setIsEditingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressPrivacyError('');

    if (!hasReadAddressPrivacy || !acknowledgedAddressPrivacy) {
      setAddressPrivacyError('Please read and acknowledge the Privacy Notice before saving your address.');
      return;
    }

    try {
      const res = await addressService.addAddress(addressForm);
      if (res.success && res.data) {
        setAddresses((prev) => [res.data, ...prev]);
      } else {
        const newAddr = { ...addressForm, _id: `addr-${Date.now()}` };
        setAddresses((prev) => [newAddr, ...prev]);
        localStorage.setItem('elan_saved_address', JSON.stringify(addressForm));
      }
      setIsAddingAddress(false);
      setHasReadAddressPrivacy(false);
      setAcknowledgedAddressPrivacy(false);
      showToast('Address added to your address book.', 'success');
    } catch {
      const newAddr = { ...addressForm, _id: `addr-${Date.now()}` };
      setAddresses((prev) => [newAddr, ...prev]);
      localStorage.setItem('lax360_saved_address', JSON.stringify(addressForm));
      setIsAddingAddress(false);
      setHasReadAddressPrivacy(false);
      setAcknowledgedAddressPrivacy(false);
      showToast('Address added to your address book.', 'success');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await addressService.deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      localStorage.removeItem('elan_saved_address');
      showToast('Address removed.', 'info');
    } catch {
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      localStorage.removeItem('elan_saved_address');
      showToast('Address removed.', 'info');
    }
  };

  const wishlistedItems = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (!user) return null;

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-22 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Welcome Header */}
        <div className="pb-4 border-b border-white/10 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block mb-1 font-medium">
              CLIENT SUITE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Bonjour, {user.firstName} {user.lastName}
            </h1>
            <p className="text-xs text-luxury-muted font-light mt-1">
              Member since 2026 • {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-luxury-muted hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Navigation Tabs Sidebar */}
          <aside className="lg:col-span-3 space-y-1">
            <nav className="bg-luxury-charcoal/30 border border-white/10 divide-y divide-white/5">
              {[
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, badge: wishlist.length },
                { id: 'settings', label: 'Account Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full px-5 py-4 flex items-center justify-between text-xs transition-colors text-left ${
                      isActive
                        ? 'bg-white/10 text-white font-medium border-l-2 border-luxury-gold'
                        : 'text-luxury-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-luxury-gold' : 'text-luxury-muted'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-luxury-champagne">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right: Active Tab Viewport */}
          <section className="lg:col-span-9">
            {/* 1. Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-serif text-xl text-white font-normal">Personal Information</h3>
                    <p className="text-xs text-luxury-muted">Manage your personal credentials and contact details.</p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-xs uppercase tracking-wider text-luxury-champagne hover:text-white flex items-center gap-1.5 transition-colors border border-white/15 px-3 py-1.5 bg-white/5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileSave} className="space-y-4 text-xs max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">First Name</label>
                        <input
                          type="text"
                          value={profileForm.firstName}
                          onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3 py-2 text-xs focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">Last Name</label>
                        <input
                          type="text"
                          value={profileForm.lastName}
                          onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3 py-2 text-xs focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-luxury-cream uppercase tracking-wider text-[11px] block">Mobile Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="btn-shine px-6 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider font-medium text-xs"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 uppercase tracking-wider font-medium text-xs text-luxury-cream"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div className="space-y-1">
                      <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Full Name</span>
                      <span className="text-white font-medium text-sm">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Email Address</span>
                      <span className="text-white font-medium text-sm">{user.email}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Mobile Phone</span>
                      <span className="text-white font-medium text-sm">{user.phone ? `+91 ${user.phone}` : 'Not provided'}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-luxury-muted block uppercase tracking-wider text-[10px]">Account Tier</span>
                      <span className="text-luxury-gold font-medium text-sm uppercase tracking-wider">LAX360 Verified Member</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Orders Tab */}
            {activeTab === 'orders' && (
              <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6 animate-fade-in">
                <div className="pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-white font-normal">Order History</h3>
                  <p className="text-xs text-luxury-muted">View past shipments, status timelines, and official invoices.</p>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.orderNumber || order.id}
                        className="p-5 bg-white/5 border border-white/10 space-y-4 hover:border-white/20 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2 text-xs">
                          <div className="space-y-0.5">
                            <span className="text-luxury-gold font-mono font-medium">{order.orderNumber}</span>
                            <span className="text-luxury-muted block text-[11px]">
                              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                              {order.status || 'Order Confirmed'}
                            </span>
                            <span className="font-serif text-sm text-white font-medium">
                              ₹{order.total?.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3 overflow-x-auto py-1">
                            {order.items?.slice(0, 3).map((item, idx) => (
                              <img
                                key={idx}
                                src={item.product?.image || item.image}
                                alt={item.product?.name || item.name}
                                className="w-12 h-14 object-cover border border-white/10 bg-neutral-900 flex-shrink-0"
                              />
                            ))}
                            {order.items?.length > 3 && (
                              <span className="text-xs text-luxury-muted font-mono">
                                +{order.items.length - 3} more
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/account/orders/${order.orderNumber || order.id}`}
                            className="btn-shine px-4 py-2 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-[11px] font-medium transition-all flex items-center gap-1.5 flex-shrink-0"
                          >
                            <span>Track & Invoice</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <Package className="w-10 h-10 text-luxury-muted mx-auto stroke-1" />
                    <p className="text-xs text-luxury-muted">You have not placed any orders yet.</p>
                    <Link
                      to="/shop"
                      className="btn-shine inline-block px-6 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium"
                    >
                      Shop the Collection
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* 3. Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-serif text-xl text-white font-normal">Saved Addresses</h3>
                    <p className="text-xs text-luxury-muted">Manage your primary shipping destinations for express checkout.</p>
                  </div>
                  {!isAddingAddress && (
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="btn-shine px-4 py-2 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Address</span>
                    </button>
                  )}
                </div>

                {isAddingAddress ? (
                  <form onSubmit={handleAddAddress} className="space-y-4 text-xs max-w-lg bg-white/5 p-6 border border-white/10">
                    <h4 className="font-serif text-base text-white">New Shipping Address</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={addressForm.firstName}
                        onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                        className="bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name *"
                        value={addressForm.lastName}
                        onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                        className="bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address Line 1 *"
                      value={addressForm.addressLine1}
                      onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                      required
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="City *"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State *"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="PIN Code *"
                        value={addressForm.pinCode}
                        onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })}
                        className="bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>

                    {/* DPDP Privacy Notice Acknowledgement */}
                    <PrivacyConsent
                      id="account-address-privacy"
                      acknowledged={acknowledgedAddressPrivacy}
                      onChange={(checked) => {
                        setAcknowledgedAddressPrivacy(checked);
                        if (addressPrivacyError) setAddressPrivacyError('');
                      }}
                      hasRead={hasReadAddressPrivacy}
                      onReadChange={setHasReadAddressPrivacy}
                      error={addressPrivacyError}
                      className="pt-1 pb-1"
                    />

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={!hasReadAddressPrivacy || !acknowledgedAddressPrivacy}
                        className={`btn-shine px-6 py-2 font-medium transition-all ${
                          !hasReadAddressPrivacy || !acknowledgedAddressPrivacy
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50'
                            : 'bg-white text-luxury-black cursor-pointer'
                        }`}
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setHasReadAddressPrivacy(false);
                          setAcknowledgedAddressPrivacy(false);
                          setAddressPrivacyError('');
                        }}
                        className="px-6 py-2 bg-white/5 border border-white/15 text-white cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : addresses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className="p-5 bg-white/5 border border-white/10 space-y-3 relative text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white text-sm">
                            {addr.firstName} {addr.lastName}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 uppercase tracking-wider font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-luxury-cream/80 font-light space-y-0.5">
                          <p>{addr.addressLine1} {addr.addressLine2}</p>
                          <p>{addr.city}, {addr.state} – {addr.pinCode}</p>
                          <p className="text-luxury-muted">+91 {addr.phone}</p>
                        </div>
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="text-luxury-muted hover:text-rose-400 text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <MapPin className="w-10 h-10 text-luxury-muted mx-auto stroke-1" />
                    <p className="text-xs text-luxury-muted">No shipping addresses saved yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* 4. Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-serif text-xl text-white font-normal">Saved Wishlist Pieces</h3>
                    <p className="text-xs text-luxury-muted">Items reserved in your private styling collection.</p>
                  </div>
                  <Link
                    to="/wishlist"
                    className="text-xs uppercase tracking-wider text-luxury-champagne hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Full View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {wishlistedItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {wishlistedItems.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="group p-3 bg-white/5 border border-white/10 space-y-2 block hover:border-white/20 transition-all"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="text-xs">
                          <span className="font-serif text-white font-medium block truncate group-hover:text-luxury-champagne transition-colors">
                            {p.name}
                          </span>
                          <span className="text-luxury-muted block">₹{p.price?.toLocaleString('en-IN')}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <Heart className="w-10 h-10 text-luxury-muted mx-auto stroke-1" />
                    <p className="text-xs text-luxury-muted">Your wishlist is currently empty.</p>
                    <Link
                      to="/shop"
                      className="btn-shine inline-block px-6 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-wider text-xs font-medium"
                    >
                      Explore Collection
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* 5. Settings Tab */}
            {activeTab === 'settings' && (
              <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6 animate-fade-in text-xs">
                <div className="pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl text-white font-normal">Account & Security</h3>
                  <p className="text-xs text-luxury-muted">Manage your security settings and private credentials.</p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                    <span className="font-medium text-white block">Password & Credentials</span>
                    <p className="text-luxury-muted leading-relaxed">
                      To ensure maximum confidentiality, credentials can be reset using our one-time verification link.
                    </p>
                    <Link
                      to="/forgot-password"
                      className="inline-block text-luxury-champagne hover:text-white underline underline-offset-4 uppercase tracking-wider text-[11px] pt-1"
                    >
                      Request Password Reset →
                    </Link>
                  </div>

                  <div className="p-4 bg-rose-950/20 border border-rose-500/20 space-y-2">
                    <span className="font-medium text-rose-300 block">End Active Session</span>
                    <p className="text-luxury-muted leading-relaxed">
                      Sign out of your account on this device.
                    </p>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/login');
                      }}
                      className="px-4 py-2 bg-rose-900/60 hover:bg-rose-800 text-rose-100 uppercase tracking-wider text-[11px] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
