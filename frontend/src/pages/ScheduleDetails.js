import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { HiArrowRight, HiCalendar, HiAcademicCap, HiClipboardList } from 'react-icons/hi';

const ScheduleDetails = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchScheduleDetails = useCallback(async () => {
    try {
      const response = await api.get(`/users/schedules/detail/${id}`);
      if (response.data.success) {
        setSchedule(response.data.schedule);
      } else {
        alert('الجدول غير موجود');
        history.push('/my-schedules');
      }
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء جلب التفاصيل');
    } finally {
      setLoading(false);
    }
  }, [id, history]);

  useEffect(() => {
    fetchScheduleDetails();
  }, [fetchScheduleDetails]);

  const getTypeInfo = (type) => {
    switch (type) {
      case 'school': return { text: 'حصص (مدرسة)', icon: HiClipboardList, color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'university': return { text: 'محاضرات (جامعة)', icon: HiAcademicCap, color: 'text-blue-400', bg: 'bg-blue-500/20' };
      default: return { text: 'آخر', icon: HiCalendar, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">جاري التحميل...</div>;
  if (!schedule) return null;

  const typeInfo = getTypeInfo(schedule.type);
  const TypeIcon = typeInfo.icon;
  
  const daysData = schedule.data ? Object.entries(schedule.data) : [];

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <Sidebar />
      
      <div className="p-6 pt-24 max-w-4xl mx-auto">
        <button 
          onClick={() => history.goBack()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <HiArrowRight size={20} />
          <span>العودة للجداول</span>
        </button>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-8 text-center">
          <div className={`w-20 h-20 ${typeInfo.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <TypeIcon size={40} className={typeInfo.color} />
          </div>
          <h1 className="text-3xl font-bold mb-2">{typeInfo.text}</h1>
          <p className="text-slate-400">
            تم الإنشاء: {new Date(schedule.createdAt).toLocaleDateString('ar-EG')}
          </p>
        </div>

        <div className="space-y-6">
          {daysData.length === 0 ? (
            <div className="text-center py-12 text-slate-500">لا توجد بيانات مسجلة في هذا الجدول.</div>
          ) : (
            daysData.map(([dayName, dayContent]) => (
              <div key={dayName} className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="bg-purple-600/20 px-6 py-4 border-b border-purple-500/20">
                  <h2 className="text-xl font-bold text-purple-400">{dayName}</h2>
                </div>
                
                <div className="p-6">
                  {typeof dayContent === 'object' && dayContent !== null && !Array.isArray(dayContent) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(dayContent).map(([key, lectureObj], idx) => (
                        <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                          {typeof lectureObj === 'object' && lectureObj !== null ? (
                            Object.entries(lectureObj).map(([field, val]) => (
                              val && (
                                <div key={field} className="mb-2 last:mb-0">
                                  <span className="text-xs text-slate-500 block">
                                    {field === 'subject' ? 'المادة' : field === 'start' ? 'من' : field === 'end' ? 'إلى' : field}
                                  </span>
                                  <span className="text-sm font-medium text-white">{val}</span>
                                </div>
                              )
                            ))
                          ) : (
                            <p className="text-white">{lectureObj}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(dayContent).map(([periodKey, subjectName]) => (
                        subjectName && typeof subjectName === 'string' ? (
                          <div key={periodKey} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center">
                            <span className="text-xs text-slate-500 block mb-1">
                              {periodKey.replace('period-', 'الحصة ')}
                            </span>
                            <span className="text-sm font-bold text-white break-words">{subjectName}</span>
                          </div>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetails;