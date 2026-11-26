import React, { useState } from 'react';
import { HiSave, HiClock } from 'react-icons/hi';
import api from '../services/api';

const UniversityScheduleForm = () => {
  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  
  // حالة لتخزين بيانات الجدول
  const [schedule, setSchedule] = useState({});

  // دالة لتحديث قيمة أي حقل
  const handleInputChange = (day, lectureIndex, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [`lecture-${lectureIndex}-${field}`]: value
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
      type: 'university',
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
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {day}
          </h3>
          
          {/* شبكة الـ 3 محاضرات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((lecture) => (
              <div key={lecture} className="bg-slate-800/80 border border-slate-600 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-slate-300 text-center">المحاضرة {lecture}</p>
                
                {/* اسم المادة */}
                <input
                  type="text"
                  placeholder="اسم المادة"
                  value={schedule[day]?.[`lecture-${lecture}-subject`] || ''}
                  onChange={(e) => handleInputChange(day, lecture, 'subject', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2 px-3 text-center focus:outline-none focus:border-blue-500 transition-all placeholder-slate-500 text-sm"
                />
                
                {/* وقت البداية والنهاية */}
                <div className="flex items-center gap-2">
                  <HiClock size={16} className="text-slate-400 shrink-0" />
                  <input
                    type="time"
                    value={schedule[day]?.[`lecture-${lecture}-start`] || ''}
                    onChange={(e) => handleInputChange(day, lecture, 'start', e.target.value)}
                    className="w-1/2 bg-slate-900 border border-slate-700 text-white rounded-lg py-2 px-2 text-center focus:outline-none focus:border-blue-500 transition-all text-xs"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="time"
                    value={schedule[day]?.[`lecture-${lecture}-end`] || ''}
                    onChange={(e) => handleInputChange(day, lecture, 'end', e.target.value)}
                    className="w-1/2 bg-slate-900 border border-slate-700 text-white rounded-lg py-2 px-2 text-center focus:outline-none focus:border-blue-500 transition-all text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* زر الحفظ */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-6"
      >
        <HiSave size={22} />
        حفظ جدول المحاضرات
      </button>
    </form>
  );
};

export default UniversityScheduleForm;