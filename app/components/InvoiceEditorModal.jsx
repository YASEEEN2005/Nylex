"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Code2,
  Globe,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  CreditCard,
  FileText,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Wand2,
} from "lucide-react";

export const ICON_OPTIONS = [
  { id: "code", label: "Code / Dev", icon: Code2 },
  { id: "domain", label: "Domain / Web", icon: Globe },
  { id: "design", label: "UI/UX Design", icon: Palette },
  { id: "server", label: "Server / Cloud", icon: Server },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "default", label: "Document", icon: FileText },
];

export const PAYMENT_METHODS = [
  { id: "gpay", label: "Google Pay (GPay)", badge: "UPI (GPay)" },
  { id: "phonepe", label: "PhonePe", badge: "UPI (PhonePe)" },
  { id: "paytm", label: "Paytm", badge: "UPI (Paytm)" },
  { id: "bank", label: "Bank Transfer (NEFT/IMPS)", badge: "Direct Bank Transfer" },
  { id: "cash", label: "Cash / Direct", badge: "Cash Payment" },
];

export const DEFAULT_TEMPLATE = {
  invoice_number: "INX-FP-431",
  issue_date: new Date().toISOString().split("T")[0],
  due_date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
  client_name: "DK Dance Company (DKDC)",
  client_company: "DK Dance Company",
  client_email: "dkdc.official@gmail.com",
  client_phone: "+91 99952 72083",
  status: "Paid",
  notes: "Thank you for choosing Nylex.",
  items: [
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
  ],
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
    highlight_cards: [
      {
        id: "1",
        label: "PROJECT COST",
        amount: "₹14,000",
        subtitle: "(Website Design & Development)",
        icon: "default",
      },
      {
        id: "2",
        label: "DOMAIN CHARGES (EXTRA)",
        amount: "₹500",
        subtitle: "(.com Domain – Not Included in Project Cost)",
        icon: "domain",
      },
    ],
    breakdown_rows: [
      { id: "b1", label: "Total Project Cost", amount: 14000 },
      { id: "b2", label: "Domain Charges (Extra)", amount: 500 },
    ],
    payment_breakdown: [
      { id: "p1", label: "Advance Received (Paid on 21/10/2026)", amount: 2000 },
      { id: "p2", label: "Second Payment Received (Paid on 31/10/2026)", amount: 2500 },
      { id: "p3", label: "Final Payment Received (Paid on 31/10/2026)", amount: 10000 },
    ],
    notes_list: [
      "This invoice acknowledges the receipt of the full payment for the website project.",
      "Project Cost: ₹14,000",
      "Domain Upgrade (.com): ₹500 (Extra)",
      "Total Amount Received: ₹14,500 (Fully Paid)",
      "Thank you for choosing Nylex.",
    ],
  },
};

