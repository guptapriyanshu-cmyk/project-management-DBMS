import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, Filter, Edit2, Trash2, Plus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  status: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_URL}/customers`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Fallback dummy data if DB is empty/fails
      setCustomers([
        { id: '1', name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '+91 9876543210', loyaltyPoints: 450, status: 'Active' },
        { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', phone: '+91 9876543211', loyaltyPoints: 120, status: 'Active' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addDummyCustomer = async () => {
    try {
      const dummy = {
        name: 'New Customer ' + Math.floor(Math.random() * 100),
        email: 'customer@example.com',
        phone: '+91 0000000000',
        loyaltyPoints: 100,
        status: 'Active'
      };
      const res = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dummy)
      });
      if (res.ok) fetchCustomers();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
      fetchCustomers();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }
    if (tableRef.current) {
      gsap.fromTo(tableRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
      );
      
      const rows = tableRef.current.querySelectorAll('tbody tr');
      if (rows.length > 0) {
        gsap.fromTo(rows,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.4 }
        );
      }
    }
  }, [customers]);

  return (
    <div className="space-y-6">
      <div ref={headerRef} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your customer relationships</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <button onClick={addDummyCustomer} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all font-medium flex items-center space-x-2 transform hover:-translate-y-0.5">
            <Plus size={18} />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Customer Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Loyalty Points</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400">Loading customers from Database...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400">No customers found. Add some!</td></tr>
              ) : (
                customers.map((customer: any) => (
                  <tr key={customer._id || customer.id} className="border-b border-gray-50 hover:bg-emerald-50/50 transition-colors group">
                    <td className="p-4 font-medium text-gray-800">{customer.name}</td>
                    <td className="p-4 text-gray-600">{customer.email}</td>
                    <td className="p-4 text-gray-600">{customer.phone}</td>
                    <td className="p-4 text-gray-600 font-semibold">{customer.loyaltyPoints}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' : customer.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => deleteCustomer(customer._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;

