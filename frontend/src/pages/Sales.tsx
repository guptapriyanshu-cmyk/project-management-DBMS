import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, Filter, Eye, Download } from 'lucide-react';

interface Sale {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  date: string;
  status: string;
}

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock data for sales
    setSales([
      { id: '1', orderId: 'ORD-8901', customerName: 'Rahul Sharma', amount: 1250.50, date: '2026-09-15', status: 'Completed' },
      { id: '2', orderId: 'ORD-8902', customerName: 'Amit Kumar', amount: 340.00, date: '2026-09-15', status: 'Processing' },
      { id: '3', orderId: 'ORD-8903', customerName: 'Priya Patel', amount: 890.75, date: '2026-09-14', status: 'Completed' },
      { id: '4', orderId: 'ORD-8904', customerName: 'Sneha Gupta', amount: 45.00, date: '2026-09-14', status: 'Refunded' },
      { id: '5', orderId: 'ORD-8905', customerName: 'Vikram Singh', amount: 2100.00, date: '2026-09-13', status: 'Completed' },
      { id: '6', orderId: 'ORD-8906', customerName: 'John Doe', amount: 150.25, date: '2026-09-13', status: 'Completed' },
    ]);
  }, []);

  useEffect(() => {
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
  }, [sales]);

  return (
    <div className="space-y-6">
      <div ref={headerRef} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sales & Orders</h2>
          <p className="text-gray-500 text-sm mt-1">Track revenue and order fulfillment</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-50 hover:bg-emerald-50/50 transition-colors group">
                  <td className="p-4 font-medium text-gray-800">{sale.orderId}</td>
                  <td className="p-4 text-gray-600">{sale.customerName}</td>
                  <td className="p-4 text-gray-600 font-semibold">₹{sale.amount.toFixed(2)}</td>
                  <td className="p-4 text-gray-500">{sale.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${sale.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : sale.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Eye size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
