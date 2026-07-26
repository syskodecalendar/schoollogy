import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockInvoices, mockPayments } from '../../data/mockData';
import {
  DollarSign,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const FinanceDashboard: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [invoices, setInvoices] = useState(mockInvoices);

  const totalBilled = invoices.reduce((acc, inv) => acc + inv.amountBHD, 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((acc, inv) => acc + inv.amountBHD, 0);
  const totalPending = totalBilled - totalPaid;

  const handleMarkPaid = (id: string) => {
    setInvoices(prev =>
      prev.map(i => (i.id === id ? { ...i, status: 'Paid', paymentMethod: 'BenefitPay' } : i))
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-emerald-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <DollarSign className="w-3.5 h-3.5" />
              <span>GCC Tuition & Billing Operations</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'الإدارة المالية وفواتير الأقساط' : 'Finance Officer Tuition & Invoicing Portal'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'متابعة الفواتير والتحصيل المالي عبر بنفت بيل (BenefitPay) والبطاقات الائتمانية والتقارير المالية.'
                : 'Manage tuition invoices, track BenefitPay & credit card payments, download financial statements in BHD.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تصدير التقرير المالي' : 'Export Financial Statement'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'إجمالي الأقساط المفلوترة' : 'Total Billed (BHD)'}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalBilled.toLocaleString()} BHD</span>
            <span className="text-xs text-emerald-600 font-bold">Q1 2026</span>
          </div>
          <p className="text-[11px] text-slate-500">Across all network campuses</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'المبالغ المحصلة' : 'Collected Payments'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalPaid.toLocaleString()} BHD</span>
            <span className="text-xs text-emerald-600 font-bold">{Math.round((totalPaid / totalBilled) * 100)}% Collected</span>
          </div>
          <p className="text-[11px] text-slate-500">Via BenefitPay & Credit Card</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'الأقساط القائمة' : 'Outstanding Balance'}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalPending.toLocaleString()} BHD</span>
            <span className="text-xs text-amber-600 font-bold">3 Invoices</span>
          </div>
          <p className="text-[11px] text-slate-500">Reminders active via WhatsApp</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'طريقة الدفع الرائدة' : 'Leading Gateway'}</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">BenefitPay</span>
            <span className="text-xs text-blue-600 font-bold">78% Usage</span>
          </div>
          <p className="text-[11px] text-slate-500">Instant QR settlement</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'سجل الفواتير والأقساط الدراسية' : 'Tuition Invoices Registry'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'عرض الفواتير وتوثيق الدفع المباشر' : 'Live invoice records with instant BenefitPay status updates.'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-bold">Invoice #</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الطفل / ولي الأمر' : 'Child Name'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الفرع' : 'Branch'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'المبلغ (BHD)' : 'Amount (BHD)'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'وسيلة الدفع' : 'Payment Method'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{inv.childName}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{inv.branchName}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{inv.amountBHD} BHD</td>
                  <td className="py-3 px-4 text-slate-500">{inv.dueDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium">{inv.paymentMethod}</td>
                  <td className="py-3 px-4">
                    {inv.status !== 'Paid' ? (
                      <button
                        onClick={() => handleMarkPaid(inv.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition"
                      >
                        {isAr ? 'تسجيل كمدفوع' : 'Mark as Paid'}
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[10px]">✔ Confirmed</span>
                    )}
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
