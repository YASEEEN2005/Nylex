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
} from "lucide-react";

export default function AdminPortal() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Auth Form State
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("nylexadmin2026");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Data States
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Modals State
  const [projectModal, setProjectModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Models
  const [projectForm, setProjectForm] = useState({
    title: "",
    link: "",
    category: "webdev",
    type: "Web Development",
    desc: "",
    image: "/images/projects/vanyaa.png",
    tags: ["React", "Next.js", "Tailwind CSS"],
    result: "100% Custom Build",
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "Active",
    notes: "",
  });

  const [invoiceForm, setInvoiceForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientCompany: "",
    dueDate: "",
    items: [{ description: "Custom Web Application Development", quantity: 1, price: 1500, amount: 1500 }],
    tax: 0,
    discount: 0,
    status: "Pending",
    notes: "Thank you for partnering with NYLEX WEB STUDIO.",
  });

  // Check auth session on load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated) {
        setAuthenticated(true);
        fetchAllData();
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
      const [resP, resC, resI, resE] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/clients"),
        fetch("/api/invoices"),
        fetch("/api/enquiries"),
      ]);
      const dataP = await resP.json();
      const dataC = await resC.json();
      const dataI = await resI.json();
      const dataE = await resE.json();

      if (dataP.success) setProjects(dataP.projects);
      if (dataC.success) setClients(dataC.clients);
      if (dataI.success) setInvoices(dataI.invoices);
      if (dataE.success) setEnquiries(dataE.enquiries);
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
        setLoginError(data.error || "Login failed");
      }
    } catch (err) {
      setLoginError("Network connection error");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  };

  // --- Project Handlers ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
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
      setProjectForm({
        title: "",
        link: "",
        category: "webdev",
        type: "Web Development",
        desc: "",
        image: "/images/projects/vanyaa.png",
        tags: ["React", "Next.js"],
        result: "",
      });
      fetchAllData();
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
      setClientForm({ name: "", company: "", email: "", phone: "", status: "Active", notes: "" });
      fetchAllData();
    }
  };

  const handleDeleteClient = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  // --- Invoice Handlers ---
  const handleSaveInvoice = async (e) => {
    e.preventDefault();
    const url = editingId ? `/api/invoices/${editingId}` : "/api/invoices";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceForm),
    });
    if (res.ok) {
      setInvoiceModal(false);
      setEditingId(null);
      setInvoiceForm({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        clientCompany: "",
        dueDate: "",
        items: [{ description: "Web Development Services", quantity: 1, price: 1000, amount: 1000 }],
        tax: 0,
        discount: 0,
        status: "Pending",
        notes: "Thank you for partnering with NYLEX WEB STUDIO.",
      });
      fetchAllData();
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  const handleAddItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      items: [...invoiceForm.items, { description: "", quantity: 1, price: 0, amount: 0 }],
    });
  };

  const handleUpdateItem = (index, field, value) => {
    const updated = [...invoiceForm.items];
    updated[index][field] = value;
    if (field === "quantity" || field === "price") {
      const q = Number(field === "quantity" ? value : updated[index].quantity) || 0;
      const p = Number(field === "price" ? value : updated[index].price) || 0;
      updated[index].amount = q * p;
    }
    setInvoiceForm({ ...invoiceForm, items: updated });
  };

  const handleRemoveItem = (index) => {
    const updated = invoiceForm.items.filter((_, i) => i !== index);
    setInvoiceForm({ ...invoiceForm, items: updated });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">Loading Nylex Admin...</span>
        </div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col gap-6"
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0EA5E9] to-indigo-600 flex items-center justify-center text-white shadow-lg mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#0EA5E9]">
              SECURE PORTAL
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Nylex Control Center
            </h1>
            <p className="text-slate-400 text-xs font-medium">
              Enter admin credentials to manage projects, clients, and invoices.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                Admin Username
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-[#0EA5E9] focus:outline-none transition-all placeholder:text-slate-600 font-medium"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-[#0EA5E9] focus:outline-none transition-all placeholder:text-slate-600 font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold uppercase tracking-widest text-xs transition-all shadow-lg cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {loginLoading ? "Authenticating..." : "Sign In To Dashboard"}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Default: admin / nylexadmin2026</span>
            <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Main Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + (inv.total || 0), 0);
  const pendingRevenue = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + (inv.total || 0), 0);

  // --- AUTHENTICATED DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800/90 bg-slate-900/80 sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            N
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>NYLEX ADMIN CENTER</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] border border-[#0EA5E9]/30">
                PRO 2026
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Database: MongoDB Cluster Connected
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>View Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "projects", label: `Projects (${projects.length})`, icon: Briefcase },
            { id: "clients", label: `Clients (${clients.length})`, icon: Users },
            { id: "invoices", label: `Invoices (${invoices.length})`, icon: FileText },
            { id: "enquiries", label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-[#0EA5E9] text-white shadow-lg"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>TOTAL REVENUE</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-black text-white font-mono">
                  ${totalRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  ✦ Paid Invoices
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>PENDING PAYMENTS</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-2xl font-black text-white font-mono">
                  ${pendingRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-400 font-semibold">
                  ✦ Awaiting Settlement
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>ACTIVE CLIENTS</span>
                  <Users className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <span className="text-2xl font-black text-white font-mono">
                  {clients.length}
                </span>
                <span className="text-[10px] text-[#0EA5E9] font-semibold">
                  ✦ Registered Accounts
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>SHOWCASE PROJECTS</span>
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-2xl font-black text-white font-mono">
                  {projects.length}
                </span>
                <span className="text-[10px] text-indigo-400 font-semibold">
                  ✦ Live Portfolio Items
                </span>
              </div>
            </div>

            {/* Recent Enquiries & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                    Recent Contact Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="text-xs text-[#0EA5E9] font-mono hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <p className="text-slate-500 text-xs py-8 text-center">
                    No contact submissions recorded yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq._id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col gap-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between text-slate-300 font-bold">
                          <span>{enq.name} ({enq.phone})</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-1">
                          {enq.details || "No project details provided."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                  Quick Actions
                </h3>

                <button
                  onClick={() => {
                    setEditingId(null);
                    setProjectModal(true);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Add Showcase Project</span>
                </button>

                <button
                  onClick={() => {
                    setEditingId(null);
                    setClientModal(true);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Register Client</span>
                </button>

                <button
                  onClick={() => {
                    setEditingId(null);
                    setInvoiceModal(true);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-indigo-400" />
                  <span>Create Invoice</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS CMS */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-mono">
                Project CMS Portfolio
              </h2>
              <button
                onClick={() => {
                  setEditingId(null);
                  setProjectForm({
                    title: "",
                    link: "",
                    category: "webdev",
                    type: "Web Development",
                    desc: "",
                    image: "/images/projects/vanyaa.png",
                    tags: ["Next.js", "React"],
                    result: "",
                  });
                  setProjectModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-sky-500 text-white text-xs font-bold uppercase font-mono flex items-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20 text-[10px] font-mono font-bold uppercase">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingId(proj._id);
                            setProjectForm(proj);
                            setProjectModal(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{proj.result || "Custom build"}</span>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0EA5E9] hover:underline flex items-center gap-1"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CLIENT MANAGEMENT */}
        {activeTab === "clients" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-mono">
                Client Directory
              </h2>
              <button
                onClick={() => {
                  setEditingId(null);
                  setClientForm({ name: "", company: "", email: "", phone: "", status: "Active", notes: "" });
                  setClientModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase font-mono flex items-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Client</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {clients.map((client) => (
                    <tr key={client._id} className="hover:bg-slate-950/50">
                      <td className="p-4 font-bold text-white">{client.name}</td>
                      <td className="p-4 text-slate-400">{client.company || "—"}</td>
                      <td className="p-4 font-mono">
                        <div>{client.phone}</div>
                        <div className="text-slate-500 text-[10px]">{client.email}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {client.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setInvoiceForm({
                                ...invoiceForm,
                                clientName: client.name,
                                clientEmail: client.email,
                                clientPhone: client.phone,
                                clientCompany: client.company,
                              });
                              setInvoiceModal(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#0EA5E9]/10 text-[#0EA5E9] hover:bg-[#0EA5E9]/20 font-mono text-[10px] font-bold"
                          >
                            Invoice
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(client._id);
                              setClientForm(client);
                              setClientModal(true);
                            }}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client._id)}
                            className="p-1 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: INVOICE GENERATOR & LIST */}
        {activeTab === "invoices" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-mono">
                Invoice Management
              </h2>
              <button
                onClick={() => {
                  setEditingId(null);
                  setInvoiceForm({
                    clientName: "",
                    clientEmail: "",
                    clientPhone: "",
                    clientCompany: "",
                    dueDate: "",
                    items: [{ description: "Web Development Services", quantity: 1, price: 1000, amount: 1000 }],
                    tax: 0,
                    discount: 0,
                    status: "Pending",
                    notes: "Thank you for partnering with NYLEX WEB STUDIO.",
                  });
                  setInvoiceModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase font-mono flex items-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {invoices.map((inv) => (
                    <tr key={inv._id} className="hover:bg-slate-950/50">
                      <td className="p-4 font-mono font-bold text-[#0EA5E9]">{inv.invoiceNumber}</td>
                      <td className="p-4 font-bold text-white">{inv.clientName}</td>
                      <td className="p-4 font-mono text-slate-400">
                        {new Date(inv.issueDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        ${inv.total?.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            inv.status === "Paid"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/admin/nylex/invoice/${inv._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-mono text-[10px] flex items-center gap-1"
                          >
                            <Printer className="w-3 h-3" />
                            <span>Print</span>
                          </a>
                          <button
                            onClick={() => handleDeleteInvoice(inv._id)}
                            className="p-1 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-mono">
              Contact Form Messages ({enquiries.length})
            </h2>

            <div className="flex flex-col gap-3">
              {enquiries.map((enq) => (
                <div
                  key={enq._id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{enq.name} ({enq.phone})</span>
                    <span className="text-slate-500 font-mono text-[10px]">
                      {new Date(enq.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {enq.email && <span className="text-slate-400 text-xs font-mono">{enq.email}</span>}
                  <p className="text-slate-300 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    {enq.details || "No details message provided."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PROJECT MODAL */}
      {projectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg flex flex-col gap-4">
            <h3 className="text-base font-bold text-white">
              {editingId ? "Edit Project" : "Add New Showcase Project"}
            </h3>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Project Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <input
                type="text"
                placeholder="Live Website URL"
                value={projectForm.link}
                onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <textarea
                placeholder="Project Description"
                rows={3}
                value={projectForm.desc}
                onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <input
                type="text"
                placeholder="Impact Metric (e.g. 100% Custom Build)"
                value={projectForm.result}
                onChange={(e) => setProjectForm({ ...projectForm, result: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0EA5E9] text-white font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLIENT MODAL */}
      {clientModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg flex flex-col gap-4">
            <h3 className="text-base font-bold text-white">
              {editingId ? "Edit Client" : "Register New Client"}
            </h3>
            <form onSubmit={handleSaveClient} className="flex flex-col gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Client Name"
                value={clientForm.name}
                onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <input
                type="text"
                placeholder="Company / Organization"
                value={clientForm.company}
                onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setClientModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {invoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl flex flex-col gap-4 my-8">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Generate Client Invoice
            </h3>
            <form onSubmit={handleSaveInvoice} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Client Name"
                  value={invoiceForm.clientName}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, clientName: e.target.value })}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
                <input
                  type="email"
                  placeholder="Client Email"
                  value={invoiceForm.clientEmail}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, clientEmail: e.target.value })}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              {/* Line items */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Invoice Line Items
                </label>
                {invoiceForm.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(idx, "description", e.target.value)}
                      className="col-span-6 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(idx, "quantity", e.target.value)}
                      className="col-span-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => handleUpdateItem(idx, "price", e.target.value)}
                      className="col-span-3 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                    {invoiceForm.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="col-span-1 text-rose-400 flex justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-[11px] font-mono text-[#0EA5E9] hover:underline self-start pt-1"
                >
                  + Add Line Item
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInvoiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
