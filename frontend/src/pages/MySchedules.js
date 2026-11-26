import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { HiTrash, HiCalendar, HiAcademicCap, HiClipboardList } from 'react-icons/hi';

const MySchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    
    console.log('🔍 User in LocalStorage:', userStr);

    if (!userStr) {
      history.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      console.log('🆔 Fetching schedules for userId:', user.id);
      fetchSchedules(user.id);
    } catch (error) {
      console.error('❌ Error parsing user data:', error);
      history.push('/login');
    }
  }, [history]);

  const fetchSchedules = async (userId) => {
    try {
      const url = `/users/schedules/${userId}`;
      console.log('🌐 Calling API:', url);

      const response = await api.get(url);
      console.log('📥 API Response:', response.data);

      if (response.data.success) {
        setSchedules(response.data.schedules);
        console.log(`✅ Found ${response.data.schedules.length} schedules`);
      } else {
        console.warn('⚠️ API returned success: false');
      }
    } catch (error) {
      console.error('❌ Error fetching schedules:', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation(); // منع فتح التفاصيل عند النقر على زر الحذف
    if (!window.confirm('هل أنت متأكد من حذف هذا الجدول؟')) return;
    
    try {
      await api.delete(`/users/schedules/${id}`);
      setSchedules(schedules.filter(s => s._id !== id));
      alert('تم حذف الجدول بنجاح ✅');
    } catch (error) {
      alert('فشل في حذف الجدول');
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'school': return { text: 'حصص (مدرسة)', icon: HiClipboardList, color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'university': return { text: 'محاضرات (جامعة)', icon: HiAcademicCap, color: 'text-blue-400', bg: 'bg-blue-500/20' };
      default: return { text: 'آخر', icon: HiCalendar, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'تاريخ غير معروف';
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <Sidebar />
      
      <div className="p-6 pt-24 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">جداولي المحفوظة 📚</h1>
          <p className="text-slate-400">جميع الجداول التي قمت بإنشائها</p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg animate-pulse">جاري تحميل الجداول...</p>
          </div>
        )}

        {!loading && schedules.length === 0 && (
          <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-12 text-center">
            <HiCalendar className="mx-auto text-slate-500 mb-4" size={60} />
            <h3 className="text-xl font-bold text-slate-300 mb-2">لا توجد جداول محفوظة</h3>
            <p className="text-slate-500 mb-6">ابدأ بإنشاء جدولك الأول الآن!</p>
            <button
              onClick={() => history.push('/create-schedule')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              إنشاء جدول جديد
            </button>
          </div>
        )}

        {!loading && schedules.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules.map((schedule) => {
              const typeInfo = getTypeLabel(schedule.type);
              const TypeIcon = typeInfo.icon;
              
              return (
                <div 
                  key={schedule._id}
                  onClick={() => history.push(`/schedule/${schedule._id}`)}
                  className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${typeInfo.bg}`}>
                      <TypeIcon size={28} className={typeInfo.color} />
                    </div>
                    <button
                      onClick={(e) => handleDelete(schedule._id, e)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="حذف الجدول"
                    >
                      <HiTrash size={20} />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{typeInfo.text}</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    تم الإنشاء: {formatDate(schedule.createdAt)}
                  </p>

                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">عدد الأيام المسجلة:</p>
                    <p className="text-lg font-bold text-purple-400">
                      {schedule.data ? Object.keys(schedule.data).length : 0} أيام
                    </p>
                  </div>

                  {/* مؤشر بصري للفتح */}
                  <div className="mt-4 text-center">
                    <span className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                      اضغط لعرض التفاصيل ←
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySchedules;