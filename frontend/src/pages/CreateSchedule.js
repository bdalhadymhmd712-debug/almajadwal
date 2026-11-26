import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SchoolScheduleForm from '../components/SchoolScheduleForm';
import UniversityScheduleForm from '../components/UniversityScheduleForm';
import { HiChevronDown } from 'react-icons/hi';

const CreateSchedule = () => {
  const [scheduleType, setScheduleType] = useState('');

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <Sidebar />
      
      <div className="p-6 pt-24 max-w-3xl mx-auto">
        {/* العنوان */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">إنشاء جدول جديد 📅</h1>
          <p className="text-slate-400">اختر نوع الجدول الذي تريد إنشاؤه</p>
        </div>

        {/* القائمة المنسدلة */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3 mr-1">نوع الجدول</label>
          <div className="relative">
            <select
              value={scheduleType}
              onChange={(e) => setScheduleType(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl py-4 pr-4 pl-12 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled hidden>-- اختر نوع الجدول --</option>
              <option value="school">🏫 حصص (طالب مدرسة)</option>
              <option value="university">🎓 محاضرات (طالب جامعة)</option>
              <option value="other">📌 آخر</option>
            </select>
            <HiChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* عرض النموذج حسب الاختيار */}
        {scheduleType === 'school' && (
          <div className="animate-fade-in">
            <SchoolScheduleForm />
          </div>
        )}

        {scheduleType === 'university' && (
          <div className="animate-fade-in">
            <UniversityScheduleForm />
          </div>
        )}

        {scheduleType === 'other' && (
          <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 min-h-[300px] flex items-center justify-center">
            <p className="text-slate-400 text-lg">سيتم إضافة النوع الآخر قريباً... 📌</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSchedule;