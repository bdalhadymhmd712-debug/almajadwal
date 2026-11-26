import React from 'react';
import Sidebar from '../components/Sidebar';
import { HiCode, HiHeart } from 'react-icons/hi';

const Copyright = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 flex flex-col items-center justify-center">
      <Sidebar />
      
      <div className="p-6 w-full max-w-2xl mx-auto mt-20">
        {/* بطاقة حقوق الملكية */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-10 shadow-2xl shadow-purple-500/10 text-center">
          
          {/* أيقونة تعبيرية */}
          <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50">
            <HiCode size={48} color="white" />
          </div>

          {/* العنوان والنص */}
          <h1 className="text-3xl font-bold text-white mb-4">حقوق الملكية الفكرية</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-2">
            تم تصميم وتطوير هذا التطبيق بواسطة
          </p>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
            عبدالهادي محمد ادم
          </h2>

          {/* فاصل زخرفي */}
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mb-8"></div>

          {/* عبارة التوفيق */}
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <HiHeart className="text-red-500" size={20} />
            <p className="text-lg font-semibold">أتمنى لك التوفيق والنجاح</p>
            <HiHeart className="text-red-500" size={20} />
          </div>
        </div>

        {/* نص حقوق النشر في الأسفل */}
        <p className="text-center text-slate-500 text-sm mt-6">
          © {new Date().getFullYear()} المجدول. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  );
};

export default Copyright;