"use client";

import { useEffect, useState, use } from "react";
import { Printer, ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";

export default function InvoicePrintPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [params.id]);

  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setInvoice(data.invoice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center font-mono text-xs">
        Loading Invoice Document...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center gap-4 font-mono text-xs">
        <span>Invoice document not found.</span>
        <a href="/admin/nylex" className="text-[#0EA5E9] hover:underline">
          Return to Admin Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8 font-sans">
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <a
          href="/admin/nylex"
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-mono font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </a>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0EA5E9] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Invoice Document Paper */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col justify-between min-h-[900px] print:shadow-none print:border-none print:p-0 print:m-0">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-sm flex items-center justify-center">
                  N
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  NYLEX WEB STUDIO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Premium Digital Solutions & Full-Stack Development
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Email: buildwithnylex@gmail.com | www.nylex.agency
              </p>
            </div>

            <div className="text-right flex flex-col items-end gap-1 font-mono">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                INVOICE
              </span>
              <span className="text-2xl font-black text-[#0EA5E9]">
                {invoice.invoiceNumber}
              </span>
              <span className="text-xs text-slate-500">
                Date: {new Date(invoice.issueDate).toLocaleDateString()}
              </span>
              <span className="text-xs text-slate-500">
                Due: {new Date(invoice.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Client & Billing Info */}
          <div className="grid grid-cols-2 gap-8 py-2 font-sans">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                BILLED TO
              </span>
              <h2 className="text-base font-extrabold text-slate-900">
                {invoice.clientName}
              </h2>
              {invoice.clientCompany && (
                <p className="text-xs text-slate-600 font-medium">{invoice.clientCompany}</p>
              )}
              {invoice.clientEmail && (
                <p className="text-xs text-slate-600 font-mono">{invoice.clientEmail}</p>
              )}
              {invoice.clientPhone && (
                <p className="text-xs text-slate-600 font-mono">{invoice.clientPhone}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-right font-sans">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                PAYMENT STATUS
              </span>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                    invoice.status === "Paid"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 border-b border-slate-200 font-mono uppercase text-[10px] text-slate-500">
                <tr>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4 text-right">Unit Price</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items &&
                  invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-semibold text-slate-900">{item.description}</td>
                      <td className="p-4 text-center font-mono">{item.quantity}</td>
                      <td className="p-4 text-right font-mono">${item.price?.toLocaleString()}</td>
                      <td className="p-4 text-right font-mono font-bold">
                        ${item.amount?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal & Total */}
          <div className="flex flex-col items-end gap-2 text-xs font-mono pt-4">
            <div className="flex items-center justify-between w-64 text-slate-500">
              <span>Subtotal:</span>
              <span>${invoice.subtotal?.toLocaleString()}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex items-center justify-between w-64 text-slate-500">
                <span>Tax:</span>
                <span>+${invoice.tax?.toLocaleString()}</span>
              </div>
            )}
            {invoice.discount > 0 && (
              <div className="flex items-center justify-between w-64 text-emerald-600">
                <span>Discount:</span>
                <span>-${invoice.discount?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between w-64 pt-3 border-t border-slate-300 text-base font-black text-slate-900">
              <span>TOTAL DUE:</span>
              <span className="text-[#0EA5E9]">${invoice.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0EA5E9]" />
            <span>Official NYLEX WEB STUDIO Invoice Document</span>
          </div>
          <span>{invoice.notes}</span>
        </div>
      </div>
    </div>
  );
}
