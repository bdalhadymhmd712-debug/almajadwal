import React, { useState } from 'react';
import { HiSave } from 'react-icons/hi';
import api from '../services/api';

const SchoolScheduleForm = () => {
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  
  // حالة لتخزين بيانات الجدول
  const [schedule, setSchedule] = useState({});

  // دالة لتحديث قيمة الخانة
  const handleInputChange = (day, periodIndex, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [`period-${periodIndex}`]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return alert('يرجى تسجيل الدخول أولاً');

  try {
    await api.post('/users/schedules', {
      userId: user.id,
      type: 'school',
      data: schedule
    });
    alert('تم حفظ جدول الحصص في قاعدة البيانات! ✅');
  } catch (error) {
    alert('حدث خطأ أثناء الحفظ: ' + (error.response?.data?.message || error.message));
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {days.map((day) => (
        <div key={day} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-5">
          {/* عنوان اليوم */}
          <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            {day}
          </h3>
          
          {/* شبكة الـ 8 خانات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((period) => (
              <input
                key={period}
                type="text"
                placeholder={`الحصة ${period}`}
                value={schedule[day]?.[`period-${period}`] || ''}
                onChange={(e) => handleInputChange(day, period, e.target.value)}
                className="bg-slate-800 border border-slate-600 text-white rounded-lg py-3 px-4 text-center focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500 text-sm"
              />
            ))}
          </div>
        </div>
      ))}

      {/* زر الحفظ */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-6"
      >
        <HiSave size={22} />
        حفظ جدول الحصص
      </button>
    </form>
  );
};

export default SchoolScheduleForm;