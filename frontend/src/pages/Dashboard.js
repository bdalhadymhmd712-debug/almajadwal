import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { HiPlusCircle } from 'react-icons/hi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      history.push('/login');
    }
  }, [history]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <Sidebar />
      
      <div className="p-6 pt-24 max-w-4xl mx-auto">
        {/* الترحيب */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">مرحباً، {user.username} 👋</h1>
          <p className="text-slate-400 text-lg">لوحة التحكم</p>
        </div>

        {/* بطاقة إنشاء الجدول (تأخذ كامل العرض) */}
        <button
          onClick={() => history.push('/create-schedule')}
          className="w-full bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all transform hover:scale-[1.02] group border border-purple-500/20"
        >
          <div className="bg-white/20 p-6 rounded-2xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
            <HiPlusCircle size={60} color="white" />
          </div>
          <div className="text-center">
            <span className="font-bold text-2xl block mb-1">إنشاء جدول جديد</span>
            <span className="text-purple-100 text-sm">اضغط هنا لبدء إنشاء جدولك الدراسي</span>
          </div>
        </button>

        {/* باقي محتوى اللوحة يمكن إضافته هنا لاحقاً */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">📊 إحصائيات سريعة</h3>
            <p className="text-slate-400">سيتم عرض الإحصائيات هنا قريباً...</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">📅 الجداول المحفوظة</h3>
            <p className="text-slate-400">سيتم عرض جداولك هنا قريباً...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;