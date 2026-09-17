import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Plus, Search, Filter, Edit2, Trash2 } from 'lucide-react';

import Modal from '../components/Modal';

interface Product {
  _id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProduct = async (data: any) => {
    try {
      // Ensure numeric fields are parsed correctly
      const payload = { ...data, price: Number(data.price), stock: Number(data.stock) };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadProducts();
    
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
  }, []);

  return (
    <div className="space-y-6">
      <div ref={headerRef} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your store's inventory (MongoDB Atlas Backend)</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all font-medium flex items-center space-x-2 transform hover:-translate-y-0.5">
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Supplier</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400">No products found. Add some!</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-emerald-50/50 transition-colors group">
                    <td className="p-4 font-medium text-gray-800">{product.name}</td>
                    <td className="p-4 text-gray-600">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">{product.category}</span>
                    </td>
                    <td className="p-4 text-gray-600">₹{product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${product.stock > 50 ? 'bg-emerald-100 text-emerald-700' : product.stock > 30 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{product.supplier}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => product._id && deleteProduct(product._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
        title="Add New Product"
        fields={[
          { name: 'name', label: 'Product Name', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'price', label: 'Price (₹)', type: 'number' },
          { name: 'stock', label: 'Stock Quantity', type: 'number' },
          { name: 'supplier', label: 'Supplier Name', type: 'text' },
        ]}
      />
    </div>
  );
};

export default Products;
