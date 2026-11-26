require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const deleteAllUsers = async () => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
    
    // حذف جميع المستخدمين
    const result = await User.deleteMany({});
    console.log(`🗑️ تم حذف ${result.deletedCount} مستخدم قديم بنجاح`);
    
    // قطع الاتصال
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال بقاعدة البيانات');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء الحذف:', error.message);
  }
};

deleteAllUsers();