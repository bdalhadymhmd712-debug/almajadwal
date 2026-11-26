require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 1. اتصال بقاعدة البيانات
connectDB();

// 2. إعدادات Middleware
app.use(cors()); // السماح للواجهة الأمامية بالاتصال بالسيرفر
app.use(express.json()); // تمكين السيرفر من فهم بيانات JSON القادمة

// 3. مسار الترحيب (للتأكد من أن السيرفر يعمل)
app.get('/', (req, res) => {
  res.json({ 
    message: 'مرحباً بك في API المجدول 🚀',
    version: '1.0.0',
    status: 'running'
  });
});

// 4. تفعيل مسارات المستخدمين والجداول
// ملاحظة: أي طلب يبدأ بـ /api/users سيتم توجيهه إلى userRoutes
app.use('/api/users', userRoutes);

// 5. تشغيل السيرفر والاستماع للمنافذ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/users`);
});