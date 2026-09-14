import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Package, Users, Truck, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Sales from './pages/Sales';
import HomePage from './pages/HomePage';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current, 
        { x: -200, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  // Don't render layout on homepage
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <div ref={sidebarRef} className="w-64 bg-white shadow-xl flex flex-col justify-between">
        <div>
          <div className="h-20 flex items-center justify-center border-b border-gray-100">
            <h1 className="text-2xl font-bold text-emerald-600 tracking-wider">GROCERY<span className="text-gray-800">PRO</span></h1>
          </div>
          <nav className="p-4 space-y-2 mt-4">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem to="/products" icon={<Package size={20} />} label="Products" />
            <NavItem to="/customers" icon={<Users size={20} />} label="Customers" />
            <NavItem to="/suppliers" icon={<Truck size={20} />} label="Suppliers" />
            <NavItem to="/sales" icon={<ShoppingCart size={20} />} label="Sales" />
          </nav>
        </div>
        <div className="p-4 text-xs text-center text-gray-400 border-t border-gray-50">
          &copy; 2026 GroceryPro Inc.
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 flex items-center justify-end px-8 shadow-sm">
           <div className="flex items-center space-x-4">
             <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm">
                A
             </div>
             <div>
               <p className="text-sm font-semibold">Admin User</p>
               <p className="text-xs text-gray-500">Manager</p>
             </div>
           </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'}`}
    >
      <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="*" element={<div className="flex h-full items-center justify-center text-gray-400">Page under construction...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
