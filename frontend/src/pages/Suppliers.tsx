import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, Filter, Edit2, Trash2, ExternalLink } from 'lucide-react';

interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  category: string;
  rating: number;
  deliveryTime: string;
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock data for suppliers
    setSuppliers([
      { id: '1', companyName: 'Green Farms Ltd', contactPerson: 'Ramesh Singh', category: 'Fruits & Veg', rating: 4.8, deliveryTime: '24 hrs' },
      { id: '2', companyName: 'Daily Bake', contactPerson: 'Sunita Sharma', category: 'Bakery', rating: 4.5, deliveryTime: '12 hrs' },
      { id: '3', companyName: 'Nutty Co.', contactPerson: 'David Miller', category: 'Dairy & Nuts', rating: 4.9, deliveryTime: '48 hrs' },
      { id: '4', companyName: 'Spice Route', contactPerson: 'Anjali Desai', category: 'Spices', rating: 4.2, deliveryTime: '3-5 days' },
      { id: '5', companyName: 'Aqua Pure', contactPerson: 'John Doe', category: 'Beverages', rating: 4.7, deliveryTime: '24 hrs' },
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
  }, [suppliers]);

  return (
    <div className="space-y-6">
      <div ref={headerRef} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Suppliers</h2>
          <p className="text-gray-500 text-sm mt-1">Manage vendor partnerships and logistics</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Company Name</th>
                <th className="p-4 font-medium">Contact Person</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Avg Delivery</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-50 hover:bg-emerald-50/50 transition-colors group">
                  <td className="p-4 font-medium text-gray-800">{supplier.companyName}</td>
                  <td className="p-4 text-gray-600">{supplier.contactPerson}</td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">{supplier.category}</span>
                  </td>
                  <td className="p-4 text-gray-600 flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{supplier.rating.toFixed(1)}</span>
                  </td>
                  <td className="p-4 text-gray-600">{supplier.deliveryTime}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><ExternalLink size={16} /></button>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={16} /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
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

export default Suppliers;
