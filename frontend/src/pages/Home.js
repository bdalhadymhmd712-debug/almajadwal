import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('university');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', { username, userType });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        history.push('/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'حدث خطأ في الاتصال');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>مرحباً بك في المجدول 📅</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
        />
        
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
        >
          <option value="university">طالب جامعة (محاضرات)</option>
          <option value="school">طالب مدرسة (حصص)</option>
        </select>

        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ابدأ الآن
        </button>
      </form>
    </div>
  );
};

export default Home;