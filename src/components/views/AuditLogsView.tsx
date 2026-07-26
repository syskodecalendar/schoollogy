import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockAuditLogs } from '../../data/mockData';
import {
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-red-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>System Security & Role Governance</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'سجل التدقيق والحوكمة وأمان النظام' : 'Super Admin Audit Logs & Role Governance'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'تتبع الوصول للأجهزة السريرية، تسجيلات الدخول لجميع الـ 14 دوراً، التغييرات المالية وقواعد أمان Firestore.'
                : 'Real-time security audit trails, role permission checks, Firestore rule logs, and clinical record access events.'}
            </p>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'سجل أحداث النظام والوصول المباشر' : 'Live System Audit Events'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'مراقبة جميع التغييرات وعمليات الدخول مع تسجيل عنوان الـ IP' : 'Monitored action events, IP addresses, user roles, and compliance statuses.'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-bold">{isAr ? 'الوقت والتاريخ' : 'Timestamp'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'المستخدم' : 'User'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الدور' : 'Role'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الحدث / الإجراء' : 'Action'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'القسم / الهدف' : 'Target Module'}</th>
                <th className="py-3 px-4 font-bold">IP Address</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockAuditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3.5 px-4 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{log.userName || log.user}</td>
                  <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">{log.userRole || log.role}</td>
                  <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200">{log.action}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">{log.targetModule || log.module}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{log.ipAddress}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        log.status === 'Success'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
