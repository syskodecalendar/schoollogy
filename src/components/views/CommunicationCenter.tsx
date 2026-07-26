import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Bell, Send, Users, ShieldCheck } from 'lucide-react';

export const CommunicationCenter: React.FC = () => {
  const { language } = useApp();
  const [announcementText, setAnnouncementText] = useState('');
  const [sentCount, setSentCount] = useState<number | null>(null);

  const isAr = language === 'ar';

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setSentCount(240);
    setAnnouncementText('');
    setTimeout(() => setSentCount(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>{isAr ? 'مركز الاتصالات والتنبيهات المباشرة' : 'Omnichannel Communication Centre'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isAr
            ? 'إرسال التنبيهات الجماعية لأولياء الأمور والمعلمين ومتابعة الإشعارات الآلية'
            : 'Broadcast parent announcements, direct messaging & automated milestone notifications'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Broadcast Sender */}
        <form onSubmit={handleSendBroadcast} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <span>{isAr ? 'إرسال إعلان جماعي لأولياء الأمور' : 'Broadcast Parent Announcement'}</span>
          </h3>

          <textarea
            value={announcementText}
            onChange={e => setAnnouncementText(e.target.value)}
            placeholder={isAr ? 'اكتب نص الإعلان الجماعي هنا...' : 'Type branch announcement or emergency notice...'}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            rows={4}
          />

          <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            <span>{isAr ? 'إرسال الإعلان الفوري' : 'Send Push & WhatsApp Broadcast'}</span>
          </button>

          {sentCount && (
            <p className="text-xs font-bold text-emerald-600 text-center animate-fadeIn">
              Broadcast dispatched successfully to {sentCount} parents!
            </p>
          )}
        </form>

        {/* Notifications History Feed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">Automated Notification Logs</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="font-bold block text-slate-800 dark:text-slate-200">Daily Twin Progress Digest Sent</span>
              <span className="text-[10px] text-slate-400">Delivered via WhatsApp API • Today 08:30 AM</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="font-bold block text-slate-800 dark:text-slate-200">Speech Plan Approval Request Sent to Dr. Layla</span>
              <span className="text-[10px] text-slate-400">System Notification • Yesterday 04:15 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
