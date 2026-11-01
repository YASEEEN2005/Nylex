"use client";

import { useState, useEffect, useCallback } from "react";
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
  Images,
  Star,
  Check,
  X,
  Eye,
  CreditCard,
  Receipt,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  Activity,
  Globe,
  Compass,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  ArrowUpRight,
  Share2,
  Search,
  Shield,
  PieChart,
  MapPin,
  Terminal,
  Cpu,
  AlertTriangle,
  Radio,
  ShieldAlert,
  Footprints,
  Navigation,
  CornerDownRight,
  ChevronLeft,
  ChevronRight,
  Award,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Sliders,
  Building2,
} from "lucide-react";
import Link from "next/link";
import LogoStudioModal from "@/app/components/LogoStudioModal";

export default function AdminPortal() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [adminMobileMenu, setAdminMobileMenu] = useState(false);

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

  // Dedicated Website Analytics State
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState("30d");
  const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });
  const [pagesSubTab, setPagesSubTab] = useState("landing");
  const [selectedJourneyVisitor, setSelectedJourneyVisitor] = useState(null);
  const [visitorTablePage, setVisitorTablePage] = useState(1);
  const [clearAnalyticsModal, setClearAnalyticsModal] = useState(false);
  const [clearConfirmText, setClearConfirmText] = useState("");
  const [clearingAnalytics, setClearingAnalytics] = useState(false);

  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "< 10s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  // Modals State
  const [projectModal, setProjectModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [clientLogoModal, setClientLogoModal] = useState(false);
  const [logoStudioModal, setLogoStudioModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [activeInvoiceForPayment, setActiveInvoiceForPayment] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingLogoId, setEditingLogoId] = useState(null);
  const [logoPreviewTheme, setLogoPreviewTheme] = useState("white");

  // Client Testimonials Modal & Form
  const [testimonialModal, setTestimonialModal] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [testimonialSaving, setTestimonialSaving] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "Client",
    company: "",
    quote: "",
    rating: 5,
    avatar_url: "",
    is_approved: true,
  });

  // Dynamic Client Logos Form
  const [clientLogos, setClientLogos] = useState([]);
  const [clientLogoForm, setClientLogoForm] = useState({
    client_name: "",
    image_url: "",
    cloudinary_public_id: "",
    old_public_id: "",
    alt_text: "",
    display_order: 1,
    is_active: true,
  });

  // Premium Minimalist Toast & Custom Confirm Modal State
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

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
    gallery: [],
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

  const fetchAllData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [resP, resC, resI, resE, resT, resS, resL] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/clients"),
        fetch("/api/invoices"),
        fetch("/api/enquiries"),
        fetch("/api/testimonials?all=true"),
        fetch("/api/analytics"),
        fetch("/api/client-logos?all=true"),
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
      const dataL = await parseJsonSafe(resL);

      if (dataP?.success) setProjects(dataP.projects);
      if (dataC?.success) setClients(dataC.clients);
      if (dataI?.success) setInvoices(dataI.invoices);
      if (dataE?.success) setEnquiries(dataE.enquiries);
      if (dataT?.success) setTestimonials(dataT.testimonials);
      if (dataL?.success) setClientLogos(dataL.logos);
      if (dataS?.success) {
        setStats(dataS.stats);
        if (dataS.analytics) {
          setAnalyticsData(dataS.analytics);
        }
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoadingData(false);
    }
  }, []);

  // Check auth session on load
  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
            fetchAllData();
          }
        }
      } catch (err) {
        console.error("Session check error", err);
      } finally {
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [fetchAllData]);

  const fetchAnalytics = async (
    range = analyticsRange,
    start = customRange.startDate,
    end = customRange.endDate
  ) => {
    setAnalyticsLoading(true);
    try {
      let query = `?range=${range}`;
      if (range === "custom" && start && end) {
        query += `&startDate=${encodeURIComponent(start)}&endDate=${encodeURIComponent(end)}`;
      }
      const res = await fetch(`/api/analytics${query}`);
      if (res.ok) {
        const data = await res.json();
        if (data.analytics) setAnalyticsData(data.analytics);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleClearAllAnalytics = async () => {
    if (clearConfirmText !== "DELETE ALL ANALYTICS") {
      showToast("Please type 'DELETE ALL ANALYTICS' exactly to confirm.", "error");
      return;
    }
    setClearingAnalytics(true);
    try {
      const res = await fetch("/api/analytics/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation: "DELETE ALL ANALYTICS" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("All website analytics data has been purged successfully.", "success");
        setClearAnalyticsModal(false);
        setClearConfirmText("");
        await fetchAnalytics("30d");
        fetchAllData();
      } else {
        showToast(data.error || "Failed to clear analytics.", "error");
      }
    } catch (err) {
      showToast("Network error while purging analytics.", "error");
    } finally {
      setClearingAnalytics(false);
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
        showToast("Image uploaded to Cloudinary successfully.", "success");
      } else {
        showToast(data.error || "Upload failed. Please try again.", "error");
      }
    } catch (err) {
      showToast("Failed to upload image to Cloudinary.", "error");
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
        showToast(
          editingId ? "Project updated successfully." : "Project created successfully.",
          "success"
        );
        fetchAllData();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to save project.", "error");
      }
    } catch (err) {
      showToast("Error saving project.", "error");
    }
  };

  const handleDeleteProject = (id, title) => {
    setConfirmModal({
      title: "Delete Project?",
      message: `Are you sure you want to delete ${title ? `"${title}"` : "this project"}? All associated screenshots will also be removed from Cloudinary.`,
      confirmText: "Delete Project",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
          if (res.ok) {
            showToast("Project deleted successfully.", "success");
            fetchAllData();
          } else {
            showToast("Failed to delete project.", "error");
          }
        } catch {
          showToast("Network error deleting project.", "error");
        } finally {
          setConfirmModal(null);
        }
      },
    });
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
        showToast(editingId ? "Client details updated." : "Client registered.", "success");
        fetchAllData();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to save client.", "error");
      }
    } catch (err) {
      showToast("Error saving client.", "error");
    }
  };

  const handleDeleteClient = (id, name) => {
    setConfirmModal({
      title: "Remove Client?",
      message: `Are you sure you want to delete ${name ? `"${name}"` : "this client"}? Associated logo assets will also be removed.`,
      confirmText: "Delete Client",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
          if (res.ok) {
            showToast("Client deleted.", "success");
            fetchAllData();
          } else {
            showToast("Failed to delete client.", "error");
          }
        } catch {
          showToast("Network error.", "error");
        } finally {
          setConfirmModal(null);
        }
      },
    });
  };

  // --- Dynamic Client Logo Management Handlers ---
  const handleSaveClientLogo = async (e) => {
    e.preventDefault();
    try {
      const url = editingLogoId ? `/api/client-logos/${editingLogoId}` : "/api/client-logos";
      const method = editingLogoId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientLogoForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setClientLogoModal(false);
        setEditingLogoId(null);
        showToast(
          editingLogoId
            ? "Client logo updated successfully."
            : "Client logo added to showcase successfully.",
          "success"
        );
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save client logo.", "error");
      }
    } catch {
      showToast("Error saving client logo.", "error");
    }
  };

  const handleToggleLogoStatus = async (logo) => {
    try {
      const nextStatus = !logo.is_active;
      const res = await fetch(`/api/client-logos/${logo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: nextStatus }),
      });
      if (res.ok) {
        showToast(
          nextStatus
            ? `"${logo.client_name}" is now visible on the website.`
            : `"${logo.client_name}" is now hidden from the website.`,
          "success"
        );
        fetchAllData();
      } else {
        showToast("Failed to update logo visibility.", "error");
      }
    } catch {
      showToast("Error updating logo visibility.", "error");
    }
  };

  const handleMoveLogoOrder = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= clientLogos.length) return;

    const currentLogo = clientLogos[index];
    const targetLogo = clientLogos[targetIndex];

    const currentOrder = currentLogo.display_order ?? index + 1;
    const targetOrder = targetLogo.display_order ?? targetIndex + 1;

    // Swap display orders
    const updatedItems = [
      { id: currentLogo.id, display_order: targetOrder },
      { id: targetLogo.id, display_order: currentOrder },
    ];

    try {
      const res = await fetch("/api/client-logos/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems }),
      });
      if (res.ok) {
        showToast("Logo display order updated.", "success");
        fetchAllData();
      } else {
        showToast("Failed to reorder client logos.", "error");
      }
    } catch {
      showToast("Error updating logo order.", "error");
    }
  };

  const handleDeleteClientLogo = (id, name) => {
    setConfirmModal({
      title: "Delete Client Logo?",
      message: `Are you sure you want to permanently delete "${name}"? Its image asset will be safely removed from Cloudinary and it will disappear from the homepage showcase.`,
      confirmText: "Delete Logo",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/client-logos/${id}`, { method: "DELETE" });
          if (res.ok) {
            showToast("Client logo and Cloudinary asset deleted.", "success");
            fetchAllData();
          } else {
            const data = await res.json();
            showToast(data.error || "Failed to delete client logo.", "error");
          }
        } catch {
          showToast("Network error deleting logo.", "error");
        } finally {
          setConfirmModal(null);
        }
      },
    });
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
        showToast("Invoice generated successfully.", "success");
        fetchAllData();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to create invoice.", "error");
      }
    } catch (err) {
      showToast("Error generating invoice.", "error");
    }
  };

  const handleDeleteInvoice = (id, invNum) => {
    setConfirmModal({
      title: "Delete Invoice?",
      message: `Are you sure you want to delete invoice ${invNum || ""}? Associated payment records will also be removed.`,
      confirmText: "Delete Invoice",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
          if (res.ok) {
            showToast("Invoice deleted.", "success");
            fetchAllData();
          } else {
            showToast("Failed to delete invoice.", "error");
          }
        } catch {
          showToast("Error deleting invoice.", "error");
        } finally {
          setConfirmModal(null);
        }
      },
    });
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
        showToast("Payment recorded successfully.", "success");
        fetchAllData();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to record payment.", "error");
      }
    } catch (err) {
      showToast("Error recording payment.", "error");
    }
  };

  // --- Enquiry Handlers ---
  const handleToggleEnquiryRead = async (id, isRead) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !isRead }),
      });
      showToast(!isRead ? "Marked as read." : "Marked as unread.", "info");
      fetchAllData();
    } catch {
      showToast("Failed to update status.", "error");
    }
  };

  const handleDeleteEnquiry = (id) => {
    setConfirmModal({
      title: "Delete Inquiry?",
      message: "Are you sure you want to remove this client inquiry?",
      confirmText: "Delete Inquiry",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
          if (res.ok) {
            showToast("Inquiry deleted.", "success");
            fetchAllData();
          }
        } catch {
          showToast("Error deleting inquiry.", "error");
        } finally {
          setConfirmModal(null);
        }
      },
    });
  };

  // --- Testimonial Handlers ---
  const openAddTestimonialModal = () => {
    setEditingTestimonialId(null);
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

  const openEditTestimonialModal = (t) => {
    setEditingTestimonialId(t.id);
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
    if (e) e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) {
      showToast("Client name and review quote are required.", "error");
      return;
    }

    setTestimonialSaving(true);
    try {
      const url = editingTestimonialId ? `/api/testimonials/${editingTestimonialId}` : "/api/testimonials";
      const method = editingTestimonialId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          editingTestimonialId ? "Review updated successfully." : "Review created and published.",
          "success"
        );
        setTestimonialModal(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save review.", "error");
      }
    } catch {
      showToast("Network error saving review.", "error");
    } finally {
      setTestimonialSaving(false);
    }
  };

  const handleToggleTestimonial = async (id, isApproved) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_approved: !isApproved }),
      });
      if (res.ok) {
        showToast(!isApproved ? "Review published live." : "Review unpublished.", "success");
        fetchAllData();
      }
    } catch {
      showToast("Failed to update review status.", "error");
    }
  };

  const handleDeleteTestimonial = (id) => {
    setConfirmModal({
      title: "Delete Review?",
      message: "Are you sure you want to permanently remove this testimonial review?",
      confirmText: "Delete Review",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
          if (res.ok) {
            showToast("Review removed successfully.", "success");
            fetchAllData();
          } else {
            showToast("Failed to delete review.", "error");
          }
        } catch {
          showToast("Error removing review.", "error");
        } finally {
          setConfirmModal(null);
        }
      },
    });
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

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-[#f0f9ff] text-neutral-700 hover:text-[#00507D] border border-neutral-200/80 text-[11px] sm:text-xs font-medium transition-colors cursor-pointer"
            title="Open Live Website"
          >
            <span className="hidden sm:inline">Live Website</span>
            <span className="inline sm:hidden">Live Site</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-[11px] sm:text-xs font-semibold font-inter transition-all cursor-pointer"
          >
            <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scroll-smooth touch-pan-x scrollbar-thin scrollbar-thumb-neutral-200">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "analytics", label: "Website Analytics", icon: BarChart3, count: analyticsData?.summary?.totalViews },
            { id: "projects", label: "Projects", icon: FolderPlus, count: projects.length },
            { id: "client-logos", label: "Client Logos", icon: Award, count: clientLogos.length },
            { id: "clients", label: "Client Directory", icon: Users, count: clients.length },
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
                        gallery: [],
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
          {/* TAB: WEBSITE ANALYTICS & TRAFFIC OVERVIEW (MINIMALIST THEME)*/}
          {/* ========================================================= */}
          {activeTab === "analytics" && (
            <div className="space-y-6 font-inter">
              {/* Header Card */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9ff] text-[#00507D] text-xs font-semibold mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#00507D] animate-pulse" />
                    <span>Live Website Analytics</span>
                  </div>
                  <h2 className="font-manrope text-2xl font-bold text-neutral-950">
                    Website Analytics & Audience Insights
                  </h2>
                  <p className="font-inter text-xs sm:text-sm text-neutral-500 mt-1">
                    Track visitor volume, audience sources, page performance, and device metrics in real-time
                  </p>
                </div>

                {/* Range Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center p-1 bg-neutral-100 rounded-2xl border border-neutral-200 text-xs font-inter flex-wrap gap-1">
                    {[
                      { key: "today", label: "Today" },
                      { key: "yesterday", label: "Yesterday" },
                      { key: "7d", label: "7 Days" },
                      { key: "30d", label: "30 Days" },
                      { key: "90d", label: "90 Days" },
                      { key: "custom", label: "Custom" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => {
                          setAnalyticsRange(item.key);
                          if (item.key !== "custom") {
                            fetchAnalytics(item.key);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-medium ${
                          analyticsRange === item.key
                            ? "bg-[#00507D] text-white font-semibold shadow-xs"
                            : "text-neutral-600 hover:text-neutral-950 hover:bg-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => fetchAnalytics(analyticsRange)}
                    disabled={analyticsLoading}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-[#00507D] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    title="Refresh analytics data"
                  >
                    <RefreshCw className={`w-4 h-4 ${analyticsLoading ? "animate-spin text-[#00507D]" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Custom Date Inputs if selected */}
              {analyticsRange === "custom" && (
                <div className="p-5 rounded-3xl bg-white border border-neutral-200/80 shadow-xs flex flex-wrap items-center gap-4 text-xs font-inter">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-700">Start Date:</span>
                    <input
                      type="date"
                      value={customRange.startDate}
                      onChange={(e) => setCustomRange({ ...customRange, startDate: e.target.value })}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:border-[#00507D]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-700">End Date:</span>
                    <input
                      type="date"
                      value={customRange.endDate}
                      onChange={(e) => setCustomRange({ ...customRange, endDate: e.target.value })}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:border-[#00507D]"
                    />
                  </div>
                  <button
                    onClick={() => fetchAnalytics("custom", customRange.startDate, customRange.endDate)}
                    disabled={!customRange.startDate || !customRange.endDate || analyticsLoading}
                    className="px-4 py-1.5 rounded-xl bg-[#00507D] hover:bg-[#003d5f] text-white font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    Apply Range
                  </button>
                </div>
              )}

              {/* Top 5 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Page Views */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Page Views
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f0f9ff] text-[#00507D] flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">
                    {analyticsData?.summary?.totalViews?.toLocaleString() || "0"}
                  </p>
                  <span className="inline-block text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
                    +{analyticsData?.summary?.todayViews || 0} today
                  </span>
                </div>

                {/* 2. Unique Visitors */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Unique Visitors
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">
                    {analyticsData?.summary?.uniqueVisitors?.toLocaleString() || "0"}
                  </p>
                  <span className="inline-block text-[11px] font-medium text-neutral-500 mt-2">
                    {analyticsData?.summary?.totalSessions || 0} sessions
                  </span>
                </div>

                {/* 3. New Visitors */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      New Visitors
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">
                    {analyticsData?.summary?.newVisitors?.toLocaleString() || "0"}
                  </p>
                  <span className="inline-block text-[11px] font-medium text-neutral-500 mt-2">
                    {analyticsData?.summary?.returningVisitors || 0} returning
                  </span>
                </div>

                {/* 4. Yesterday Baseline */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Yesterday
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">
                    {analyticsData?.summary?.yesterdayViews?.toLocaleString() || "0"}
                  </p>
                  <span className="inline-block text-[11px] font-medium text-neutral-500 mt-2">
                    24h prior baseline
                  </span>
                </div>

                {/* 5. Avg Session Duration */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Avg Duration
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950">
                    {formatDuration(analyticsData?.summary?.avgDurationSeconds)}
                  </p>
                  <span className="inline-block text-[11px] font-medium text-neutral-500 mt-2">
                    Per active session
                  </span>
                </div>
              </div>

              {/* Traffic Timeline Chart (Clean Luxury Minimalist Style) */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-manrope text-lg font-bold text-neutral-950">
                      Traffic Trend
                    </h3>
                    <p className="font-inter text-xs text-neutral-500 mt-0.5">
                      Daily page views and unique visitors in selected period
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-inter">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-[#00507D]" />
                      <span className="text-neutral-700 font-medium">Page Views</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-sky-400" />
                      <span className="text-neutral-700 font-medium">Unique Visitors</span>
                    </div>
                  </div>
                </div>

                {analyticsData?.trafficTimeline && analyticsData.trafficTimeline.length > 0 ? (
                  <div className="pt-4 overflow-x-auto">
                    <div className="min-w-[650px] w-full">
                      {(() => {
                        const data = analyticsData.trafficTimeline;
                        const maxViews = Math.max(...data.map((d) => Math.max(d.views, d.visitors)), 6);
                        const chartW = 750;
                        const chartH = 200;
                        const padL = 40;
                        const padR = 20;
                        const padT = 20;
                        const padB = 30;
                        const usableW = chartW - padL - padR;
                        const usableH = chartH - padT - padB;

                        const getX = (idx) => padL + (idx / Math.max(data.length - 1, 1)) * usableW;
                        const getY = (val) => chartH - padB - (val / maxViews) * usableH;

                        const viewsPoints = data.map((d, i) => `${getX(i)},${getY(d.views)}`).join(" ");
                        const visitorsPoints = data.map((d, i) => `${getX(i)},${getY(d.visitors)}`).join(" ");

                        const areaPath = `M ${getX(0)},${chartH - padB} ` +
                          data.map((d, i) => `L ${getX(i)},${getY(d.views)}`).join(" ") +
                          ` L ${getX(data.length - 1)},${chartH - padB} Z`;

                        return (
                          <svg
                            viewBox={`0 0 ${chartW} ${chartH}`}
                            className="w-full h-52 overflow-visible"
                            aria-label="Traffic Trend Chart"
                          >
                            <defs>
                              <linearGradient id="nylexViewsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00507D" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#00507D" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Horizontal Grid lines */}
                            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                              const y = chartH - padB - ratio * usableH;
                              const val = Math.round(ratio * maxViews);
                              return (
                                <g key={ratio}>
                                  <line
                                    x1={padL}
                                    y1={y}
                                    x2={chartW - padR}
                                    y2={y}
                                    stroke="#e2e8f0"
                                    strokeDasharray="4 4"
                                  />
                                  <text
                                    x={padL - 8}
                                    y={y + 3}
                                    textAnchor="end"
                                    className="text-[10px] fill-neutral-400 font-mono"
                                  >
                                    {val}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Shaded Area for Views */}
                            <path d={areaPath} fill="url(#nylexViewsGradient)" />

                            {/* Views Line */}
                            <polyline
                              fill="none"
                              stroke="#00507D"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={viewsPoints}
                            />

                            {/* Visitors Line */}
                            <polyline
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={visitorsPoints}
                            />

                            {/* Data points & X Labels */}
                            {data.map((d, i) => {
                              const x = getX(i);
                              const yViews = getY(d.views);
                              const showLabel = data.length <= 10 || i % Math.ceil(data.length / 6) === 0 || i === data.length - 1;

                              return (
                                <g key={d.date} className="group">
                                  <circle
                                    cx={x}
                                    cy={yViews}
                                    r="4"
                                    fill="#ffffff"
                                    stroke="#00507D"
                                    strokeWidth="2.5"
                                    className="cursor-pointer transition-all hover:r-6"
                                  >
                                    <title>{`${d.date}: ${d.views} views, ${d.visitors} unique visitors`}</title>
                                  </circle>
                                  {showLabel && (
                                    <text
                                      x={x}
                                      y={chartH - 8}
                                      textAnchor="middle"
                                      className="text-[10px] fill-neutral-500 font-mono"
                                    >
                                      {d.date.slice(5)}
                                    </text>
                                  )}
                                </g>
                              );
                            })}
                          </svg>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center text-neutral-400 font-inter">
                    <BarChart3 className="w-10 h-10 text-neutral-300 mb-2" />
                    <p className="text-sm font-semibold text-neutral-700">
                      No traffic data in this timeframe
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                      Visit your live website to record analytics in real time.
                    </p>
                  </div>
                )}
              </div>

              {/* Grid 1: Pages Performance & Navigation Journeys */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Most Visited Pages */}
                <div className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center gap-2">
                        <span>Most Visited Pages</span>
                      </h3>
                      <p className="font-inter text-xs text-neutral-500">
                        Top website paths ranked by view frequency
                      </p>
                    </div>
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold border border-neutral-200">
                      {analyticsData?.topPages?.length || 0} Pages
                    </span>
                  </div>

                  {analyticsData?.topPages && analyticsData.topPages.length > 0 ? (
                    <div className="space-y-3 pt-1">
                      {analyticsData.topPages.map((pg, idx) => {
                        const total = analyticsData.summary?.totalViews || 1;
                        const pct = Math.round((pg.views / total) * 100);
                        return (
                          <div key={pg.path + idx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="font-mono text-[11px] font-bold text-[#00507D] w-5">
                                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                                <span className="font-mono text-xs font-semibold text-neutral-800 truncate">
                                  {pg.path}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0 font-inter text-[11px]">
                                <span className="text-neutral-500">{pg.visitors} visitors</span>
                                <span className="font-bold text-[#00507D]">{pg.views} views</span>
                              </div>
                            </div>
                            <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#00507D] rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(pct, 5)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs font-inter text-neutral-400 py-6 text-center">No page records yet</p>
                  )}
                </div>

                {/* Landing vs Exit Pages */}
                <div className="lg:col-span-5 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950">
                        Session Journeys
                      </h3>
                      <p className="font-inter text-xs text-neutral-500">
                        Top entry points and departure exit paths
                      </p>
                    </div>
                    <div className="flex items-center p-0.5 bg-neutral-100 rounded-xl text-xs font-inter border border-neutral-200">
                      <button
                        onClick={() => setPagesSubTab("landing")}
                        className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          pagesSubTab === "landing"
                            ? "bg-[#00507D] text-white font-semibold"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        Landing
                      </button>
                      <button
                        onClick={() => setPagesSubTab("exit")}
                        className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          pagesSubTab === "exit"
                            ? "bg-[#00507D] text-white font-semibold"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        Exit
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    {(pagesSubTab === "landing" ? analyticsData?.landingPages : analyticsData?.exitPages)?.map(
                      (item, idx) => (
                        <div
                          key={item.path + idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs font-inter"
                        >
                          <span className="text-neutral-700 font-mono text-[11px] truncate">{item.path}</span>
                          <span className="text-xs font-bold text-[#00507D] shrink-0 ml-2">
                            {item.count} sessions
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Grid 2: Acquisition Sources & Referrers */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Traffic Channels */}
                <div className="lg:col-span-6 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950">
                        Traffic Channels
                      </h3>
                      <p className="font-inter text-xs text-neutral-500">
                        Visitor origin classification (Direct, Social, Search, Referral)
                      </p>
                    </div>
                    <Share2 className="w-4 h-4 text-neutral-400" />
                  </div>

                  {analyticsData?.trafficSources && analyticsData.trafficSources.length > 0 ? (
                    <div className="space-y-3 pt-1">
                      {analyticsData.trafficSources.map((src) => {
                        const total = analyticsData.summary?.totalViews || 1;
                        const pct = Math.round((src.count / total) * 100);
                        return (
                          <div key={src.source} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-inter">
                              <span className="font-semibold text-neutral-800">
                                {src.source}
                              </span>
                              <span className="font-bold text-[#00507D]">
                                {src.count} ({pct}%)
                              </span>
                            </div>
                            <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#00507D] to-sky-500 rounded-full"
                                style={{ width: `${Math.max(pct, 5)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs font-inter text-neutral-400 py-6 text-center">No traffic source data</p>
                  )}
                </div>

                {/* Top Referring Domains */}
                <div className="lg:col-span-6 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center gap-2">
                        <span>Referring Websites</span>
                      </h3>
                      <p className="font-inter text-xs text-neutral-500">
                        External hosts delivering incoming traffic
                      </p>
                    </div>
                    <Globe className="w-4 h-4 text-neutral-400" />
                  </div>

                  {analyticsData?.referrers && analyticsData.referrers.length > 0 ? (
                    <div className="space-y-2 pt-1">
                      {analyticsData.referrers.map((ref) => (
                        <div
                          key={ref.domain}
                          className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs font-inter"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#00507D] shrink-0" />
                            <span className="text-neutral-800 font-medium truncate">{ref.domain}</span>
                          </div>
                          <span className="font-bold text-[#00507D] ml-2 shrink-0">
                            {ref.count} visits
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs font-inter text-neutral-400">
                      <p>Direct Navigation</p>
                      <p className="text-[11px] text-neutral-400 mt-1">External referral websites appear automatically as visitors arrive.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid 3: Devices, Browsers & Operating Systems */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Devices */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[#00507D]" />
                      Device Category
                    </span>
                  </h3>
                  <div className="space-y-3 pt-2">
                    {analyticsData?.devices?.map((dev) => {
                      const total = analyticsData.summary?.totalViews || 1;
                      const pct = Math.round((dev.count / total) * 100);
                      const Icon =
                        dev.device === "mobile"
                          ? Smartphone
                          : dev.device === "tablet"
                          ? Tablet
                          : Monitor;
                      return (
                        <div key={dev.device} className="flex items-center justify-between text-xs font-inter">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#f0f9ff] text-[#00507D] border border-sky-100 flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="capitalize text-neutral-800 font-medium">
                              {dev.device}
                            </span>
                          </div>
                          <span className="font-bold text-neutral-900">
                            {pct}% ({dev.count})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Browsers */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-sky-600" />
                      Web Browsers
                    </span>
                  </h3>
                  <div className="space-y-3 pt-2">
                    {analyticsData?.browsers?.map((br) => {
                      const total = analyticsData.summary?.totalViews || 1;
                      const pct = Math.round((br.count / total) * 100);
                      return (
                        <div key={br.browser} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-inter">
                            <span className="text-neutral-800 font-medium">{br.browser}</span>
                            <span className="font-bold text-[#00507D]">{br.count}</span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Operating Systems */}
                <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      Operating Systems
                    </span>
                  </h3>
                  <div className="space-y-3 pt-2">
                    {analyticsData?.operatingSystems?.map((o) => {
                      const total = analyticsData.summary?.totalViews || 1;
                      const pct = Math.round((o.count / total) * 100);
                      return (
                        <div key={o.os} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-inter">
                            <span className="text-neutral-800 font-medium">{o.os}</span>
                            <span className="font-bold text-emerald-700">{o.count}</span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid 4: Geographics & Live Visitor Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Geographic Locations */}
                <div className="lg:col-span-5 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#00507D]" />
                        Visitor Locations
                      </h3>
                      <p className="font-inter text-xs text-neutral-500">
                        Country and city visitor distribution
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    {analyticsData?.countries?.map((c) => (
                      <div
                        key={c.country}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs font-inter"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-neutral-200/80 text-neutral-700 flex items-center justify-center text-[10px] font-bold font-mono">
                            {c.country_code || "IN"}
                          </span>
                          <span className="text-neutral-800 font-medium">{c.country}</span>
                        </div>
                        <span className="font-bold text-[#00507D]">{c.count} visits</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-[11px] font-inter text-neutral-500 flex items-start gap-2.5">
                    <Shield className="w-4 h-4 shrink-0 text-[#00507D] mt-0.5" />
                    <span>
                      <b>Privacy-Compliant Analytics:</b> Location data is determined via cloud edge proxy headers without storing personal IP addresses.
                    </span>
                  </div>
                </div>

                {/* Live Real-time Activity Stream */}
                <div className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        Live Visitor Activity Stream
                      </h3>
                      <p className="font-inter text-xs text-neutral-500">
                        Latest incoming pageviews across the website
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-inter font-semibold border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Stream
                    </span>
                  </div>

                  {analyticsData?.recentEvents && analyticsData.recentEvents.length > 0 ? (
                    <div className="divide-y divide-neutral-100 overflow-x-auto max-h-[380px] scrollbar-none font-inter">
                      {analyticsData.recentEvents.map((evt) => (
                        <div key={evt.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                              {new Date(evt.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            <span className="font-semibold text-neutral-800 font-mono truncate max-w-[150px] sm:max-w-[200px]">
                              {evt.path}
                            </span>
                            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px]">
                              {evt.traffic_source || "Direct"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 text-[11px] text-neutral-500">
                            <span className="capitalize">{evt.device_type}</span>
                            <span>•</span>
                            <span className="font-semibold text-neutral-700">{evt.country || "India"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-inter text-neutral-400 py-8 text-center">No visitor events recorded yet</p>
                  )}
                </div>
              </div>

              {/* Individual Visitor Activity Sessions (Table) */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-manrope text-lg font-bold text-neutral-950">
                      Individual Visitor Sessions
                    </h3>
                    <p className="font-inter text-xs text-neutral-500 mt-1">
                      Detailed session history and sequential navigation journeys
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-inter text-xs px-3 py-1 rounded-full bg-[#f0f9ff] text-[#00507D] border border-sky-100 font-medium">
                      {analyticsData?.visitorSessions?.length || 0} Sessions Logged
                    </span>
                  </div>
                </div>

                {analyticsData?.visitorSessions && analyticsData.visitorSessions.length > 0 ? (
                  (() => {
                    const allSessions = analyticsData.visitorSessions;
                    const itemsPerPage = 8;
                    const totalPages = Math.max(1, Math.ceil(allSessions.length / itemsPerPage));
                    const currentPage = Math.min(visitorTablePage, totalPages);
                    const displayed = allSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

                    return (
                      <div className="space-y-4">
                        <div className="sm:hidden px-2 text-[11px] font-inter text-neutral-500">
                          ← Swipe horizontally to see all columns →
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[700px] text-left text-xs font-inter">
                            <thead>
                              <tr className="border-b border-neutral-100 text-neutral-400 text-[10px] font-mono uppercase tracking-wider">
                                <th className="pb-3 font-semibold">Visitor / Session</th>
                                <th className="pb-3 font-semibold">Time Active</th>
                                <th className="pb-3 font-semibold">Page Sequence</th>
                                <th className="pb-3 font-semibold">Traffic Source</th>
                                <th className="pb-3 font-semibold">Device / OS</th>
                                <th className="pb-3 font-semibold">Location</th>
                                <th className="pb-3 font-semibold text-right">Journey</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                              {displayed.map((session, sIdx) => {
                                const vidShort = session.visitor_id
                                  ? session.visitor_id.length > 14
                                    ? session.visitor_id.slice(0, 10) + "…"
                                    : session.visitor_id
                                  : "visitor";

                                return (
                                  <tr
                                    key={session.visitor_id + session.session_id + sIdx}
                                    className="hover:bg-[#f0f9ff]/40 transition-colors"
                                  >
                                    {/* Visitor ID */}
                                    <td className="py-3.5 pr-3">
                                      <div className="flex items-center gap-1.5 font-mono">
                                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-semibold text-[11px]">
                                          #{vidShort}
                                        </span>
                                        {session.is_new_visitor ? (
                                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                            NEW
                                          </span>
                                        ) : (
                                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-sky-50 text-sky-700 font-bold border border-sky-200">
                                            RETURNING
                                          </span>
                                        )}
                                      </div>
                                    </td>

                                    {/* Time Active */}
                                    <td className="py-3.5 pr-3">
                                      <div className="text-neutral-800 text-xs font-medium">
                                        {new Date(session.last_seen).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </div>
                                      <div className="text-[10px] text-neutral-400">
                                        {formatDuration(session.duration_seconds)}
                                      </div>
                                    </td>

                                    {/* Page sequence preview */}
                                    <td className="py-3.5 pr-3 max-w-[240px]">
                                      <div className="space-y-1">
                                        <span className="text-[11px] font-bold text-[#00507D]">
                                          {session.page_views} pageviews
                                        </span>
                                        <div className="flex items-center gap-1 flex-wrap">
                                          {session.pages_sequence &&
                                            session.pages_sequence.slice(0, 3).map((p, pIdx) => (
                                              <span
                                                key={pIdx}
                                                className="px-1.5 py-0.5 rounded bg-neutral-100 text-[10px] font-mono text-neutral-700 truncate max-w-[80px]"
                                                title={p}
                                              >
                                                {p}
                                              </span>
                                            ))}
                                          {session.pages_sequence && session.pages_sequence.length > 3 && (
                                            <span className="text-[10px] text-neutral-400">
                                              +{session.pages_sequence.length - 3}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </td>

                                    {/* Source */}
                                    <td className="py-3.5 pr-3">
                                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                                        {session.traffic_source || "Direct"}
                                      </span>
                                    </td>

                                    {/* Device / OS */}
                                    <td className="py-3.5 pr-3">
                                      <div className="text-neutral-800 text-xs capitalize font-medium">
                                        {session.device_type}
                                      </div>
                                      <div className="text-[11px] text-neutral-500">
                                        {session.browser} / {session.os}
                                      </div>
                                    </td>

                                    {/* Location */}
                                    <td className="py-3.5 pr-3">
                                      <div className="text-neutral-800 text-xs font-medium">
                                        {session.city ? `${session.city}, ` : ""}{session.country || "India"}
                                      </div>
                                    </td>

                                    {/* Action button */}
                                    <td className="py-3.5 text-right">
                                      <button
                                        onClick={() => setSelectedJourneyVisitor(session)}
                                        className="px-3 py-1.5 rounded-xl bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5"
                                      >
                                        <Footprints className="w-3.5 h-3.5" />
                                        <span>Inspect</span>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        {totalPages > 1 && (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-100 text-xs font-inter text-neutral-500">
                            <div>
                              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                              {Math.min(currentPage * itemsPerPage, allSessions.length)} of {allSessions.length} sessions
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setVisitorTablePage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 font-medium"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span>Prev</span>
                              </button>
                              <span className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-800 font-bold font-mono">
                                {currentPage} / {totalPages}
                              </span>
                              <button
                                onClick={() => setVisitorTablePage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 font-medium"
                              >
                                <span>Next</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-xs font-inter text-neutral-400 py-10 text-center">
                    No individual visitor sessions recorded yet
                  </p>
                )}
              </div>

              {/* Danger Zone: Clear Analytics Data */}
              <div className="bg-white border border-rose-200 rounded-3xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-manrope text-base font-bold text-neutral-950">
                        Clear Website Analytics Data
                      </h3>
                      <p className="font-inter text-xs text-neutral-500 mt-1 max-w-xl">
                        Reset all visitor tracking history and analytics sessions. Client accounts, invoices, projects, and portfolio data are completely safe and untouched.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setClearConfirmText("");
                      setClearAnalyticsModal(true);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PROJECTS MANAGEMENT                                */}
          {/* ========================================================= */}
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
                      gallery: [],
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
                        {Array.isArray(proj.gallery) && proj.gallery.length > 0 && (
                          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white font-mono text-[9px] flex items-center gap-0.5">
                            <Images className="w-2.5 h-2.5" />
                            <span>+{proj.gallery.length}</span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-[10px] font-semibold text-[#00507D] bg-[#f0f9ff] px-2 py-0.5 rounded-md uppercase">
                            {proj.type}
                          </span>
                          {Array.isArray(proj.gallery) && proj.gallery.length > 0 && (
                            <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-md">
                              {proj.gallery.length} extra media
                            </span>
                          )}
                        </div>
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
                            setProjectForm({
                              ...proj,
                              gallery: Array.isArray(proj.gallery) ? proj.gallery : [],
                            });
                            setEditingId(proj.id);
                            setProjectModal(true);
                          }}
                          className="p-2 rounded-xl text-neutral-500 hover:text-[#00507D] hover:bg-[#f0f9ff] transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
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
          {/* TAB: CLIENT LOGO MANAGEMENT                               */}
          {/* ========================================================= */}
          {activeTab === "client-logos" && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f9ff] text-[#00507D] text-[11px] font-semibold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>OUR CLIENTS SHOWCASE</span>
                  </div>
                  <h2 className="font-manrope text-2xl font-bold text-neutral-950">
                    Client Logo Management
                  </h2>
                  <p className="font-inter text-xs sm:text-sm text-neutral-600 mt-1">
                    Manage client brand logos, ordering, background transparency, and visibility in the homepage &quot;Our Clients&quot; section.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setClientLogoForm({
                      client_name: "",
                      image_url: "",
                      cloudinary_public_id: "",
                      old_public_id: "",
                      alt_text: "",
                      display_order: clientLogos.length + 1,
                      is_active: true,
                    });
                    setEditingLogoId(null);
                    setClientLogoModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white text-xs font-semibold font-inter shadow-md transition-all cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Client Logo</span>
                </button>
              </div>

              {/* 3 Overview Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Total Logos
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-950 mt-1">
                    {clientLogos.length}
                  </p>
                  <span className="font-mono text-xs text-neutral-400 mt-1 block">In showcase catalog</span>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Active on Website
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                    {clientLogos.filter((l) => l.is_active).length}
                  </p>
                  <span className="font-mono text-xs text-emerald-600 mt-1 block">Publicly rendered</span>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs">
                  <span className="font-inter text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Hidden / Drafts
                  </span>
                  <p className="font-manrope text-2xl sm:text-3xl font-extrabold text-neutral-400 mt-1">
                    {clientLogos.filter((l) => !l.is_active).length}
                  </p>
                  <span className="font-mono text-xs text-neutral-400 mt-1 block">Hidden from public</span>
                </div>
              </div>

              {/* Client Logos Management Table */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs">
                {clientLogos.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-inter">
                      <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                        <tr>
                          <th className="p-4 pl-6">Order</th>
                          <th className="p-4">Logo Preview</th>
                          <th className="p-4">Client / Brand Name</th>
                          <th className="p-4">Alt Description</th>
                          <th className="p-4">Homepage Status</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {clientLogos.map((logo, idx) => (
                          <tr
                            key={`client-logo-row-${logo.id ?? "logo"}-${idx}`}
                            className="hover:bg-[#f0f9ff]/40 transition-colors"
                          >
                            {/* Order & Reorder Controls */}
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-1.5 font-mono">
                                <span className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center font-bold text-neutral-700 text-[11px]">
                                  {logo.display_order ?? idx + 1}
                                </span>
                                <div className="flex flex-col gap-0.5">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveLogoOrder(idx, "up")}
                                    disabled={idx === 0}
                                    title="Move logo up in display order"
                                    className="p-1 rounded hover:bg-neutral-200 text-neutral-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveLogoOrder(idx, "down")}
                                    disabled={idx === clientLogos.length - 1}
                                    title="Move logo down in display order"
                                    className="p-1 rounded hover:bg-neutral-200 text-neutral-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </td>

                            {/* Logo Thumbnail with Dual Background Preview on Hover */}
                            <td className="p-4">
                              <div className="relative group w-20 h-12 rounded-xl border border-neutral-200/80 bg-white flex items-center justify-center p-1.5 overflow-hidden transition-all shadow-2xs hover:border-[#00507D]/40">
                                <img
                                  src={logo.image_url}
                                  alt={logo.alt_text || logo.client_name}
                                  className="max-h-full max-w-full object-contain"
                                />
                                {/* Quick dark preview tooltip on hover */}
                                <div className="absolute inset-0 bg-[#090d16] flex items-center justify-center p-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  <img
                                    src={logo.image_url}
                                    alt="Dark Preview"
                                    className="max-h-full max-w-full object-contain drop-shadow-xs"
                                  />
                                </div>
                              </div>
                            </td>

                            {/* Client Name */}
                            <td className="p-4 font-manrope font-bold text-neutral-950 text-sm">
                              {logo.client_name}
                            </td>

                            {/* Alt Text */}
                            <td className="p-4 text-neutral-500 font-mono text-[11px]">
                              {logo.alt_text || logo.client_name}
                            </td>

                            {/* Visibility Toggle Button */}
                            <td className="p-4">
                              <button
                                type="button"
                                onClick={() => handleToggleLogoStatus(logo)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                                  logo.is_active
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                    : "bg-neutral-100 text-neutral-500 border border-neutral-200 hover:bg-neutral-200"
                                }`}
                                title="Click to toggle visibility on public website"
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    logo.is_active ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                                  }`}
                                />
                                <span>{logo.is_active ? "Visible on Site" : "Hidden"}</span>
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="p-4 pr-6 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setClientLogoForm({
                                      client_name: logo.client_name || "",
                                      image_url: logo.image_url || "",
                                      cloudinary_public_id: logo.cloudinary_public_id || "",
                                      old_public_id: logo.cloudinary_public_id || "",
                                      alt_text: logo.alt_text || logo.client_name || "",
                                      display_order: logo.display_order ?? idx + 1,
                                      is_active: Boolean(logo.is_active),
                                    });
                                    setEditingLogoId(logo.id);
                                    setClientLogoModal(true);
                                  }}
                                  className="p-2 rounded-xl text-neutral-500 hover:text-[#00507D] hover:bg-[#f0f9ff] transition-colors cursor-pointer"
                                  title="Edit client logo details"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteClientLogo(logo.id, logo.client_name)}
                                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                  title="Delete client logo"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center text-neutral-400 space-y-3">
                    <Award className="w-10 h-10 text-neutral-300 mx-auto" />
                    <p className="font-manrope text-sm font-semibold text-neutral-600">
                      No client logos registered yet
                    </p>
                    <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                      Click the button above to add your first client logo with background transparency.
                    </p>
                  </div>
                )}
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
                <div className="sm:hidden px-4 py-2 bg-neutral-50/80 border-b border-neutral-100 flex items-center justify-between text-[11px] font-inter text-neutral-500">
                  <span>← Swipe horizontally to see all columns →</span>
                  <span className="font-mono text-[10px]">{clients.length} clients</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-xs font-inter">
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
                            onClick={() => handleDeleteClient(c.id, c.name)}
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
                <div className="sm:hidden px-4 py-2 bg-neutral-50/80 border-b border-neutral-100 flex items-center justify-between text-[11px] font-inter text-neutral-500">
                  <span>← Swipe horizontally to see all columns →</span>
                  <span className="font-mono text-[10px]">{invoices.length} invoices</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-xs font-inter">
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
                              onClick={() => handleDeleteInvoice(inv.id, inv.invoice_number)}
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
                  onClick={openAddTestimonialModal}
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
                          onClick={() => openEditTestimonialModal(t)}
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

              {/* Cloudinary Cover Screenshot Upload */}
              <div className="space-y-2">
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block">
                  Project Cover Screenshot (Cloudinary)
                </label>
                {projectForm.image_url ? (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                    <img
                      src={projectForm.image_url}
                      alt="Cover Preview"
                      className="w-16 h-12 object-cover rounded-xl border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-emerald-600 font-semibold truncate">
                        ✓ Cloudinary Cover Ready
                      </p>
                      <p className="font-mono text-[10px] text-neutral-400 truncate">
                        {projectForm.image_public_id || "Asset Linked"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Replace</span>
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
                      <button
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, image_url: "", image_public_id: "" })}
                        className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Cover Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Upload Cover Screenshot"}</span>
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
                  </div>
                )}
              </div>

              {/* Multiple Gallery Screenshots */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold text-neutral-700 uppercase text-[11px] block">
                      Additional Gallery Screenshots
                    </label>
                    <p className="text-[10px] text-neutral-400">
                      Upload multiple secondary screenshots or mobile views
                    </p>
                  </div>
                  <label className="cursor-pointer px-3 py-1.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "nylex/projects/gallery", (url, public_id) => {
                          setProjectForm((prev) => ({
                            ...prev,
                            gallery: [...(prev.gallery || []), { image_url: url, public_id, caption: "" }],
                          }));
                        })
                      }
                    />
                  </label>
                </div>

                {Array.isArray(projectForm.gallery) && projectForm.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {projectForm.gallery.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-video"
                      >
                        <img
                          src={item.image_url}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setProjectForm((prev) => ({
                              ...prev,
                              gallery: prev.gallery.filter((_, i) => i !== idx),
                            }));
                          }}
                          className="absolute top-1 right-1 p-1 rounded-md bg-black/60 hover:bg-rose-600 text-white transition-colors"
                          title="Remove Screenshot"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
              <div className="space-y-2">
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block">
                  Brand Logo (Cloudinary)
                </label>
                {clientForm.logo_url ? (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                    <img
                      src={clientForm.logo_url}
                      alt="Logo Preview"
                      className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-emerald-600 font-semibold truncate">
                        ✓ Cloudinary Logo Ready
                      </p>
                      <p className="font-mono text-[10px] text-neutral-400 truncate">
                        {clientForm.logo_public_id || "Asset Linked"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Replace</span>
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
                      <button
                        type="button"
                        onClick={() => setClientForm({ ...clientForm, logo_url: "", logo_public_id: "" })}
                        className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Logo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Upload Logo"}</span>
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
                  </div>
                )}
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
      {/* MODAL 2.5: CLIENT LOGO SHOWCASE MODAL                     */}
      {/* ========================================================= */}
      {clientLogoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#f0f9ff] text-[#00507D] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-manrope text-base font-bold text-neutral-950">
                    {editingLogoId ? "Edit Client Showcase Logo" : "Add Client Showcase Logo"}
                  </h3>
                  <p className="font-inter text-[11px] text-neutral-500">
                    Dynamic logo displayed on the homepage &quot;Our Clients&quot; showcase.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setClientLogoModal(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClientLogo} className="space-y-4 text-xs font-inter">
              {/* Client Name */}
              <div>
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                  Client / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taste of Malabar"
                  value={clientLogoForm.client_name}
                  onChange={(e) =>
                    setClientLogoForm({
                      ...clientLogoForm,
                      client_name: e.target.value,
                      alt_text: clientLogoForm.alt_text ? clientLogoForm.alt_text : e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                />
              </div>

              {/* Alt Text & Display Order */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Alt Text (Accessibility)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Taste of Malabar Logo"
                    value={clientLogoForm.alt_text}
                    onChange={(e) =>
                      setClientLogoForm({ ...clientLogoForm, alt_text: e.target.value })
                    }
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 uppercase text-[11px] block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={clientLogoForm.display_order}
                    onChange={(e) =>
                      setClientLogoForm({
                        ...clientLogoForm,
                        display_order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-[#00507D] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Visibility Active Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div>
                  <span className="font-semibold text-neutral-800 text-xs block">
                    Showcase Visibility
                  </span>
                  <span className="text-[11px] text-neutral-500 block">
                    Toggle whether this client logo appears publicly on the website.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clientLogoForm.is_active}
                    onChange={(e) =>
                      setClientLogoForm({ ...clientLogoForm, is_active: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00507D]"></div>
                </label>
              </div>

              {/* Logo Asset & Studio Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-neutral-700 uppercase text-[11px]">
                    Client Logo Image *
                  </label>
                  {clientLogoForm.image_url && (
                    <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setLogoPreviewTheme("white")}
                        className={`px-2 py-0.5 text-[10px] rounded font-medium transition-colors cursor-pointer ${
                          logoPreviewTheme === "white"
                            ? "bg-white text-neutral-900 shadow-xs"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                        title="Preview on white"
                      >
                        White
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogoPreviewTheme("dark")}
                        className={`px-2 py-0.5 text-[10px] rounded font-medium transition-colors cursor-pointer ${
                          logoPreviewTheme === "dark"
                            ? "bg-neutral-900 text-white shadow-xs"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                        title="Preview on dark"
                      >
                        Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogoPreviewTheme("checker")}
                        className={`px-2 py-0.5 text-[10px] rounded font-medium transition-colors cursor-pointer ${
                          logoPreviewTheme === "checker"
                            ? "bg-sky-100 text-[#00507D] shadow-xs"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                        title="Preview on transparency grid"
                      >
                        Grid
                      </button>
                    </div>
                  )}
                </div>

                {clientLogoForm.image_url ? (
                  <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
                    <div
                      className={`h-32 flex items-center justify-center p-4 transition-colors ${
                        logoPreviewTheme === "dark"
                          ? "bg-[#090d16]"
                          : logoPreviewTheme === "checker"
                          ? "bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%),linear-gradient(-45deg,#f0f0f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0f0f0_75%),linear-gradient(-45deg,transparent_75%,#f0f0f0_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0]"
                          : "bg-white border-b border-neutral-100"
                      }`}
                    >
                      <img
                        src={clientLogoForm.image_url}
                        alt="Preview"
                        className="max-h-24 max-w-[200px] object-contain drop-shadow-xs"
                      />
                    </div>
                    <div className="p-3 bg-neutral-50 flex items-center justify-between border-t border-neutral-100">
                      <div className="min-w-0 pr-2">
                        <p className="font-mono text-[11px] text-emerald-600 font-semibold truncate">
                          ✓ Asset Linked
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400 truncate max-w-[220px]">
                          {clientLogoForm.cloudinary_public_id || "Local / Pre-seeded asset"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setLogoStudioModal(true)}
                          className="px-3 py-1.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Studio</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setClientLogoForm({
                              ...clientLogoForm,
                              image_url: "",
                              cloudinary_public_id: "",
                            })
                          }
                          className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove logo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLogoStudioModal(true)}
                      className="p-4 rounded-2xl border-2 border-dashed border-[#00507D]/30 bg-[#f0f9ff]/50 hover:bg-[#f0f9ff] text-[#00507D] flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group text-center"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white text-[#00507D] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs block">Logo Studio & Remover</span>
                        <span className="text-[10px] text-neutral-500 block">
                          Remove background & preview
                        </span>
                      </div>
                    </button>

                    <label className="p-4 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center group">
                      <div className="w-10 h-10 rounded-xl bg-white text-neutral-600 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs block">Quick Direct Upload</span>
                        <span className="text-[10px] text-neutral-500 block">PNG, SVG, WebP (&lt;5MB)</span>
                      </div>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, "nylex/client-logos", (url, public_id) => {
                            setClientLogoForm({
                              ...clientLogoForm,
                              image_url: url,
                              cloudinary_public_id: public_id,
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setClientLogoModal(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!clientLogoForm.client_name || !clientLogoForm.image_url}
                  className="px-6 py-2 rounded-full bg-[#00507D] hover:bg-[#003d5f] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold shadow-md transition-all cursor-pointer"
                >
                  {editingLogoId ? "Update Logo" : "Save & Publish Logo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LOGO STUDIO MODAL: BACKGROUND REMOVAL & DUAL-THEME CANVAS */}
      {/* ========================================================= */}
      <LogoStudioModal
        isOpen={logoStudioModal}
        onClose={() => setLogoStudioModal(false)}
        initialImageUrl={clientLogoForm.image_url}
        onUploadSuccess={({ url, public_id }) => {
          setClientLogoForm((prev) => ({
            ...prev,
            image_url: url,
            cloudinary_public_id: public_id,
          }));
          setLogoStudioModal(false);
          showToast("Logo processed and uploaded to Cloudinary successfully!", "success");
        }}
      />


      {/* ========================================================= */}
      {/* MODAL 2.8: ADD / EDIT CLIENT TESTIMONIAL MODAL            */}
      {/* ========================================================= */}
      {testimonialModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <h3 className="font-manrope text-base font-bold text-neutral-950">
                  {editingTestimonialId ? "Edit Client Review" : "Add Client Review"}
                </h3>
                <p className="font-inter text-xs text-neutral-500">
                  {editingTestimonialId
                    ? "Update testimonial details and visibility on the showcase"
                    : "Add a verified client review to showcase on the website"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTestimonialModal(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 mb-1">
                    Client Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full text-xs font-inter px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] focus:ring-1 focus:ring-[#00507D]"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    placeholder="e.g. Business Owner"
                    className="w-full text-xs font-inter px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] focus:ring-1 focus:ring-[#00507D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    placeholder="e.g. Taste of Malabar"
                    className="w-full text-xs font-inter px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] focus:ring-1 focus:ring-[#00507D]"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold text-neutral-700 mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= (testimonialForm.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs font-bold text-neutral-700 ml-1">
                      {testimonialForm.rating || 5}/5
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-inter text-xs font-semibold text-neutral-700 mb-1">
                  Review / Testimonial Quote <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  placeholder="What did the client say about NYLEX Digital Studio?"
                  className="w-full text-xs font-inter px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] focus:ring-1 focus:ring-[#00507D] leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="block font-inter text-xs font-semibold text-neutral-700 mb-1">
                  Avatar Image URL <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={testimonialForm.avatar_url}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar_url: e.target.value })}
                  placeholder="https://images.unsplash.com/... or leave blank"
                  className="w-full text-xs font-inter px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#00507D] focus:ring-1 focus:ring-[#00507D]"
                />
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <input
                  type="checkbox"
                  id="modal_testimonial_is_approved"
                  checked={testimonialForm.is_approved}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, is_approved: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00507D] focus:ring-[#00507D] cursor-pointer"
                />
                <label htmlFor="modal_testimonial_is_approved" className="font-inter text-xs font-medium text-neutral-800 cursor-pointer select-none">
                  Publish live on website testimonials section immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setTestimonialModal(false)}
                  disabled={testimonialSaving}
                  className="px-4 py-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={testimonialSaving}
                  className="px-5 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003B5C] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors flex items-center gap-2"
                >
                  {testimonialSaving && (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  )}
                  <span>{editingTestimonialId ? "Update Review" : "Publish Review"}</span>
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
              <div className="space-y-2">
                <label className="font-semibold text-neutral-700 uppercase text-[11px] block">
                  Payment Receipt Snapshot (Cloudinary)
                </label>
                {paymentForm.receipt_url ? (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                    <img
                      src={paymentForm.receipt_url}
                      alt="Receipt Preview"
                      className="w-12 h-12 object-cover rounded-xl bg-white border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-emerald-600 font-semibold truncate">
                        ✓ Cloudinary Receipt Ready
                      </p>
                      <p className="font-mono text-[10px] text-neutral-400 truncate">
                        {paymentForm.receipt_public_id || "Asset Linked"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Replace</span>
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
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentForm({ ...paymentForm, receipt_url: "", receipt_public_id: "" })
                        }
                        className="p-1.5 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Receipt"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#00507D] border border-[#00507D]/20 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Upload Receipt"}</span>
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
                  </div>
                )}
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
      {/* 5. MINIMALIST FLOATING TOAST NOTIFICATION (No browser popups) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md text-xs font-medium font-inter ${
              toast.type === "error"
                ? "bg-white/95 border-rose-200 text-rose-800 shadow-rose-900/10"
                : toast.type === "info"
                ? "bg-white/95 border-sky-200 text-[#00507D] shadow-sky-900/10"
                : "bg-white/95 border-emerald-200 text-emerald-850 shadow-emerald-900/10"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === "error"
                  ? "bg-rose-50 text-rose-600"
                  : toast.type === "info"
                  ? "bg-[#f0f9ff] text-[#00507D]"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {toast.type === "error" ? (
                <X className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
            </div>
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="text-neutral-400 hover:text-neutral-600 ml-2 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 6. MINIMALIST PREMIUM CONFIRMATION MODAL (Replaces confirm)*/}
      {/* ========================================================= */}
      <AnimatePresence>
        {confirmModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-manrope text-base font-bold text-neutral-950">
                    {confirmModal.title}
                  </h3>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    Irreversible Action
                  </span>
                </div>
              </div>

              <p className="font-inter text-xs text-neutral-600 leading-relaxed">
                {confirmModal.message}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmModal.onConfirm}
                  className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  {confirmModal.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 7. CYBERSECURITY VISITOR JOURNEY TIMELINE INSPECTOR MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedJourneyVisitor && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#090d16] border border-emerald-500/30 rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl space-y-5 text-neutral-100 font-mono"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-neutral-400 ml-2">
                    telemetry-trace // #{selectedJourneyVisitor.session_id?.slice(-8)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedJourneyVisitor(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Visitor & Session Metadata Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                <div className="bg-[#0d1527] border border-neutral-800 rounded-xl p-2.5">
                  <span className="text-neutral-500 block uppercase">VISITOR_ID</span>
                  <span className="text-emerald-400 font-bold truncate block">
                    #{selectedJourneyVisitor.visitor_id?.slice(0, 10)}…
                  </span>
                </div>
                <div className="bg-[#0d1527] border border-neutral-800 rounded-xl p-2.5">
                  <span className="text-neutral-500 block uppercase">SESSION_ID</span>
                  <span className="text-cyan-400 font-bold truncate block">
                    #{selectedJourneyVisitor.session_id?.slice(-8)}
                  </span>
                </div>
                <div className="bg-[#0d1527] border border-neutral-800 rounded-xl p-2.5">
                  <span className="text-neutral-500 block uppercase">ENVIRONMENT</span>
                  <span className="text-white font-semibold truncate block capitalize">
                    {selectedJourneyVisitor.device_type} • {selectedJourneyVisitor.browser}
                  </span>
                </div>
                <div className="bg-[#0d1527] border border-neutral-800 rounded-xl p-2.5">
                  <span className="text-neutral-500 block uppercase">LOCATION</span>
                  <span className="text-white font-semibold truncate block">
                    {selectedJourneyVisitor.city ? `${selectedJourneyVisitor.city}, ` : ""}{selectedJourneyVisitor.country || "IN"}
                  </span>
                </div>
              </div>

              {/* Chronological Navigation Steps Timeline */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    Chronological Pageview Progression ({selectedJourneyVisitor.page_views || selectedJourneyVisitor.pages_sequence?.length || 1})
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    Duration: {formatDuration(selectedJourneyVisitor.duration_seconds)}
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-3 pr-1 divide-y divide-neutral-800/40">
                  {selectedJourneyVisitor.pages_sequence && selectedJourneyVisitor.pages_sequence.length > 0 ? (
                    selectedJourneyVisitor.pages_sequence.map((path, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === selectedJourneyVisitor.pages_sequence.length - 1;
                      const time = selectedJourneyVisitor.times_sequence?.[idx] || "--:--:--";
                      const title = selectedJourneyVisitor.titles_sequence?.[idx] || path;

                      return (
                        <div key={idx} className="pt-2.5 flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                              isFirst
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : isLast
                                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                            }`}
                          >
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white truncate max-w-[280px]">{path}</span>
                              <span className="text-[10px] text-neutral-400">{time}</span>
                            </div>
                            <p className="font-sans text-[11px] text-neutral-400 truncate mt-0.5">{title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0d1527] border border-neutral-700 text-neutral-400">
                                {isFirst ? "ENTRY_LANDING" : isLast ? "EXIT_DEPARTURE" : "PAGE_TRANSITION"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-neutral-500 py-4 text-center">[NO_STEP_DATA]</p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedJourneyVisitor(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 8. CYBERSECURITY CLEAR ANALYTICS CONFIRMATION MODAL       */}
      {/* ========================================================= */}
      <AnimatePresence>
        {clearAnalyticsModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0e0709] border border-rose-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 text-neutral-100 font-mono"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                    [CRITICAL_ACTION: PURGE]
                  </div>
                  <h3 className="font-manrope text-base sm:text-lg font-bold text-white">
                    Clear All Website Analytics?
                  </h3>
                </div>
              </div>

              <div className="space-y-2 text-xs font-sans text-neutral-300 leading-relaxed bg-[#190a0f] border border-rose-500/20 rounded-2xl p-4">
                <p>
                  This action permanently executes <code className="text-rose-400 font-mono text-[11px]">DELETE FROM website_analytics;</code> in Neon PostgreSQL.
                </p>
                <p className="text-neutral-400 text-[11px]">
                  All recorded traffic stats, daily timeline logs, and visitor sessions will be purged. Projects, invoices, clients, and enquiries are preserved.
                </p>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-neutral-400 text-[11px] block">
                  To confirm permanent deletion, type <span className="text-rose-400 font-bold select-all">DELETE ALL ANALYTICS</span> below:
                </label>
                <input
                  type="text"
                  autoFocus
                  value={clearConfirmText}
                  onChange={(e) => setClearConfirmText(e.target.value)}
                  placeholder="Type: DELETE ALL ANALYTICS"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070305] border border-rose-500/40 text-rose-200 placeholder-neutral-600 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-800 font-sans">
                <button
                  type="button"
                  disabled={clearingAnalytics}
                  onClick={() => {
                    setClearAnalyticsModal(false);
                    setClearConfirmText("");
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={clearConfirmText !== "DELETE ALL ANALYTICS" || clearingAnalytics}
                  onClick={handleClearAllAnalytics}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-1.5 font-mono"
                >
                  {clearingAnalytics ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>PURGING...</span>
                    </>
                  ) : (
                    <span>CONFIRM PURGE</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
