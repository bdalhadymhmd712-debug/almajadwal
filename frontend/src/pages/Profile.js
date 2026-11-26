import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { HiUser, HiLockClosed, HiSave } from 'react-icons/hi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUsername(userData.username || '');
      // ملاحظة أمنية: لا نعرض كلمة المرور الحقيقية هنا، لكن نترك الحقل فارغاً للتعديل
      setPassword(''); 
    } else {
      history.push('/login');
    }
  }, [history]);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // تحديث البيانات في LocalStorage
    const updatedUser = { ...user, username };
    if (password.trim() !== '') {
      updatedUser.password = password; // تحديث كلمة المرور إذا تم إدخال قيمة جديدة
    }
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('تم حفظ التعديلات بنجاح! ✅');
    
    // إعادة تحميل البيانات المحدثة
    setUser(updatedUser);
    setPassword('');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <Sidebar />
      
      <div className="p-6 pt-24 max-w-2xl mx-auto">
        {/* العنوان */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">الملف الشخصي 👤</h1>
          <p className="text-slate-400">قم بتعديل بياناتك الشخصية</p>
        </div>

        {/* بطاقة التعديل */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10">
          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* حقل اسم المستخدم */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 mr-1">اسم المستخدم</label>
              <div className="relative">
                <HiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl py-4 pr-12 pl-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* حقل كلمة المرور الجديدة */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 mr-1">كلمة المرور الجديدة</label>
              <div className="relative">
                <HiLockClosed className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  placeholder="اتركه فارغاً إذا لم ترد تغييرها"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl py-4 pr-12 pl-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 mr-1">* اكتب كلمة مرور جديدة فقط إذا كنت تريد تغييرها.</p>
            </div>

            {/* زر الحفظ */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              <HiSave size={22} />
              حفظ التعديلات
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;