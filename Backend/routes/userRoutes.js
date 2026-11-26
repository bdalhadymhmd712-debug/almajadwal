const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Schedule = require('../models/Schedule');

// ✅ إنشاء حساب جديد
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('📝 محاولة إنشاء حساب:', { username, passwordLength: password?.length });
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ success: false, message: 'اسم المستخدم موجود مسبقاً' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('🔐 كلمة المرور بعد التشفير:', hashedPassword.substring(0, 20) + '...');

    user = new User({ 
      username, 
      password: hashedPassword, 
      userType: 'university' 
    }); 
    
    await user.save();
    
    console.log('✅ تم حفظ المستخدم بنجاح:', user._id);

    res.status(201).json({ 
      success: true, 
      user: { id: user._id, username: user.username, userType: user.userType } 
    });
  } catch (error) {
    console.error('❌ خطأ في التسجيل:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ تسجيل الدخول
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('🔑 محاولة تسجيل دخول:', { username, passwordProvided: !!password });
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }

    const user = await User.findOne({ username });
    
    if (!user) {
      console.log('⚠️ المستخدم غير موجود:', username);
      return res.status(401).json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
    
    console.log('👤 المستخدم موجود:', user._id);
    console.log('🔐 كلمة المرور في DB موجودة:', !!user.password);
    console.log('🔐 طول كلمة المرور المشفرة:', user.password?.length);

    if (!user.password) {
      return res.status(400).json({ success: false, message: 'حساب غير صالح، يرجى إنشاء حساب جديد' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 نتيجة المقارنة:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }

    console.log('✅ تسجيل دخول ناجح');
    
    res.json({ 
      success: true, 
      user: { id: user._id, username: user.username, userType: user.userType } 
    });
  } catch (error) {
    console.error('❌ خطأ في تسجيل الدخول:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ حفظ جدول جديد
router.post('/schedules', async (req, res) => {
  try {
    const { userId, type, data } = req.body;
    const schedule = new Schedule({ userId, type, data });
    await schedule.save();
    res.status(201).json({ success: true, message: 'تم حفظ الجدول بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ جلب جميع جداول المستخدم
router.get('/schedules/:userId', async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ جلب تفاصيل جدول محدد
router.get('/schedules/detail/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'الجدول غير موجود' });
    res.json({ success: true, schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ حذف جدول
router.delete('/schedules/:id', async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'تم حذف الجدول بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;