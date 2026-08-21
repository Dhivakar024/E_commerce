import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/index';
import { Search, Mail, Phone } from 'lucide-react';

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState([
    {
      _id: 'cust-1',
      firstName: 'Eleanor',
      lastName: 'Vance',
      email: 'eleanor@vance.com',
      phone: '9876543210',
      orderCount: 3,
      totalSpent: 42490,
      createdAt: '2026-01-14T00:00:00.000Z',
    },
    {
      _id: 'cust-2',
      firstName: 'Julian',
      lastName: 'Sterling',
      email: 'julian@sterling.com',
      phone: '9876543211',
      orderCount: 2,
      totalSpent: 20498,
      createdAt: '2026-02-02T00:00:00.000Z',
    },
    {
      _id: 'cust-3',
      firstName: 'Dhivakar',
      lastName: 'Kumar',
      email: 'customer@lax360.com',
      phone: '9876543212',
      orderCount: 1,
      totalSpent: 16898,
      createdAt: '2026-03-10T00:00:00.000Z',
    },
    {
      _id: 'cust-4',
      firstName: 'Sophia',
      lastName: 'Laurent',
      email: 'sophia@laurent.com',
      phone: '9876543213',
      orderCount: 4,
      totalSpent: 64990,
      createdAt: '2026-04-05T00:00:00.000Z',
    },
  ]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await adminService.getCustomers();
        if (res.success && res.data?.length) {
          setCustomers(res.data);
        }
      } catch (e) {}
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
            CLIENT DIRECTORY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Private Client Registry ({customers.length})
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="bg-luxury-black p-4 border border-white/10 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patron by name, email..."
            className="w-full bg-white/5 border border-white/10 py-2 pl-9 pr-3 text-white focus:outline-none focus:border-luxury-gold/50"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-luxury-black border border-white/10 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-luxury-muted border-b border-white/10 bg-white/5">
            <tr>
              <th className="py-3 px-4 font-medium">Client Patron</th>
              <th className="py-3 px-4 font-medium">Contact Details</th>
              <th className="py-3 px-4 font-medium">Total Orders</th>
              <th className="py-3 px-4 font-medium">Lifetime Spend</th>
              <th className="py-3 px-4 font-medium">Membership Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCustomers.map((c) => (
              <tr key={c._id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="text-white font-medium block">{c.firstName} {c.lastName}</span>
                  <span className="text-[10px] text-luxury-muted">
                    Joined {new Date(c.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="space-y-0.5">
                    <span className="text-luxury-cream/80 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-luxury-muted" />
                      {c.email}
                    </span>
                    {c.phone && (
                      <span className="text-[10px] text-luxury-muted flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-luxury-muted" />
                        +91 {c.phone}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-white font-mono">
                  {c.orderCount || 1} orders
                </td>

                <td className="py-3.5 px-4 font-serif text-luxury-champagne font-medium">
                  ₹{(c.totalSpent || 0).toLocaleString('en-IN')}
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-[10px] uppercase tracking-wider bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 px-2 py-0.5 font-medium">
                    Private Élite
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