export default function InvoiceEditorModal({
  isOpen,
  onClose,
  initialData = null,
  onSave,
}) {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoice_number: "",
    issue_date: new Date().toISOString().split("T")[0],
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    client_name: "",
    client_company: "",
    client_email: "",
    client_phone: "",
    status: "Paid",
    notes: "Thank you for choosing Nylex.",
    items: [
      {
        description: "Website Design and Development",
        subtitle: "Complete Website Design and Development (Project Cost)",
        icon: "code",
        quantity: 1,
        price: 14000,
        amount: 14000,
      },
    ],
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
      highlight_cards: [
        {
          id: "1",
          label: "PROJECT COST",
          amount: "₹14,000",
          subtitle: "(Website Design & Development)",
          icon: "default",
        },
        {
          id: "2",
          label: "DOMAIN CHARGES (EXTRA)",
          amount: "₹500",
          subtitle: "(.com Domain – Not Included in Project Cost)",
          icon: "domain",
        },
      ],
      breakdown_rows: [
        { id: "b1", label: "Total Project Cost", amount: 14000 },
        { id: "b2", label: "Domain Charges (Extra)", amount: 500 },
      ],
      payment_breakdown: [
        { id: "p1", label: "Advance Received (Paid on 21/10/2026)", amount: 2000 },
        { id: "p2", label: "Second Payment Received (Paid on 31/10/2026)", amount: 2500 },
        { id: "p3", label: "Final Payment Received (Paid on 31/10/2026)", amount: 10000 },
      ],
      notes_list: [
        "This invoice acknowledges the receipt of the full payment for the website project.",
        "Project Cost: ₹14,000",
        "Domain Upgrade (.com): ₹500 (Extra)",
        "Total Amount Received: ₹14,500 (Fully Paid)",
        "Thank you for choosing Nylex.",
      ],
    },
  });

  useEffect(() => {
    if (initialData) {
      const cur = initialData.meta?.currency || "₹";
      const items =
        initialData.items && initialData.items.length > 0
          ? initialData.items.map((it) => ({
              id: it.id,
              description: it.description || "",
              subtitle: it.subtitle || "",
              icon: it.icon || "code",
              quantity: Number(it.quantity) || 1,
              price: Number(it.price) || 0,
              amount: (Number(it.quantity) || 1) * (Number(it.price) || 0),
            }))
          : [
              {
                description: "Website Design and Development",
                subtitle: "Complete Website Design and Development (Project Cost)",
                icon: "code",
                quantity: 1,
                price: 14000,
                amount: 14000,
              },
            ];

      const rawMeta =
        typeof initialData.meta === "object" && initialData.meta ? initialData.meta : {};
      const calculatedTotal = items.reduce((s, it) => s + it.amount, 0);

      // Derive highlight cards from actual items if not explicitly set
      const highlightCards =
        rawMeta.highlight_cards && rawMeta.highlight_cards.length > 0
          ? rawMeta.highlight_cards
          : items.slice(0, 2).map((it, idx) => ({
              id: `card-${idx}`,
              label: it.description.toUpperCase(),
              amount: `${cur}${Number(it.amount).toLocaleString()}`,
              subtitle: it.subtitle ? `(${it.subtitle})` : "",
              icon: it.icon || (idx === 0 ? "default" : "domain"),
            }));

      // Derive breakdown rows from actual items
      const breakdownRows =
        rawMeta.breakdown_rows && rawMeta.breakdown_rows.length > 0
          ? rawMeta.breakdown_rows
          : items.map((it, idx) => ({
              id: `b-${idx}`,
              label: it.description,
              amount: it.amount,
            }));

      // Derive payment breakdown from actual paid_amount or payments
      const paymentBreakdown =
        rawMeta.payment_breakdown && rawMeta.payment_breakdown.length > 0
          ? rawMeta.payment_breakdown
          : [
              {
                id: "p1",
                label: `Payment Received (Paid on ${new Date().toLocaleDateString("en-GB")})`,
                amount: Number(initialData.paid_amount) || calculatedTotal,
              },
            ];

      // Derive notes list from actual figures
      const notesList =
        rawMeta.notes_list && rawMeta.notes_list.length > 0
          ? rawMeta.notes_list
          : [
              `This invoice acknowledges the receipt of the payment for ${initialData.client_name || "the project"}.`,
              ...items.map((it) => `${it.description}: ${cur}${it.amount.toLocaleString()}`),
              `Total Amount Received: ${cur}${paymentBreakdown.reduce((s, p) => s + (Number(p.amount) || 0), 0).toLocaleString()}`,
              "Thank you for choosing Nylex.",
            ];

      setFormData({
        id: initialData.id,
        invoice_number: initialData.invoice_number || "INX-FP-431",
        issue_date: initialData.issue_date
          ? new Date(initialData.issue_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        due_date: initialData.due_date
          ? new Date(initialData.due_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        client_name: initialData.client_name || "",
        client_company: initialData.client_company || "",
        client_email: initialData.client_email || "",
        client_phone: initialData.client_phone || "",
        status: initialData.status || "Paid",
        notes: initialData.notes || "Thank you for choosing Nylex.",
        items,
        meta: {
          title: rawMeta.title || "Full Payment",
          tagline: rawMeta.tagline || "FAST. MODERN. SCALABLE.",
          client_director: rawMeta.client_director || "Director: Dhanesh Krishnan",
          client_address: rawMeta.client_address || "Kozhikode, Kerala",
          from_name: rawMeta.from_name || "Nylex",
          from_phone: rawMeta.from_phone || "+91 89214 42748",
          from_email: rawMeta.from_email || "buildwithnylex@gmail.com",
          from_website: rawMeta.from_website || "nylex.online",
          currency: cur,
          payment_method: rawMeta.payment_method || "gpay",
          payment_method_label: rawMeta.payment_method_label || "UPI (GPay)",
          stamp_type: rawMeta.stamp_type || "PAID",
          stamp_top_text: rawMeta.stamp_top_text || "FULL PAYMENT",
          stamp_main_text: rawMeta.stamp_main_text || "PAID",
          stamp_bottom_text: rawMeta.stamp_bottom_text || "THANK YOU",
          highlight_cards: highlightCards,
          breakdown_rows: breakdownRows,
          payment_breakdown: paymentBreakdown,
          notes_list: notesList,
        },
      });
    } else {
      setFormData(DEFAULT_TEMPLATE);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Helper calculation
  const subtotal = formData.items.reduce(
    (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.price) || 0),
    0
  );
  const totalPaid = (formData.meta?.payment_breakdown || []).reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  );

  const handleMetaChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [key]: value,
      },
    }));
  };

  // Item management
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          subtitle: "",
          icon: "code",
          quantity: 1,
          price: 0,
          amount: 0,
        },
      ],
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData((prev) => {
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

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Highlight Cards management
  const addHighlightCard = () => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        highlight_cards: [
          ...(prev.meta.highlight_cards || []),
          {
            id: Date.now().toString(),
            label: "EXTRA CHARGES",
            amount: "₹0",
            subtitle: "(Description)",
            icon: "default",
          },
        ],
      },
    }));
  };

  const updateHighlightCard = (index, field, value) => {
    setFormData((prev) => {
      const cards = [...(prev.meta.highlight_cards || [])];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        meta: { ...prev.meta, highlight_cards: cards },
      };
    });
  };

  const removeHighlightCard = (index) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        highlight_cards: prev.meta.highlight_cards.filter((_, i) => i !== index),
      },
    }));
  };

  // Payment Breakdown Installments management
  const addPaymentMilestone = () => {
    setFormData((prev) => ({
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

  const updatePaymentMilestone = (index, field, value) => {
    setFormData((prev) => {
      const breakdown = [...(prev.meta.payment_breakdown || [])];
      breakdown[index] = { ...breakdown[index], [field]: value };
      return {
        ...prev,
        meta: { ...prev.meta, payment_breakdown: breakdown },
      };
    });
  };

  const removePaymentMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        payment_breakdown: prev.meta.payment_breakdown.filter((_, i) => i !== index),
      },
    }));
  };

  // Notes List management
  const addNote = () => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        notes_list: [...(prev.meta.notes_list || []), ""],
      },
    }));
  };

  const updateNote = (index, value) => {
    setFormData((prev) => {
      const notesList = [...(prev.meta.notes_list || [])];
      notesList[index] = value;
      return {
        ...prev,
        meta: { ...prev.meta, notes_list: notesList },
      };
    });
  };

  const removeNote = (index) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        notes_list: prev.meta.notes_list.filter((_, i) => i !== index),
      },
    }));
  };

  // Auto-sync Breakdown & Highlights with line items
  const autoSyncFromItems = () => {
    const cur = formData.meta.currency || "₹";
    const cards = formData.items.map((it, idx) => ({
      id: `card-${idx}`,
      label: it.description.toUpperCase(),
      amount: `${cur}${Number(it.amount || 0).toLocaleString()}`,
      subtitle: it.subtitle ? `(${it.subtitle})` : "",
      icon: it.icon || "default",
    }));

    const breakdown = formData.items.map((it, idx) => ({
      id: `row-${idx}`,
      label: it.description,
      amount: Number(it.amount || 0),
    }));

    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        highlight_cards: cards,
        breakdown_rows: breakdown,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-neutral-200/90 rounded-3xl w-full max-w-4xl shadow-2xl my-auto flex flex-col max-h-[92vh] overflow-hidden text-neutral-900 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200/80 bg-neutral-50/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00507D] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-manrope text-base font-bold text-neutral-950">
                {formData.id ? "Edit Modern Nylex Invoice" : "Create Modern Nylex Invoice"}
              </h3>
              <p className="text-xs text-neutral-500 font-inter">
                Configure items, client info, payments breakdown, and stamps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormData(DEFAULT_TEMPLATE)}
              className="px-3 py-1.5 rounded-full bg-blue-50 text-[#00507D] border border-blue-200/70 text-xs font-semibold hover:bg-blue-100 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset fields with the exact sample from reference"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Load Template</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-200/80 bg-white shrink-0 overflow-x-auto">
          {[
            { id: "general", label: "1. Basic & Client" },
            { id: "items", label: "2. Line Items" },
            { id: "highlights", label: "3. Summary Cards" },
            { id: "payments", label: "4. Payments & Breakdown" },
            { id: "notes", label: "5. Notes & Stamp" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 font-inter transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id
                  ? "border-[#00507D] text-[#00507D]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: GENERAL & CLIENT */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="bg-[#f0f9ff]/50 border border-[#00507D]/15 rounded-2xl p-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00507D] mb-3">
                  Invoice Header & Document Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Invoice Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. INX-FP-431"
                      value={formData.invoice_number}
                      onChange={(e) =>
                        setFormData({ ...formData, invoice_number: e.target.value })
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono font-bold text-[#00507D] focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Invoice Title / Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Full Payment / Advance"
                      value={formData.meta.title || ""}
                      onChange={(e) => handleMetaChange("title", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs focus:border-[#00507D] focus:outline-none"
                    />
                    <span className="text-[10px] text-neutral-400">
                      Renders as: &quot;Invoice for [Title]&quot;
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Currency Symbol
                    </label>
                    <select
                      value={formData.meta.currency || "₹"}
                      onChange={(e) => handleMetaChange("currency", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold focus:border-[#00507D] focus:outline-none"
                    >
                      <option value="₹">₹ (INR - Indian Rupee)</option>
                      <option value="$">$ (USD)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="£">£ (GBP)</option>
                      <option value="AED">AED (Dirham)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      value={formData.issue_date}
                      onChange={(e) =>
                        setFormData({ ...formData, issue_date: e.target.value })
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Payment Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold focus:border-[#00507D] focus:outline-none"
                    >
                      <option value="Paid">Paid (Full Payment)</option>
                      <option value="Partial">Partial Payment</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Tagline (Top Right)
                    </label>
                    <input
                      type="text"
                      placeholder="FAST. MODERN. SCALABLE."
                      value={formData.meta.tagline || "FAST. MODERN. SCALABLE."}
                      onChange={(e) => handleMetaChange("tagline", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono uppercase focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Billed To (Client Details) */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Client & Billed To Information (TO)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Client / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DK Dance Company (DKDC)"
                      value={formData.client_name}
                      onChange={(e) =>
                        setFormData({ ...formData, client_name: e.target.value })
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs font-bold text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Director / Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Director: Dhanesh Krishnan"
                      value={formData.meta.client_director || ""}
                      onChange={(e) =>
                        handleMetaChange("client_director", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Client Phone
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 99952 72083"
                      value={formData.client_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, client_phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs font-mono focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Client Location / Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kozhikode, Kerala"
                      value={formData.meta.client_address || ""}
                      onChange={(e) =>
                        handleMetaChange("client_address", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* From Info */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  From (Nylex Details)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={formData.meta.from_name || "Nylex"}
                      onChange={(e) => handleMetaChange("from_name", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-bold focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={formData.meta.from_phone || "+91 89214 42748"}
                      onChange={(e) => handleMetaChange("from_phone", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-mono focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.meta.from_email || "buildwithnylex@gmail.com"}
                      onChange={(e) => handleMetaChange("from_email", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-mono focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.meta.from_website || "nylex.online"}
                      onChange={(e) => handleMetaChange("from_website", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-mono focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LINE ITEMS */}
          {activeTab === "items" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Billable Line Items
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Each item shows in the blue-header table with an icon, title, subtitle & price
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00507D] text-white text-xs font-semibold hover:bg-[#003d5f] transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-white hover:border-[#00507D]/40 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#00507D] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#00507D]/10 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        Line Item #{idx + 1}
                      </span>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                      {/* Icon selector */}
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Icon
                        </label>
                        <select
                          value={item.icon || "code"}
                          onChange={(e) => updateItem(idx, "icon", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-2.5 py-2 text-xs focus:border-[#00507D] focus:outline-none"
                        >
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Title */}
                      <div className="sm:col-span-5">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Item Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Website Design and Development"
                          value={item.description}
                          onChange={(e) => updateItem(idx, "description", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold focus:border-[#00507D] focus:outline-none"
                        />
                      </div>

                      {/* Qty */}
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Qty
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono text-center focus:border-[#00507D] focus:outline-none"
                        />
                      </div>

                      {/* Price */}
                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Price ({formData.meta.currency || "₹"})
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => updateItem(idx, "price", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono font-bold text-right focus:border-[#00507D] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Subtitle / Note */}
                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                        Subtitle / Details Note (shown underneath item title)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Complete Website Design and Development (Project Cost)"
                        value={item.subtitle || ""}
                        onChange={(e) => updateItem(idx, "subtitle", e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600 focus:border-[#00507D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block">
                    Subtotal: {formData.meta.currency || "₹"}
                    {subtotal.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Sync will generate matching summary badges and breakdown rows
                  </span>
                </div>
                <button
                  type="button"
                  onClick={autoSyncFromItems}
                  className="px-4 py-2 rounded-full bg-white border border-[#00507D]/30 text-[#00507D] font-semibold text-xs hover:bg-[#00507D] hover:text-white transition-all cursor-pointer shadow-2xs"
                >
                  Sync to Summary Cards
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SUMMARY CARDS (LEFT COLUMN BADGES) */}
          {activeTab === "highlights" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Summary Cards (Left Column Badges)
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Big blue highlight boxes like &quot;PROJECT COST: ₹14,000&quot; &amp; &quot;DOMAIN CHARGES: ₹500&quot;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addHighlightCard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00507D] text-white text-xs font-semibold hover:bg-[#003d5f] transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Highlight Card</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.meta.highlight_cards || []).map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-4 rounded-2xl border border-blue-100 bg-[#eef5fc]/60 hover:bg-[#eef5fc] transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#00507D]">
                        Badge #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeHighlightCard(idx)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Icon
                        </label>
                        <select
                          value={card.icon || "default"}
                          onChange={(e) => updateHighlightCard(idx, "icon", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-2.5 py-2 text-xs focus:border-[#00507D] focus:outline-none"
                        >
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-5">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. PROJECT COST"
                          value={card.label}
                          onChange={(e) => updateHighlightCard(idx, "label", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono uppercase font-bold focus:border-[#00507D] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                          Displayed Amount
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹14,000"
                          value={card.amount}
                          onChange={(e) => updateHighlightCard(idx, "amount", e.target.value)}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono font-black text-[#00507D] focus:border-[#00507D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1 font-bold">
                        Subtitle Note
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. (Website Design & Development)"
                        value={card.subtitle || ""}
                        onChange={(e) => updateHighlightCard(idx, "subtitle", e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600 focus:border-[#00507D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS & BREAKDOWN */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              {/* Payment Method Selector */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Payment Method (Displayed on Invoice)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Method Type
                    </label>
                    <select
                      value={formData.meta.payment_method || "gpay"}
                      onChange={(e) => {
                        const m = PAYMENT_METHODS.find((pm) => pm.id === e.target.value);
                        handleMetaChange("payment_method", e.target.value);
                        if (m) handleMetaChange("payment_method_label", m.badge);
                      }}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold focus:border-[#00507D] focus:outline-none"
                    >
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>
                          {pm.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Method Subtitle / Badge Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UPI (GPay)"
                      value={formData.meta.payment_method_label || "UPI (GPay)"}
                      onChange={(e) =>
                        handleMetaChange("payment_method_label", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Installment / Payment Received Milestones */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      Payment Received Milestones / Installments
                    </h4>
                    <p className="text-xs text-neutral-500">
                      e.g. &quot;Advance Received (Paid on 21/10/2026): ₹2,000&quot;
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addPaymentMilestone}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00507D] text-white text-xs font-semibold hover:bg-[#003d5f] transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.meta.payment_breakdown || []).map((milestone, idx) => (
                    <div
                      key={milestone.id || idx}
                      className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200/80 bg-white"
                    >
                      <input
                        type="text"
                        placeholder="e.g. Advance Received (Paid on 21/10/2026)"
                        value={milestone.label}
                        onChange={(e) =>
                          updatePaymentMilestone(idx, "label", e.target.value)
                        }
                        className="flex-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium focus:border-[#00507D] focus:outline-none"
                      />
                      <div className="w-36 flex items-center gap-1">
                        <span className="text-xs font-mono text-neutral-500">
                          {formData.meta.currency || "₹"}
                        </span>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={milestone.amount}
                          onChange={(e) =>
                            updatePaymentMilestone(
                              idx,
                              "amount",
                              Number(e.target.value) || 0
                            )
                          }
                          className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-mono font-bold text-emerald-600 text-right focus:border-[#00507D] focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePaymentMilestone(idx)}
                        className="text-neutral-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-mono">
                  <span className="font-bold text-emerald-900">
                    Total Amount Received:
                  </span>
                  <span className="font-black text-sm text-emerald-700">
                    {formData.meta.currency || "₹"}
                    {totalPaid.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: NOTES & RUBBER STAMP */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              {/* Rubber Stamp Configuration */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Circular Rubber Stamp
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Stamp Visibility / Type
                    </label>
                    <select
                      value={formData.meta.stamp_type || "PAID"}
                      onChange={(e) => handleMetaChange("stamp_type", e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold focus:border-[#00507D] focus:outline-none"
                    >
                      <option value="PAID">Green &quot;PAID&quot; Stamp</option>
                      <option value="PARTIAL">Blue &quot;PARTIAL&quot; Stamp</option>
                      <option value="PENDING">Amber &quot;PENDING&quot; Stamp</option>
                      <option value="NONE">No Stamp</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Top Arc Text
                    </label>
                    <input
                      type="text"
                      placeholder="FULL PAYMENT"
                      value={formData.meta.stamp_top_text || "FULL PAYMENT"}
                      onChange={(e) =>
                        handleMetaChange("stamp_top_text", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono uppercase focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Center Big Text
                    </label>
                    <input
                      type="text"
                      placeholder="PAID"
                      value={formData.meta.stamp_main_text || "PAID"}
                      onChange={(e) =>
                        handleMetaChange("stamp_main_text", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono uppercase font-black focus:border-[#00507D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Bottom Arc Text
                    </label>
                    <input
                      type="text"
                      placeholder="THANK YOU"
                      value={formData.meta.stamp_bottom_text || "THANK YOU"}
                      onChange={(e) =>
                        handleMetaChange("stamp_bottom_text", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-mono uppercase focus:border-[#00507D] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      Invoice Notes &amp; Terms (Bullet Points)
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Displayed on the bottom left under the payment method
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addNote}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00507D] text-white text-xs font-semibold hover:bg-[#003d5f] transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.meta.notes_list || []).map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 text-center text-neutral-400 font-bold">•</span>
                      <input
                        type="text"
                        placeholder="e.g. This invoice acknowledges the receipt of the full payment..."
                        value={note}
                        onChange={(e) => updateNote(idx, e.target.value)}
                        className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-800 focus:bg-white focus:border-[#00507D] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeNote(idx)}
                        className="text-neutral-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 shrink-0">
            <span className="text-xs font-mono text-neutral-500">
              Total Billable:{" "}
              <strong className="text-neutral-900">
                {formData.meta.currency || "₹"}
                {subtotal.toLocaleString()}
              </strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>{formData.id ? "Save & Update Invoice" : "Generate Invoice"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

