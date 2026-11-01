"use client";

import { useEffect, useState, use } from "react";
import {
  Printer,
  ArrowLeft,
  Edit3,
  Phone,
  Mail,
  Globe,
  MapPin,
  Palette,
  Server,
  Smartphone,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import InvoiceEditorModal from "@/app/components/InvoiceEditorModal";

export default function InvoicePrintPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [inlineEditMode, setInlineEditMode] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchInvoice(params.id);
    }
  }, [params?.id]);

  const fetchInvoice = async (id) => {
    try {
      const res = await fetch(`/api/invoices/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.invoice) {
          normalizeAndSetInvoice(data.invoice);
          return;
        }
      }
      // If not found in DB, initialize clean dynamic invoice
      initializeCleanInvoice(id);
    } catch (err) {
      console.error("Fetch invoice error:", err);
      initializeCleanInvoice(id);
    } finally {
      setLoading(false);
    }
  };

  const initializeCleanInvoice = (id) => {
    const defaultItems = [
      {
        description: "Website Design and Development",
        subtitle: "Complete Website Design and Development (Project Cost)",
        icon: "code",
        quantity: 1,
        price: 14000,
        amount: 14000,
      },
      {
        description: "Domain Upgrade – .com",
        subtitle: "Domain Registration (.com) (Extra Charges – Not included in Project Cost)",
        icon: "domain",
        quantity: 1,
        price: 500,
        amount: 500,
      },
    ];

    const newInv = {
      id: id === "new" ? null : id,
      invoice_number: id && id !== "new" && isNaN(Number(id)) ? id : `INX-FP-${String(id || "001").padStart(3, "0")}`,
      issue_date: new Date().toISOString().split("T")[0],
      due_date: new Date().toISOString().split("T")[0],
      client_name: "DK Dance Company (DKDC)",
      client_company: "DK Dance Company",
      client_email: "dkdc.official@gmail.com",
      client_phone: "+91 99952 72083",
      status: "Paid",
      notes: "Thank you for choosing Nylex.",
      items: defaultItems,
      meta: {
        title: "Full Payment",
        tagline: "FAST. MODERN. SCALABLE.",
        client_director: "Director: Dhanesh Krishnan",
        client_address: "Kozhikode, Kerala",
        from_name: "Nylex",
        from_phone: "+91 89214 42748",
        from_email: "buildwithnylex@gmail.com",
        from_website: "nylex.online",
        currency: "₹",
        payment_method: "gpay",
        payment_method_label: "UPI (GPay)",
        stamp_type: "PAID",
        stamp_top_text: "FULL PAYMENT",
        stamp_main_text: "PAID",
        stamp_bottom_text: "THANK YOU",
        payment_breakdown: [
          { id: "p1", label: `Advance Received (Paid on 21/10/2026)`, amount: 2000 },
          { id: "p2", label: `Second Payment Received (Paid on 31/10/2026)`, amount: 2500 },
          { id: "p3", label: `Final Payment Received (Paid on 31/10/2026)`, amount: 10000 },
        ],
      },
    };
    normalizeAndSetInvoice(newInv);
  };

  const normalizeAndSetInvoice = (inv) => {
    const rawMeta = typeof inv.meta === "object" && inv.meta ? inv.meta : {};
    const items = inv.items && inv.items.length > 0 ? inv.items : [];

    setInvoice({
      ...inv,
      items: items.map((it) => ({
        ...it,
        quantity: Number(it.quantity) || 1,
        price: Number(it.price) || 0,
        amount: (Number(it.quantity) || 1) * (Number(it.price) || 0),
      })),
      meta: {
        title: rawMeta.title || "Full Payment",
        tagline: rawMeta.tagline || "FAST. MODERN. SCALABLE.",
        client_director: rawMeta.client_director || "Director: Dhanesh Krishnan",
        client_address: rawMeta.client_address || "Kozhikode, Kerala",
        from_name: rawMeta.from_name || "Nylex",
        from_phone: rawMeta.from_phone || "+91 89214 42748",
        from_email: rawMeta.from_email || "buildwithnylex@gmail.com",
        from_website: rawMeta.from_website || "nylex.online",
        currency: rawMeta.currency || "₹",
        payment_method: rawMeta.payment_method || "gpay",
        payment_method_label: rawMeta.payment_method_label || "UPI (GPay)",
        stamp_type: rawMeta.stamp_type || "PAID",
        stamp_top_text: rawMeta.stamp_top_text || "FULL PAYMENT",
        stamp_main_text: rawMeta.stamp_main_text || "PAID",
        stamp_bottom_text: rawMeta.stamp_bottom_text || "THANK YOU",
        // Notice: highlight_cards and breakdown_rows will dynamically derive if not explicitly passed
        highlight_cards: rawMeta.highlight_cards || null,
        breakdown_rows: rawMeta.breakdown_rows || null,
        payment_breakdown: rawMeta.payment_breakdown || [
          {
            id: "p1",
            label: `Payment Received (Paid on ${new Date().toLocaleDateString("en-GB")})`,
            amount: items.reduce((s, i) => s + (Number(i.quantity) || 1) * (Number(i.price) || 0), 0),
          },
        ],
        notes_list: rawMeta.notes_list || null,
      },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // State mutators for full live editing
  const updateInvoiceField = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const updateMetaField = (field, value) => {
    setInvoice((prev) => ({
      ...prev,
      meta: { ...prev.meta, [field]: value },
    }));
  };

  // Line Item Mutators
  const updateItem = (index, field, value) => {
    setInvoice((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      if (field === "quantity" || field === "price") {
        const qty = Number(field === "quantity" ? value : items[index].quantity) || 0;
        const prc = Number(field === "price" ? value : items[index].price) || 0;
        items[index].amount = qty * prc;
      }
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "New Service Item",
          subtitle: "Service details",
          icon: "code",
          quantity: 1,
          price: 1000,
          amount: 1000,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Payment Breakdown Mutators
  const updatePaymentMilestone = (index, field, value) => {
    setInvoice((prev) => {
      const breakdown = [...(prev.meta.payment_breakdown || [])];
      breakdown[index] = { ...breakdown[index], [field]: value };
      return {
        ...prev,
        meta: { ...prev.meta, payment_breakdown: breakdown },
      };
    });
  };

  const addPaymentMilestone = () => {
    setInvoice((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        payment_breakdown: [
          ...(prev.meta.payment_breakdown || []),
          {
            id: Date.now().toString(),
            label: `Payment Received (Paid on ${new Date().toLocaleDateString("en-GB")})`,
            amount: 0,
          },
        ],
      },
    }));
  };

  const removePaymentMilestone = (index) => {
    setInvoice((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        payment_breakdown: prev.meta.payment_breakdown.filter((_, i) => i !== index),
      },
    }));
  };

  // Highlight Cards Mutators
  const updateHighlightCard = (index, field, value) => {
    setInvoice((prev) => {
      const cards = [...currentHighlightCards];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        meta: { ...prev.meta, highlight_cards: cards },
      };
    });
  };

  // Notes List Mutators
  const updateNote = (index, value) => {
    setInvoice((prev) => {
      const notes = [...currentNotesList];
      notes[index] = value;
      return {
        ...prev,
        meta: { ...prev.meta, notes_list: notes },
      };
    });
  };

  const addNote = () => {
    setInvoice((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        notes_list: [...currentNotesList, "New invoice note or term"],
      },
    }));
  };

  const removeNote = (index) => {
    setInvoice((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        notes_list: currentNotesList.filter((_, i) => i !== index),
      },
    }));
  };

  // Save changes to database
  const handleSaveInvoice = async (dataToSave = null) => {
    const payload = dataToSave || invoice;
    setSaving(true);
    try {
      const targetId = payload.id || params?.id;
      let res;
      if (targetId && targetId !== "new") {
        res = await fetch(`/api/invoices/${targetId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/invoices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (data.invoice) {
          normalizeAndSetInvoice({
            ...data.invoice,
            items: payload.items,
            meta: payload.meta,
          });
        }
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-neutral-400 font-inter flex flex-col items-center justify-center text-xs gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#1a56db] border-t-transparent animate-spin" />
        <span className="font-mono text-[11px] uppercase tracking-wider">
          Loading Invoice Document...
        </span>
      </div>
    );
  }

  const invData = invoice || {};
  const meta = invData.meta || {};
  const currency = meta.currency || "₹";
  const items = invData.items || [];

  // ================= DYNAMIC CALCULATIONS & DERIVATIONS =================
  // 1. Total Billable Amount
  const totalAmount = items.reduce(
    (sum, it) => sum + (Number(it.amount) || Number(it.quantity) * Number(it.price) || 0),
    0
  );

  // 2. Payments Received Total
  const paymentBreakdown = meta.payment_breakdown || [];
  const totalReceived = paymentBreakdown.reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  );

  // 3. Balance Due
  const balanceDue = Math.max(0, totalAmount - totalReceived);

  // 4. Dynamic Highlight Cards (derive from actual items if not explicitly customized)
  const currentHighlightCards =
    meta.highlight_cards && meta.highlight_cards.length > 0
      ? meta.highlight_cards
      : items.length > 0
        ? items.slice(0, 2).map((it, idx) => ({
          id: `dyn-card-${idx}`,
          label: it.description.toUpperCase(),
          amount: `${currency}${Number(it.amount || it.price).toLocaleString()}`,
          subtitle: it.subtitle ? `(${it.subtitle})` : "",
          icon: it.icon || (idx === 0 ? "default" : "domain"),
        }))
        : [
          {
            id: "1",
            label: "PROJECT COST",
            amount: `${currency}0`,
            subtitle: "(Website Design & Development)",
            icon: "default",
          },
        ];

  // 5. Dynamic Breakdown Rows (always list actual items!)
  const currentBreakdownRows = items.map((it, idx) => ({
    id: `dyn-row-${idx}`,
    label: it.description || `Item #${idx + 1}`,
    amount: Number(it.amount || it.price * (it.quantity || 1)) || 0,
  }));

  // 6. Dynamic Notes List (if not customized, use actual figures!)
  const currentNotesList =
    meta.notes_list && meta.notes_list.length > 0
      ? meta.notes_list
      : [
        `This invoice acknowledges the receipt of the payment for ${invData.client_name || "the project"}.`,
        ...items.map((it) => `${it.description}: ${currency}${Number(it.amount || it.price).toLocaleString()}`),
        `Total Amount Received: ${currency}${totalReceived.toLocaleString()}${balanceDue === 0 ? " (Fully Paid)" : ""}`,
        "Thank you for choosing Nylex.",
      ];

  // Render correct icon for an item
  const renderItemIcon = (iconType) => {
    switch (iconType) {
      case "code":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
            <span className="font-mono font-bold text-sm tracking-tighter">&lt;/&gt;</span>
          </div>
        );
      case "domain":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
            <Globe className="w-5 h-5" />
          </div>
        );
      case "design":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
            <Palette className="w-5 h-5" />
          </div>
        );
      case "server":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
            <Server className="w-5 h-5" />
          </div>
        );
      case "mobile":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
            <Smartphone className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
            <FileText className="w-5 h-5" />
          </div>
        );
    }
  };

  // Formatted date
  const formatDate = (dateStr) => {
    if (!dateStr) return "31/10/2026";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-neutral-900 py-6 sm:py-10 px-2 sm:px-4 font-inter selection:bg-blue-100 selection:text-blue-900 print:bg-white print:p-0 print:m-0">
      {/* Top Floating Control Bar (Hidden on Print) */}
      <div className="max-w-[850px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden px-2">
        <Link
          href="/admin/nylex"
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold font-inter flex items-center gap-2 transition-all border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Inline Edit Mode Toggle */}
          <button
            onClick={() => setInlineEditMode(!inlineEditMode)}
            className={`px-4 py-2 rounded-full text-xs font-semibold font-inter flex items-center gap-1.5 transition-all cursor-pointer ${inlineEditMode
                ? "bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/30"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{inlineEditMode ? "Direct Edit: ON" : "Direct Edit: OFF"}</span>
          </button>

          {/* Full Modal Editor */}
          <button
            onClick={() => setEditModalOpen(true)}
            className="px-4 py-2 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-semibold font-inter flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#1a56db]" />
            <span>Edit Modal</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => handleSaveInvoice()}
            disabled={saving}
            className={`px-5 py-2 rounded-full text-xs font-semibold font-inter flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${savedSuccess
                ? "bg-emerald-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
          >
            {saving ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : savedSuccess ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{savedSuccess ? "Saved!" : "Save Changes"}</span>
          </button>

          {/* Print / Save as PDF */}
          <button
            onClick={handlePrint}
            className="px-6 py-2 rounded-full bg-[#1a56db] hover:bg-[#1546b8] text-white text-xs font-semibold font-manrope uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Inline Editing Notice Banner */}
      {inlineEditMode && (
        <div className="max-w-[850px] mx-auto mb-4 p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs flex items-center justify-between print:hidden">
          <span>
            ✏️ <b>Direct Edit Mode active:</b> Click on any text, dates, prices, or amounts below to edit directly. Hit &quot;Save Changes&quot; when done.
          </span>
          <button
            onClick={() => setInlineEditMode(false)}
            className="text-amber-400 hover:underline font-bold"
          >
            Finish Editing
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INVOICE PAPER CANVAS (Exact A4 Proportion & Matching Visual Styling)      */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[850px] mx-auto overflow-x-auto pb-6">
        <div
          id="invoice-paper"
          className="min-w-[680px] sm:min-w-0 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-14 relative overflow-hidden flex flex-col justify-between min-h-[1130px] border border-neutral-200/80 print:min-w-0 print:shadow-none print:border-none print:rounded-none print:p-8 print:m-0 print:max-w-none print:w-full"
          style={{
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
          }}
        >
        {/* ================= HEADER SECTION ================= */}
        <div>
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
            {/* Left: Geometric NYLEX Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/nylex-icon.png"
                alt="Nylex Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-2xl font-black font-manrope tracking-[0.22em] text-neutral-950">
                NYLEX
              </span>
            </div>

            {/* Right: Slogan */}
            <div className="text-[10px] font-bold font-mono text-neutral-800 tracking-widest uppercase">
              {inlineEditMode ? (
                <input
                  type="text"
                  value={meta.tagline || ""}
                  onChange={(e) => updateMetaField("tagline", e.target.value)}
                  className="border-b border-dashed border-blue-400 bg-transparent text-right focus:outline-none"
                />
              ) : (
                meta.tagline || "FAST. MODERN. SCALABLE."
              )}
            </div>
          </div>

          {/* Document Title & Invoice Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-7 pb-6 items-start">
            {/* Left: Title & Subtitle */}
            <div className="sm:col-span-7 flex flex-col">
              <h1 className="text-5xl font-black font-manrope tracking-tight text-neutral-950 leading-none">
                INVOICE
              </h1>
              <div className="w-12 h-1 bg-[#1a56db] rounded-full mt-3 mb-2" />
              <div className="text-xl font-bold font-manrope text-neutral-900 flex items-center gap-1.5 flex-wrap">
                <span>Invoice for</span>{" "}
                {inlineEditMode ? (
                  <input
                    type="text"
                    value={meta.title || "Full Payment"}
                    onChange={(e) => updateMetaField("title", e.target.value)}
                    className="border-b border-dashed border-blue-400 text-[#1a56db] font-bold bg-transparent focus:outline-none px-1"
                  />
                ) : (
                  <span className="text-[#1a56db]">
                    {meta.title || "Full Payment"}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                Thank you for your trust in Nylex.
              </p>
            </div>

            {/* Right: Invoice No & Date Boxes with Divider */}
            <div className="sm:col-span-5 flex items-stretch border-l-0 sm:border-l sm:border-neutral-200/90 pl-0 sm:pl-6">
              <div className="flex flex-col gap-4 w-full">
                {/* Invoice No */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-700 tracking-wider block">
                      INVOICE NO.
                    </span>
                    {inlineEditMode ? (
                      <input
                        type="text"
                        value={invData.invoice_number || ""}
                        onChange={(e) => updateInvoiceField("invoice_number", e.target.value)}
                        className="text-xl font-black font-manrope text-[#1a56db] border-b border-dashed border-blue-400 bg-transparent focus:outline-none w-36"
                      />
                    ) : (
                      <span className="text-xl font-black font-manrope text-[#1a56db]">
                        {invData.invoice_number || "INX-FP-431"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Invoice Date */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef5fc] text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100/60">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold font-mono leading-none">
                        {invData.issue_date ? new Date(invData.issue_date).getDate() : "31"}
                      </span>
                      <span className="text-[7px] font-mono uppercase leading-none mt-0.5">
                        {invData.issue_date
                          ? new Date(invData.issue_date).toLocaleString("default", { month: "short" })
                          : "OCT"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-700 tracking-wider block">
                      INVOICE DATE
                    </span>
                    {inlineEditMode ? (
                      <input
                        type="date"
                        value={invData.issue_date ? new Date(invData.issue_date).toISOString().split("T")[0] : ""}
                        onChange={(e) => updateInvoiceField("issue_date", e.target.value)}
                        className="text-sm font-bold font-manrope border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                      />
                    ) : (
                      <span className="text-xl font-black font-manrope text-neutral-950">
                        {formatDate(invData.issue_date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 my-1" />

          {/* ================= FROM & TO SECTION ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-5">
            {/* FROM */}
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                FROM
              </span>
              <h2 className="text-lg font-black font-manrope text-neutral-950">
                {meta.from_name || "Nylex"}
              </h2>
              <div className="flex items-center gap-2 text-neutral-700 font-medium mt-1">
                <Phone className="w-3.5 h-3.5 text-[#1a56db]" />
                <span className="font-mono">{meta.from_phone || "+91 89214 42748"}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#1a56db]" />
                <span className="font-mono">{meta.from_email || "buildwithnylex@gmail.com"}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <Globe className="w-3.5 h-3.5 text-[#1a56db]" />
                <span className="font-mono">{meta.from_website || "nylex.online"}</span>
              </div>
            </div>

            {/* TO (Editable Client Info) */}
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                TO
              </span>
              {inlineEditMode ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={invData.client_name || ""}
                    onChange={(e) => updateInvoiceField("client_name", e.target.value)}
                    placeholder="Client / Company Name"
                    className="w-full text-base font-black font-manrope text-neutral-950 border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={meta.client_director || ""}
                    onChange={(e) => updateMetaField("client_director", e.target.value)}
                    placeholder="Director: Person Name"
                    className="w-full text-xs font-semibold text-neutral-800 border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={invData.client_phone || ""}
                    onChange={(e) => updateInvoiceField("client_phone", e.target.value)}
                    placeholder="+91 Phone Number"
                    className="w-full text-xs font-mono text-neutral-700 border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                  />
                  <input
                    type="text"
                    value={meta.client_address || ""}
                    onChange={(e) => updateMetaField("client_address", e.target.value)}
                    placeholder="Address / Location"
                    className="w-full text-xs text-neutral-700 border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-black font-manrope text-neutral-950">
                    {invData.client_name || "DK Dance Company (DKDC)"}
                  </h2>
                  {meta.client_director && (
                    <p className="text-xs font-semibold text-neutral-800">
                      {meta.client_director}
                    </p>
                  )}
                  {invData.client_phone && (
                    <div className="flex items-center gap-2 text-neutral-700 font-medium mt-1">
                      <Phone className="w-3.5 h-3.5 text-[#1a56db]" />
                      <span className="font-mono">{invData.client_phone}</span>
                    </div>
                  )}
                  {meta.client_address && (
                    <div className="flex items-center gap-2 text-neutral-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#1a56db]" />
                      <span>{meta.client_address}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ================= LINE ITEMS TABLE ================= */}
          <div className="mt-4 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-2xs">
            {/* Header */}
            <div className="bg-[#1a56db] text-white px-6 py-3.5 flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="flex-1">DESCRIPTION</span>
              <span className="w-20 text-center">QTY</span>
              <span className="w-32 text-right">PRICE ({currency})</span>
              {inlineEditMode && <span className="w-10 text-center print:hidden">DEL</span>}
            </div>

            {/* Rows */}
            <div className="divide-y divide-neutral-100 bg-white">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50/50 transition-colors"
                >
                  {/* Left: Icon + Title & Subtitle */}
                  <div className="flex items-center gap-3.5 flex-1 pr-4">
                    {renderItemIcon(item.icon)}
                    <div className="flex flex-col flex-1">
                      {inlineEditMode ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={item.description || ""}
                            onChange={(e) => updateItem(idx, "description", e.target.value)}
                            placeholder="Service title"
                            className="font-bold text-sm text-neutral-950 font-manrope border-b border-dashed border-blue-400 bg-transparent focus:outline-none w-full"
                          />
                          <input
                            type="text"
                            value={item.subtitle || ""}
                            onChange={(e) => updateItem(idx, "subtitle", e.target.value)}
                            placeholder="Subtitle or extra notes"
                            className="text-[11px] text-neutral-500 font-inter border-b border-dashed border-blue-300 bg-transparent focus:outline-none w-full"
                          />
                        </div>
                      ) : (
                        <>
                          <span className="font-bold text-sm text-neutral-950 font-manrope">
                            {item.description}
                          </span>
                          {item.subtitle && (
                            <span className="text-[11px] text-neutral-500 font-inter mt-0.5 whitespace-pre-line leading-relaxed">
                              {item.subtitle}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Center: QTY */}
                  <div className="w-20 text-center font-manrope font-bold text-sm text-neutral-900">
                    {inlineEditMode ? (
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                        className="w-14 text-center font-bold border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                      />
                    ) : (
                      Number(item.quantity) || 1
                    )}
                  </div>

                  {/* Right: PRICE */}
                  <div className="w-32 text-right font-manrope font-bold text-base text-neutral-950">
                    {inlineEditMode ? (
                      <div className="flex items-center justify-end gap-1">
                        <span>{currency}</span>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => updateItem(idx, "price", e.target.value)}
                          className="w-24 text-right font-bold border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        {currency}
                        {Number(item.amount || item.price * (item.quantity || 1)).toLocaleString()}
                      </>
                    )}
                  </div>

                  {/* Delete Item (Edit Mode) */}
                  {inlineEditMode && (
                    <div className="w-10 text-center print:hidden">
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Item Row in Direct Edit Mode */}
            {inlineEditMode && (
              <div className="p-3 bg-blue-50/50 border-t border-blue-100 flex justify-center print:hidden">
                <button
                  onClick={addItem}
                  className="px-4 py-1.5 rounded-full bg-[#1a56db] text-white text-xs font-semibold hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>
            )}
          </div>

          {/* ================= TWO-COLUMN LOWER SECTION ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 mt-6 pt-2 items-start">
            {/* LEFT COLUMN: Summary Badges + Payment Method + Notes */}
            <div className="sm:col-span-5 flex flex-col gap-4">
              {/* Highlight Badges (Dynamically Derived from Actual Items!) */}
              {currentHighlightCards.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="bg-[#eef5fc] border border-blue-100 rounded-2xl p-4 flex items-center gap-3.5"
                >
                  {renderItemIcon(card.icon || "default")}
                  <div className="flex flex-col flex-1">
                    {inlineEditMode ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={card.label || ""}
                          onChange={(e) => updateHighlightCard(idx, "label", e.target.value)}
                          className="text-[10px] font-mono font-bold uppercase text-neutral-700 tracking-wider border-b border-dashed border-blue-300 bg-transparent focus:outline-none w-full"
                        />
                        <input
                          type="text"
                          value={card.amount || ""}
                          onChange={(e) => updateHighlightCard(idx, "amount", e.target.value)}
                          className="text-xl font-black font-manrope text-[#1a56db] border-b border-dashed border-blue-300 bg-transparent focus:outline-none w-full"
                        />
                        <input
                          type="text"
                          value={card.subtitle || ""}
                          onChange={(e) => updateHighlightCard(idx, "subtitle", e.target.value)}
                          className="text-[10px] text-neutral-500 font-medium border-b border-dashed border-blue-300 bg-transparent focus:outline-none w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <span className="text-[10px] font-mono font-bold uppercase text-neutral-700 tracking-wider">
                          {card.label}
                        </span>
                        <span className="text-2xl font-black font-manrope text-[#1a56db] leading-tight">
                          {card.amount}
                        </span>
                        {card.subtitle && (
                          <span className="text-[10px] text-neutral-500 font-medium">
                            {card.subtitle}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* PAYMENT METHOD */}
              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a56db] block mb-2">
                  PAYMENT METHOD
                </span>
                <div className="flex items-center gap-2">
                  {/* Google Pay Logo SVG */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span className="font-manrope font-bold text-neutral-800 text-sm">
                      Pay
                    </span>
                  </div>
                  {inlineEditMode ? (
                    <input
                      type="text"
                      value={meta.payment_method_label || ""}
                      onChange={(e) => updateMetaField("payment_method_label", e.target.value)}
                      className="text-xs font-mono font-bold text-neutral-800 border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-neutral-800">
                      {meta.payment_method_label || "UPI (GPay)"}
                    </span>
                  )}
                </div>
              </div>

              {/* NOTES (Dynamically derived from actual totals & editable) */}
              <div className="pt-2 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a56db]">
                    NOTES
                  </span>
                  {inlineEditMode && (
                    <button
                      onClick={addNote}
                      className="text-[10px] font-mono font-bold text-blue-600 hover:underline print:hidden cursor-pointer"
                    >
                      + Add Note
                    </button>
                  )}
                </div>
                <ul className="space-y-1 text-neutral-700 font-inter text-[11px] leading-relaxed">
                  {currentNotesList.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-neutral-900 font-bold shrink-0">•</span>
                      {inlineEditMode ? (
                        <div className="flex items-center gap-1 flex-1">
                          <input
                            type="text"
                            value={note}
                            onChange={(e) => updateNote(idx, e.target.value)}
                            className="flex-1 text-[11px] border-b border-dashed border-blue-300 bg-transparent focus:outline-none"
                          />
                          <button
                            onClick={() => removeNote(idx)}
                            className="text-neutral-400 hover:text-rose-500 p-0.5 print:hidden cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span>{note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: Calculation Breakdown Table + PAID Rubber Stamp */}
            <div className="sm:col-span-7 flex flex-col justify-between h-full">
              {/* Calculation Table */}
              <div className="rounded-2xl border border-neutral-200/90 overflow-hidden bg-white shadow-2xs text-xs font-inter">
                {/* Breakdown Rows (Always lists actual line items!) */}
                <div className="divide-y divide-neutral-100">
                  {currentBreakdownRows.map((row, idx) => (
                    <div
                      key={row.id || idx}
                      className="px-4 py-2.5 flex items-center justify-between text-neutral-700 font-medium"
                    >
                      <span>{row.label}</span>
                      <span className="font-manrope font-bold text-neutral-900">
                        {currency}
                        {Number(row.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  {/* Highlight Row: Total Amount (Real Sum of Line Items) */}
                  <div className="px-4 py-2.5 bg-[#dbeafe] flex items-center justify-between font-manrope font-bold text-neutral-950 text-sm">
                    <span>Total Amount</span>
                    <span className="text-base text-neutral-950 font-black">
                      {currency}
                      {totalAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Payment Milestone Installments (Fully Editable!) */}
                  {paymentBreakdown.map((milestone, idx) => (
                    <div
                      key={milestone.id || idx}
                      className="px-4 py-2 flex items-center justify-between text-neutral-700 text-[11px]"
                    >
                      {inlineEditMode ? (
                        <div className="flex items-center gap-2 flex-1 pr-2">
                          <input
                            type="text"
                            value={milestone.label}
                            onChange={(e) => updatePaymentMilestone(idx, "label", e.target.value)}
                            className="flex-1 text-[11px] font-medium border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                          />
                          <span className="font-mono text-neutral-500">{currency}</span>
                          <input
                            type="number"
                            value={milestone.amount}
                            onChange={(e) =>
                              updatePaymentMilestone(idx, "amount", Number(e.target.value) || 0)
                            }
                            className="w-20 text-right font-bold border-b border-dashed border-blue-400 bg-transparent focus:outline-none"
                          />
                          <button
                            onClick={() => removePaymentMilestone(idx)}
                            className="text-neutral-400 hover:text-rose-500 p-0.5 print:hidden cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-neutral-600 font-medium">
                            {milestone.label}
                          </span>
                          <span className="font-manrope font-bold text-neutral-900">
                            {currency}
                            {Number(milestone.amount).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  ))}

                  {/* Add Payment Milestone in Edit Mode */}
                  {inlineEditMode && (
                    <div className="px-4 py-2 bg-neutral-50 flex justify-end print:hidden">
                      <button
                        onClick={addPaymentMilestone}
                        className="text-[11px] font-semibold text-[#1a56db] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Payment Milestone</span>
                      </button>
                    </div>
                  )}

                  {/* Highlight Row: Total Amount Received */}
                  <div className="px-4 py-3 bg-[#dcfce7] flex items-center justify-between font-manrope font-black text-neutral-950 text-sm">
                    <span className="uppercase tracking-wider">
                      TOTAL AMOUNT RECEIVED
                    </span>
                    <span className="text-base text-emerald-900 font-black">
                      {currency}
                      {totalReceived.toLocaleString()}
                    </span>
                  </div>

                  {/* If balance due exists */}
                  {balanceDue > 0 && (
                    <div className="px-4 py-2.5 bg-amber-50 flex items-center justify-between font-manrope font-bold text-amber-900 text-xs">
                      <span className="uppercase tracking-wider">BALANCE DUE</span>
                      <span className="text-sm font-black text-amber-700">
                        {currency}
                        {balanceDue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rubber Stamp & Script Thank You Section */}
              <div className="flex items-center justify-between pt-6 px-2 mt-auto">
                {/* Green/Blue Authentic Rubber Stamp */}
                {meta.stamp_type !== "NONE" && (
                  <div
                    className="relative transform -rotate-12 select-none"
                    style={{
                      filter:
                        balanceDue === 0
                          ? "drop-shadow(0 2px 4px rgba(16, 185, 129, 0.15))"
                          : "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.15))",
                    }}
                  >
                    <div
                      className={`w-36 h-36 rounded-full border-4 p-1 flex items-center justify-center ${balanceDue === 0
                          ? "border-emerald-700"
                          : totalReceived > 0
                            ? "border-blue-700"
                            : "border-amber-600"
                        }`}
                    >
                      <div
                        className={`w-full h-full rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-2 ${balanceDue === 0
                            ? "border-emerald-700 text-emerald-800"
                            : totalReceived > 0
                              ? "border-blue-700 text-blue-800"
                              : "border-amber-600 text-amber-800"
                          }`}
                      >
                        <span className="text-[9px] font-black font-manrope tracking-widest uppercase">
                          {balanceDue === 0 ? "FULL PAYMENT" : totalReceived > 0 ? "PARTIAL PAYMENT" : "PAYMENT DUE"}
                        </span>
                        <div className="text-[9px] tracking-widest -my-0.5">
                          ★★★
                        </div>
                        <span className="text-3xl font-black font-manrope tracking-wider my-0.5 leading-none">
                          {balanceDue === 0 ? "PAID" : totalReceived > 0 ? "PARTIAL" : "PENDING"}
                        </span>
                        <div className="text-[9px] tracking-widest -my-0.5">
                          ★★★
                        </div>
                        <span className="text-[9px] font-black font-manrope tracking-widest uppercase">
                          {meta.stamp_bottom_text || "THANK YOU"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Script Thank You & Tagline */}
                <div className="flex flex-col items-start pl-4">
                  <span
                    className="text-4xl text-neutral-900 select-none mb-1"
                    style={{
                      fontFamily: "Brush Script MT, cursive, Georgia, serif",
                    }}
                  >
                    Thank You!
                  </span>
                  <div className="w-16 h-0.5 bg-neutral-900 mb-2" />
                  <span className="text-[10px] font-black font-mono tracking-wider text-neutral-900 uppercase">
                    LET&apos;S BUILD
                  </span>
                  <span className="text-[10px] font-bold font-mono tracking-wider text-neutral-700 uppercase">
                    WHAT&apos;S NEXT TOGETHER.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER SECTION WITH DECORATIVE ACCENT ================= */}
        <div className="relative pt-8 mt-10 border-t border-neutral-200">
          {/* Decorative Bottom-Right Geometric Waves matching image */}
          <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden w-64 h-24 hidden sm:block">
            <svg
              viewBox="0 0 260 100"
              fill="none"
              className="absolute right-0 bottom-0 w-full h-full"
            >
              <path
                d="M100 100 C 160 80, 200 40, 260 0 L 260 100 Z"
                fill="#0f172a"
              />
              <path
                d="M140 100 C 190 85, 230 50, 260 20 L 260 100 Z"
                fill="#1a56db"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 font-inter gap-4">
            {/* Left: Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-neutral-800">
                <Globe className="w-3.5 h-3.5 text-[#1a56db]" />
                www.nylex.online
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span className="flex items-center gap-1 text-neutral-800">
                <Phone className="w-3.5 h-3.5 text-[#1a56db]" />
                +91 89214 42748
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span className="flex items-center gap-1 text-neutral-800">
                <Mail className="w-3.5 h-3.5 text-[#1a56db]" />
                buildwithnylex@gmail.com
              </span>
            </div>

            {/* Right: Slogan & Mini Logo */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-neutral-400">
                  LET&apos;S BUILD
                </span>
                <span className="text-[10px] font-mono font-black tracking-wider uppercase text-neutral-900">
                  WHAT&apos;S NEXT.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/nylex-icon.png"
                  alt="Nylex Logo"
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-base font-black font-manrope tracking-[0.2em] text-neutral-950">
                  NYLEX
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* ================= EDIT INVOICE MODAL ================= */}
      <InvoiceEditorModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialData={invData}
        onSave={(data) => handleSaveInvoice(data)}
      />
    </div>
  );
}
