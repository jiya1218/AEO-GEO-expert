'use client';

import { Printer, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ReportDownloadButtonProps {
  auditData: any;
  isDark?: boolean;
}

export function ReportDownloadButton({ auditData, isDark = true }: ReportDownloadButtonProps) {
  const handlePrintPdf = () => {
    toast.success('Preparing clean PDF report for print/export...');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleDownloadJson = () => {
    if (!auditData) return;
    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AEO-GEO-Audit-${auditData.domain || 'report'}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Audit JSON data downloaded!');
  };

  return (
    <div className="flex items-center gap-2 no-print">
      <button
        onClick={handlePrintPdf}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-xs'
        }`}
        title="Export or print clean PDF report without header/footer UI"
      >
        <Printer className="w-3.5 h-3.5 text-cyan-500" />
        <span>Export PDF Report</span>
      </button>

      <button
        onClick={handleDownloadJson}
        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
        }`}
        title="Download raw audit JSON dataset"
      >
        <Download className="w-3.5 h-3.5 text-blue-500" />
        <span>JSON</span>
      </button>
    </div>
  );
}
