"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  LogOut,
  FolderPlus,
  Users,
  FileText,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Printer,
  CheckCircle,
  Clock,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Upload,
  Image as ImageIcon,
  Star,
  Check,
  X,
  Eye,
  CreditCard,
  Receipt,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function AdminPortal() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Auth Form State
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Data States
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Modals State
  const [projectModal, setProjectModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [activeInvoiceForPayment, setActiveInvoiceForPayment] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [testimonialModal, setTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "Client",
    company: "",
    quote: "",
    rating: 5,
    avatar_url: "",
    is_approved: true,
  });

  // Cloudinary Upload Loading State
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Models
  const [projectForm, setProjectForm] = useState({
    title: "",
    link: "",
    category: "webdev",
    type: "Web Development",
    description: "",
    image_url: "",
    image_public_id: "",
    tags: ["React", "Next.js", "Tailwind CSS"],
    result: "100% Custom Build",
    order_index: 0,
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "Active",
    logo_url: "",
    logo_public_id: "",
    notes: "",
  });

  const [invoiceForm, setInvoiceForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_company: "",
    due_date: "",
    items: [
      { description: "Custom Web Application Development", quantity: 1, price: 1500, amount: 1500 },
    ],
    tax: 0,
    discount: 0,
    notes: "Thank you for partnering with NYLEX DIGITAL STUDIO.",
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    payment_method: "Bank Transfer",
    transaction_reference: "",
    receipt_url: "",
    receipt_public_id: "",
    notes: "",
  });

  // Check auth session on load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          fetchAllData();
        }
      }
    } catch (err) {
      console.error("Session check error", err);
    } finally {
      setAuthChecked(true);
    }
  };

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [resP, resC, resI, resE, resT, resS] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/clients"),
        fetch("/api/invoices"),
        fetch("/api/enquiries"),
        fetch("/api/testimonials?all=true"),
        fetch("/api/analytics"),
      ]);

      const parseJsonSafe = async (res) => {
        if (!res) return null;
        if (res.ok) {
          return await res.json();
        }
        return null;
      };

      const dataP = await parseJsonSafe(resP);
      const dataC = await parseJsonSafe(resC);
      const dataI = await parseJsonSafe(resI);
      const dataE = await parseJsonSafe(resE);
      const dataT = await parseJsonSafe(resT);
      const dataS = await parseJsonSafe(resS);

      if (dataP?.success) setProjects(dataP.projects);
      if (dataC?.success) setClients(dataC.clients);
      if (dataI?.success) setInvoices(dataI.invoices);
      if (dataE?.success) setEnquiries(dataE.enquiries);
      if (dataT?.success) setTestimonials(dataT.testimonials);
      if (dataS?.success) setStats(dataS.stats);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthenticated(true);
        fetchAllData();
      } else {
        setLoginError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setLoginError("Network connection error.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  };

  // --- Cloudinary File Uploader Helper ---
  const handleFileUpload = async (e, folder, onUploadSuccess) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onUploadSuccess(data.url, data.public_id);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Failed to upload image to Cloudinary.");
    } finally {
      setUploadingImage(false);
    }
  };

  // --- Project Handlers ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });
      if (res.ok) {
        setProjectModal(false);
        setEditingId(null);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  // --- Client Handlers ---
  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/clients/${editingId}` : "/api/clients";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      });
      if (res.ok) {
        setClientModal(false);
        setEditingId(null);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClient = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  // --- Invoice & Payment Handlers ---
  const handleAddItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      items: [...invoiceForm.items, { description: "", quantity: 1, price: 0, amount: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = invoiceForm.items.filter((_, idx) => idx !== index);
    setInvoiceForm({ ...invoiceForm, items: newItems });
  };

  const handleUpdateItem = (index, field, value) => {
    const updated = [...invoiceForm.items];
    updated[index][field] = value;
    if (field === "quantity" || field === "price") {
      const qty = Number(field === "quantity" ? value : updated[index].quantity) || 0;
      const price = Number(field === "price" ? value : updated[index].price) || 0;
      updated[index].amount = qty * price;
    }
    setInvoiceForm({ ...invoiceForm, items: updated });
  };

  const handleSaveInvoice = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceForm),
      });
      if (res.ok) {
        setInvoiceModal(false);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (!confirm("Delete this invoice?")) return;
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  const openPaymentModal = (inv) => {
    setActiveInvoiceForPayment(inv);
    const balance = Math.max(0, Number(inv.total) - Number(inv.paid_amount || 0));
    setPaymentForm({
      amount: balance > 0 ? balance : "",
      payment_method: "Bank Transfer",
      transaction_reference: "",
      receipt_url: "",
      receipt_public_id: "",
      notes: "",
    });
    setPaymentModal(true);
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    if (!activeInvoiceForPayment) return;
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...paymentForm,
          invoice_id: activeInvoiceForPayment.id,
        }),
      });
      if (res.ok) {
        setPaymentModal(false);
        setActiveInvoiceForPayment(null);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Enquiry Handlers ---
  const handleToggleEnquiryRead = async (id, isRead) => {
    await fetch(`/api/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_read: !isRead }),
    });
    fetchAllData();
  };

  const handleDeleteEnquiry = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  // --- Testimonial Handlers ---
  const handleToggleTestimonial = async (id, isApproved) => {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_approved: !isApproved }),
    });
    fetchAllData();
  };

  const handleOpenAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: "",
      role: "Client",
      company: "",
      quote: "",
      rating: 5,
      avatar_url: "",
      is_approved: true,
    });
    setTestimonialModal(true);
  };

  const handleOpenEditTestimonial = (t) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      name: t.name || "",
      role: t.role || "",
      company: t.company || "",
      quote: t.quote || "",
      rating: t.rating || 5,
      avatar_url: t.avatar_url || "",
      is_approved: t.is_approved !== false,
    });
    setTestimonialModal(true);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials";
    const method = editingTestimonial ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testimonialForm),
    });
    setTestimonialModal(false);
    fetchAllData();
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  // Loading Screen
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center font-inter text-xs text-neutral-500 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#00507D] border-t-transparent animate-spin" />
        <span className="font-mono text-[11px] tracking-wider uppercase">Loading Workspace...</span>
      </div>
    );
  }

  // =========================================================================
  // 1. LOGIN SCREEN (Exact Main Website Style: Clean White, Brand Blue Pill)
  // =========================================================================
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff]/50 via-[#f8fafc] to-white flex items-center justify-center p-4 font-inter selection:bg-[#f0f9ff] selection:text-[#00507D]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-neutral-900/5 relative overflow-hidden"
        >
          {/* Subtle overhead brand blue accent line */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#00507D]/50 to-transparent" />

          {/* Logo & Section Pill */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
              NYLEX DIGITAL STUDIO
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#f0f9ff] border border-[#00507D]/15 flex items-center justify-center text-[#00507D] mb-3 shadow-2xs">
              <Lock className="w-6 h-6" />
            </div>

            <h1 className="font-manrope text-2xl font-bold text-neutral-950 tracking-tight">
              Admin Workspace
            </h1>
            <p className="font-inter text-xs text-neutral-500 mt-1">
              Sign in to manage projects, invoices, clients, and reviews.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-inter text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#00507D] focus:bg-white focus:outline-none transition-colors"
                  placeholder="admin"
                />
                <User className="absolute right-4 top-3.5 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            <div>
              <label className="block font-inter text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Password / Secure Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#00507D] focus:bg-white focus:outline-none transition-colors"
                  placeholder="••••••••••••"
                />
                <Lock className="absolute right-4 top-3.5 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-inter text-center">
                {loginError}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loginLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-[#00507D] hover:bg-[#003e61] text-white font-manrope font-semibold text-sm py-3.5 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loginLoading ? "Authorizing..." : "Enter Workspace"}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <Link
              href="/"
              className="font-inter text-xs font-medium text-neutral-500 hover:text-[#00507D] transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Return to public website</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD (Main Website Aesthetic)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 font-inter flex flex-col selection:bg-[#f0f9ff] selection:text-[#00507D]">
      {/* Top Navbar: Matches Website Scrolled Header */}
      <header className="h-16 sm:h-18 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00507D] flex items-center justify-center font-manrope font-extrabold text-white text-base shadow-xs">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-manrope text-base font-bold text-neutral-950 tracking-tight">
                NYLEX STUDIO
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                PostgreSQL Live
              </span>
            </div>
            <p className="hidden sm:block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              Management Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-[#f0f9ff] text-neutral-700 hover:text-[#00507D] border border-neutral-200/80 text-xs font-medium transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-semibold font-inter transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "projects", label: "Projects", icon: FolderPlus, count: projects.length },
            { id: "clients", label: "Clients", icon: Users, count: clients.length },
            { id: "invoices", label: "Invoices & Payments", icon: FileText, count: invoices.length },
            { id: "enquiries", label: "Inquiries", icon: MessageSquare, count: stats?.unreadEnquiries || 0 },
            { id: "testimonials", label: "Reviews", icon: Star, count: testimonials.length },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 md:shrink ${
                  active
                    ? "bg-[#00507D] text-white font-semibold shadow-md shadow-[#00507D]/20"
                    : "bg-white md:bg-transparent border border-neutral-200/70 md:border-transparent text-neutral-600 hover:text-[#00507D] hover:bg-[#f0f9ff]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span className="font-manrope">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`ml-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      active ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 min-w-0">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW METRICS                                   */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Top Banner */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9ff] text-[#00507D] text-[11px] font-semibold uppercase tracking-wider mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00507D]" />
                  STUDIO OVERVIEW
                </div>
                <h2 className="font-manrope text-2xl sm:text-3xl font-bold text-neutral-950">
                  Welcome to NYLEX Digital Studio
                </h2>
                <p className="mt-1 font-inter text-sm text-neutral-600">
                  Manage your portfolio, client billing, lead inquiries, and user reviews in one place.
                </p>
              </div>

              {/* 4 Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs hover:border-[#00507D]/30 transition-all">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Total Invoiced
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950 mt-1">
                    ${stats?.totalBilled?.toLocaleString() || "0"}
                  </p>
                  <span className="font-mono text-xs font-semibold text-emerald-600 mt-2 block">
                    ${stats?.totalCollected?.toLocaleString() || "0"} Collected
                  </span>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs hover:border-[#00507D]/30 transition-all">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Pending Receivables
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
                    ${stats?.totalPending?.toLocaleString() || "0"}
                  </p>
                  <span className="font-mono text-xs text-neutral-500 mt-2 block">
                    {stats?.invoicesCount || 0} Invoices Issued
                  </span>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs hover:border-[#00507D]/30 transition-all">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Portfolio Projects
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950 mt-1">
                    {stats?.projects || 0}
                  </p>
                  <span className="font-mono text-xs text-neutral-500 mt-2 block">
                    {stats?.clients || 0} Registered Clients
                  </span>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs hover:border-[#00507D]/30 transition-all">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Client Inquiries
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-[#00507D] mt-1">
                    {stats?.unreadEnquiries || 0}
                  </p>
                  <span className="font-mono text-xs text-neutral-500 mt-2 block">
                    {stats?.testimonials || 0} Client Reviews
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
                <h3 className="font-manrope text-lg font-bold text-neutral-950 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setProjectForm({
                        title: "",
                        link: "",
                        category: "webdev",
                        type: "Web Development",
                        description: "",
                        image_url: "",
                        image_public_id: "",
                        tags: ["Next.js", "Tailwind CSS"],
                        result: "100% Custom Build",
                        order_index: projects.length + 1,
                      });
                      setEditingId(null);
                      setProjectModal(true);
                    }}
                    className="p-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:border-[#00507D]/40 hover:bg-white text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] text-[#00507D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FolderPlus className="w-5 h-5" />
                    </div>
                    <h4 className="font-manrope text-sm font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                      Add Project
                    </h4>
                    <p className="font-inter text-xs text-neutral-500 mt-1">
                      Upload project screenshot and details
                    </p>
                  </button>

                  <button
                    onClick={() => setInvoiceModal(true)}
                    className="p-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:border-[#00507D]/40 hover:bg-white text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] text-[#00507D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="font-manrope text-sm font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                      Generate Invoice
                    </h4>
                    <p className="font-inter text-xs text-neutral-500 mt-1">
                      Create billable items and PDF document
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setClientForm({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        status: "Active",
                        logo_url: "",
                        logo_public_id: "",
                        notes: "",
                      });
                      setEditingId(null);
                      setClientModal(true);
                    }}
                    className="p-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:border-[#00507D]/40 hover:bg-white text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] text-[#00507D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <h4 className="font-manrope text-sm font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                      Register Client
                    </h4>
                    <p className="font-inter text-xs text-neutral-500 mt-1">
                      Save client contact and company logo
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PROJECTS MANAGEMENT                                */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-manrope text-xl font-bold text-neutral-950">Portfolio Projects</h2>
                  <p className="font-inter text-xs text-neutral-500">
                    Synced in Neon PostgreSQL and Cloudinary Media
                  </p>
                </div>
                <button
                  onClick={() => {
                    setProjectForm({
                      title: "",
                      link: "",
                      category: "webdev",
                      type: "Web Development",
                      description: "",
                      image_url: "",
                      image_public_id: "",
                      tags: ["Next.js", "Tailwind CSS"],
                      result: "100% Custom Build",
                      order_index: projects.length + 1,
                    });
                    setEditingId(null);
                    setProjectModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white text-xs font-semibold font-inter shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs hover:border-[#00507D]/40 transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl bg-neutral-100 border border-neutral-200/80 overflow-hidden relative shrink-0">
                        {proj.image_url ? (
                          <img
                            src={proj.image_url}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-[10px] font-semibold text-[#00507D] bg-[#f0f9ff] px-2 py-0.5 rounded-md uppercase">
                          {proj.type}
                        </span>
                        <h3 className="font-manrope text-base font-bold text-neutral-950 truncate mt-1.5">
                          {proj.title}
                        </h3>
                        <p className="font-inter text-xs text-neutral-500 line-clamp-2 mt-1">
                          {proj.description || "Custom digital solution"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                      {proj.link ? (
                        <a
                          href={proj.link}
                          target="_blank"
                          className="font-inter text-xs font-semibold text-[#00507D] hover:underline flex items-center gap-1"
                        >
                          <span>Visit Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="font-inter text-xs text-neutral-400">No URL</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setProjectForm(proj);
                            setEditingId(proj.id);
                            setProjectModal(true);
                          }}
                          className="p-2 rounded-xl text-neutral-500 hover:text-[#00507D] hover:bg-[#f0f9ff] transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CLIENT MANAGEMENT                                  */}
          {/* ========================================================= */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-manrope text-xl font-bold text-neutral-950">Client Directory</h2>
                  <p className="font-inter text-xs text-neutral-500">
                    Manage client contacts, billing records, and brand logos
                  </p>
                </div>
                <button
                  onClick={() => {
                    setClientForm({
                      name: "",
                      company: "",
                      email: "",
                      phone: "",
                      status: "Active",
                      logo_url: "",
                      logo_public_id: "",
                      notes: "",
                    });
                    setEditingId(null);
                    setClientModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white text-xs font-semibold font-inter shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Client</span>
                </button>
              </div>

              <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs font-inter">
                  <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                    <tr>
                      <th className="p-4 pl-6">Logo</th>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Company</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {clients.map((c) => (
                      <tr key={c.id} className="hover:bg-[#f0f9ff]/40 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/80 overflow-hidden flex items-center justify-center p-1">
                            {c.logo_url ? (
                              <img
                                src={c.logo_url}
                                alt={c.company}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Users className="w-4 h-4 text-neutral-400" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-manrope font-bold text-neutral-950 text-sm">
                          {c.name}
                        </td>
                        <td className="p-4 text-neutral-600">{c.company || "—"}</td>
                        <td className="p-4 font-mono text-[11px] text-neutral-500">
                          {c.email || c.phone || "—"}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => {
                              setClientForm(c);
                              setEditingId(c.id);
                              setClientModal(true);
                            }}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-[#00507D] hover:bg-[#f0f9ff] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(c.id)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: INVOICES & PAYMENTS                                */}
          {/* ========================================================= */}
          {activeTab === "invoices" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-manrope text-xl font-bold text-neutral-950">
                    Invoices & Partial Payments
                  </h2>
                  <p className="font-inter text-xs text-neutral-500">
                    Generate client invoices, track partial payments, and export PDFs
                  </p>
                </div>
                <button
                  onClick={() => setInvoiceModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white text-xs font-semibold font-inter shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Invoice</span>
                </button>
              </div>

              <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs font-inter">
                  <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                    <tr>
                      <th className="p-4 pl-6">Invoice #</th>
                      <th className="p-4">Client</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Paid</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {invoices.map((inv) => {
                      const total = Number(inv.total) || 0;
                      const paid = Number(inv.paid_amount) || 0;
                      return (
                        <tr key={inv.id} className="hover:bg-[#f0f9ff]/40 transition-colors">
                          <td className="p-4 pl-6 font-mono font-bold text-[#00507D]">
                            {inv.invoice_number}
                          </td>
                          <td className="p-4">
                            <span className="font-manrope font-bold text-neutral-950 block">
                              {inv.client_name}
                            </span>
                            <span className="text-[11px] text-neutral-500">
                              {inv.client_company}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-neutral-950">
                            ${total.toLocaleString()}
                          </td>
                          <td className="p-4 font-mono font-semibold text-emerald-600">
                            ${paid.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                                inv.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : inv.status === "Partial"
                                  ? "bg-blue-50 text-[#00507D] border border-[#00507D]/20"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            <button
                              onClick={() => openPaymentModal(inv)}
                              className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-inter text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Record payment"
                            >
                              + Pay
                            </button>
                            <Link
                              href={`/admin/nylex/invoice/${inv.id}`}
                              target="_blank"
                              className="px-3 py-1 rounded-full bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 font-inter text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                            >
                              <Printer className="w-3 h-3" />
                              <span>PDF</span>
                            </Link>
                            <button
                              onClick={() => handleDeleteInvoice(inv.id)}
                              className="p-1.5 text-neutral-400 hover:text-rose-600 inline-block align-middle"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: INQUIRIES FROM CONTACT FORM                        */}
          {/* ========================================================= */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-manrope text-xl font-bold text-neutral-950">Customer Inquiries</h2>
                <p className="font-inter text-xs text-neutral-500">
                  Leads and requests captured directly from the contact section
                </p>
              </div>

              <div className="space-y-3.5">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      enq.is_read
                        ? "bg-white border-neutral-200/70"
                        : "bg-white border-[#00507D]/40 shadow-md shadow-[#00507D]/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-manrope text-sm font-bold text-neutral-950">
                          {enq.name}
                        </span>
                        {!enq.is_read && (
                          <span className="w-2 h-2 rounded-full bg-[#00507D]" />
                        )}
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#f0f9ff] text-[#00507D] font-semibold uppercase">
                          {enq.service}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="font-inter text-xs text-neutral-600 leading-relaxed">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 text-xs">
                      <div className="font-mono text-[11px] text-neutral-500 flex gap-4">
                        {enq.email && <span>Email: {enq.email}</span>}
                        {enq.phone && <span>Phone: {enq.phone}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleEnquiryRead(enq.id, enq.is_read)}
                          className="font-inter text-xs font-semibold text-[#00507D] hover:underline cursor-pointer"
                        >
                          {enq.is_read ? "Mark Unread" : "Mark as Read"}
                        </button>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: CLIENT REVIEWS & PUBLIC SUBMISSIONS                */}
          {/* ========================================================= */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-manrope text-xl font-bold text-neutral-950">
                    Client Reviews & Moderation
                  </h2>
                  <p className="font-inter text-xs text-neutral-500">
                    Manage visitor submissions and verified client reviews ({testimonials.length})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddTestimonial}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00507D] hover:bg-[#003B5C] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-manrope font-bold text-neutral-950 text-sm">
                            {t.name}
                          </span>
                          <span className="font-inter text-xs text-neutral-500 ml-1.5">
                            ({t.role || "Client"})
                          </span>
                        </div>
                        <div className="flex text-amber-400 text-xs">
                          {Array.from({ length: t.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="font-inter text-xs text-neutral-600 italic leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                          t.is_approved
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {t.is_approved ? "Live on Website" : "Pending Review"}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleOpenEditTestimonial(t)}
                          className="font-inter text-xs font-semibold text-neutral-600 hover:text-[#00507D] cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleTestimonial(t.id, t.is_approved)}
                          className="font-inter text-xs font-semibold text-[#00507D] hover:underline cursor-pointer"
                        >
                          {t.is_approved ? "Unpublish" : "Approve & Publish"}
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD / UPDATE PROJECT                             */}
      {/* ========================================================= */}
      {projectModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-manrope text-base font-bold text-neutral-950">
                {editingId ? "Update Portfolio Project" : "Add Portfolio Project"}
              </h3>
              <button
                onClick={() => setProjectModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-inter">
              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  placeholder="e.g. Taste of Malabar Caterers"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Live Project URL
                </label>
                <input
                  type="url"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  placeholder="https://clientwebsite.com"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                />
              </div>

              {/* Cloudinary Screenshot Upload */}
              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Project Screenshot (Cloudinary)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "Uploading to Cloudinary..." : "Upload Screenshot"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "nylex/projects", (url, public_id) => {
                          setProjectForm({ ...projectForm, image_url: url, image_public_id: public_id });
                        })
                      }
                    />
                  </label>
                  {projectForm.image_url && (
                    <span className="text-xs text-emerald-600 font-mono">✓ Screenshot attached</span>
                  )}
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors resize-none"
                  placeholder="Summary of the digital engineering and design work delivered..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setProjectModal(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white font-semibold shadow-md transition-all cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: REGISTER CLIENT                                  */}
      {/* ========================================================= */}
      {clientModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-manrope text-base font-bold text-neutral-950">
                {editingId ? "Update Client Details" : "Register Client"}
              </h3>
              <button
                onClick={() => setClientModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4 text-xs font-inter">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={clientForm.company}
                    onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Cloudinary Client Logo Upload */}
              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Brand Logo (Cloudinary)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "nylex/clients", (url, public_id) => {
                          setClientForm({ ...clientForm, logo_url: url, logo_public_id: public_id });
                        })
                      }
                    />
                  </label>
                  {clientForm.logo_url && (
                    <span className="text-xs text-emerald-600 font-mono">✓ Logo attached</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setClientModal(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white font-semibold shadow-md transition-all cursor-pointer"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: INVOICE GENERATOR                                */}
      {/* ========================================================= */}
      {invoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-2xl space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-manrope text-base font-bold text-neutral-950">
                Generate Client Invoice
              </h3>
              <button
                onClick={() => setInvoiceModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-4 text-xs font-inter">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Chen"
                    value={invoiceForm.client_name}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, client_name: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TechVentures Global"
                    value={invoiceForm.client_company}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, client_company: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    placeholder="billing@client.com"
                    value={invoiceForm.client_email}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, client_email: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoiceForm.due_date}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, due_date: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 pt-2">
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block">
                  Invoice Line Items
                </label>
                {invoiceForm.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(idx, "description", e.target.value)}
                      className="col-span-6 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-neutral-900 text-xs focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(idx, "quantity", e.target.value)}
                      className="col-span-2 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-neutral-900 text-xs focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Price ($)"
                      value={item.price}
                      onChange={(e) => handleUpdateItem(idx, "price", e.target.value)}
                      className="col-span-3 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-neutral-900 text-xs focus:bg-white focus:border-[#00507D] focus:outline-none"
                    />
                    {invoiceForm.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="col-span-1 text-neutral-400 hover:text-rose-600 flex justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="font-inter text-xs font-semibold text-[#00507D] hover:underline pt-1 inline-block"
                >
                  + Add Line Item
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setInvoiceModal(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white font-semibold shadow-md transition-all cursor-pointer"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: RECORD PARTIAL OR FULL PAYMENT                   */}
      {/* ========================================================= */}
      {paymentModal && activeInvoiceForPayment && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#00507D]" />
                <span>Record Payment ({activeInvoiceForPayment.invoice_number})</span>
              </h3>
              <button
                onClick={() => setPaymentModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f0f9ff] border border-[#00507D]/15 text-xs font-inter flex justify-between">
              <span className="text-neutral-600">
                Total: <b>${Number(activeInvoiceForPayment.total).toLocaleString()}</b>
              </span>
              <span className="text-[#00507D] font-bold">
                Remaining: $
                {(
                  Number(activeInvoiceForPayment.total) -
                  Number(activeInvoiceForPayment.paid_amount || 0)
                ).toLocaleString()}
              </span>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-4 text-xs font-inter">
              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Payment Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 font-mono focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  placeholder="500.00"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentForm.payment_method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                >
                  <option value="Bank Transfer">Bank Wire Transfer</option>
                  <option value="UPI / Online">UPI / QR Payment</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash / Cheque">Cash / Cheque</option>
                  <option value="Other">Other Gateway</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Transaction / UTR Reference
                </label>
                <input
                  type="text"
                  value={paymentForm.transaction_reference}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, transaction_reference: e.target.value })
                  }
                  placeholder="Ref # / UTR Number"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                />
              </div>

              {/* Cloudinary Receipt Upload */}
              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Payment Receipt Snapshot (Cloudinary)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Receipt</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "nylex/receipts", (url, public_id) => {
                          setPaymentForm({
                            ...paymentForm,
                            receipt_url: url,
                            receipt_public_id: public_id,
                          });
                        })
                      }
                    />
                  </label>
                  {paymentForm.receipt_url && (
                    <span className="text-xs text-emerald-600 font-mono">✓ Receipt attached</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setPaymentModal(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-all cursor-pointer"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TESTIMONIAL / CLIENT REVIEW MODAL                         */}
      {/* ========================================================= */}
      {testimonialModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-manrope text-base font-bold text-neutral-950">
                {editingTestimonial ? "Edit Client Review" : "Add Client Review"}
              </h3>
              <button
                type="button"
                onClick={() => setTestimonialModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs font-inter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Johnson"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Business Owner"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Taste of Malabar"
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Rating (1 - 5)
                  </label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Review Text (Quote) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did the client say about NYLEX Digital Studio?"
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... or leave blank"
                  value={testimonialForm.avatar_url}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D]"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                <input
                  type="checkbox"
                  id="admin_review_is_approved"
                  checked={testimonialForm.is_approved}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, is_approved: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00507D] cursor-pointer"
                />
                <label htmlFor="admin_review_is_approved" className="text-neutral-800 font-medium cursor-pointer">
                  Publish live on website testimonials section immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setTestimonialModal(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#00507D] hover:bg-[#003B5C] text-white font-semibold shadow-md cursor-pointer transition-all"
                >
                  {editingTestimonial ? "Save Changes" : "Add Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
