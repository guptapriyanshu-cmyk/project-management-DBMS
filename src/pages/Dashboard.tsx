import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Package, Users, ArrowUpRight, IndianRupee, Activity } from 'lucide-react';

const Dashboard = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
    );
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '₹45,231', icon: <IndianRupee size={24} />, color: 'bg-emerald-500', trend: '+12.5%' },
    { label: 'Total Products', value: '1,204', icon: <Package size={24} />, color: 'bg-blue-500', trend: '+3.2%' },
    { label: 'Total Customers', value: '8,439', icon: <Users size={24} />, color: 'bg-purple-500', trend: '+8.1%' },
    { label: 'Total Sales', value: '432', icon: <Activity size={24} />, color: 'bg-orange-500', trend: '+5.4%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">DashboardOverview</h2>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-emerald-200 transition-all font-medium flex items-center space-x-2 transform hover:-translate-y-1">
          <span>Generate Report</span>
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            ref={el => { cardsRef.current[index] = el; }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center text-gray-400 hover:shadow-md transition-shadow">
           {/* Placeholder for Chart */}
           <Activity size={48} className="mb-4 opacity-50 text-emerald-500" />
           <p>Sales Analytics Chart will go here</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
            <IndianRupee size={48} className="mb-4 opacity-50 text-emerald-500" />
            <p>Transaction list will go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
