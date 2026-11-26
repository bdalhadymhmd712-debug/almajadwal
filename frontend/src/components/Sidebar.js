import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiUser, 
  HiPlusCircle, 
  HiShieldCheck, 
  HiLogout, 
  HiMenu, 
  HiX,
  HiClipboardList // <-- تم إضافة هذه الأيقونة
} from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { name: 'الرئيسية', icon: HiHome, path: '/dashboard', color: 'bg-blue-500' },
    { name: 'الملف الشخصي', icon: HiUser, path: '/profile', color: 'bg-indigo-500' },
    { name: 'إنشاء جدول', icon: HiPlusCircle, path: '/create-schedule', color: 'bg-green-500' },
    { name: 'جداولي', icon: HiClipboardList, path: '/my-schedules', color: 'bg-pink-500' },
    { name: 'حقوق الملكية', icon: HiShieldCheck, path: '/copyright', color: 'bg-yellow-500' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <>
      {/* زر فتح القائمة */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 bg-purple-600 p-3 rounded-xl shadow-lg shadow-purple-500/30 hover:bg-purple-500 transition-all"
      >
        {isOpen ? <HiX size={24} color="white" /> : <HiMenu size={24} color="white" />}
      </button>

      {/* القائمة الجانبية */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-24 flex flex-col h-full">
          {/* عناصر القائمة */}
          <div className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : item.color}`}>
                    <item.icon size={22} color="white" />
                  </div>
                  <span className="font-semibold text-lg">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* زر تسجيل الخروج */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all mt-4 border border-red-500/20"
          >
            <div className="p-2 rounded-lg bg-red-500/20">
              <HiLogout size={22} />
            </div>
            <span className="font-semibold text-lg">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* طبقة التعتيم */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;