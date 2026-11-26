import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HiCalendar, HiMail, HiLockClosed } from 'react-icons/hi';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/users/login', { username, password });
    
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      history.push('/dashboard');
    }
  } catch (error) {
    alert(error.response?.data?.message || 'فشل تسجيل الدخول');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/20">
        
        {/* الشعار والعنوان */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
            <HiCalendar size={40} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">المجدول</h1>
          <p className="text-slate-400 text-sm">سجّل دخولك للمتابعة</p>
        </div>

        {/* النموذج */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <HiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl py-4 pr-12 pl-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500"
              required
            />
          </div>

          <div className="relative">
            <HiLockClosed className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl py-4 pr-12 pl-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            تسجيل الدخول
            <span className="text-lg">←</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            ليس لديك حساب؟{' '}
            <button onClick={() => history.push('/register')} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              سجّل الآن
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;