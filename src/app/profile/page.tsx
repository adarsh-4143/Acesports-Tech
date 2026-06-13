"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  User, 
  Settings as SettingsIcon, 
  LogOut,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  Truck,
  CreditCard,
  Edit2,
  Check,
  AlertCircle,
  X,
  CheckCircle2
} from "lucide-react";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { orderService } from "@/services/orderService";
import { userService } from "@/services/userService";

// Mock Data
const MOCK_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Sports Avenue, Suite 100, New York, NY 10001",
  joinDate: "August 2024",
  points: 1250,
};

const MOCK_ORDERS = [
  {
    id: "ORD-9823",
    date: "Oct 12, 2024",
    total: "$1,240.00",
    status: "Delivered",
    items: 3,
    icon: <CheckCircle className="text-green-500" size={20} />
  },
  {
    id: "ORD-9871",
    date: "Oct 28, 2024",
    total: "$450.00",
    status: "Shipped",
    items: 1,
    icon: <Truck className="text-blue-500" size={20} />
  },
  {
    id: "ORD-9910",
    date: "Nov 02, 2024",
    total: "$89.99",
    status: "Processing",
    items: 2,
    icon: <Clock className="text-orange-500" size={20} />
  }
];

export default function ProfilePage() {
  const { isLoggedIn, isAuthLoading, logout, user, login } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  
  // Account Detail States
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user?.full_name || MOCK_USER.name,
    email: user?.email || MOCK_USER.email,
    phone: user?.mobile || MOCK_USER.phone,
    business_name: "",
    gst_number: "",
    address: MOCK_USER.address,
    joinDate: MOCK_USER.joinDate,
    points: MOCK_USER.points,
  });

  React.useEffect(() => {
    if (user) {
      setUserDetails(prev => ({
        ...prev,
        name: user.full_name || "User",
        email: user.email,
        phone: user.mobile || prev.phone
      }));

      // Fetch user specific details if we don't have them in context
      userService.getUser(user.user_id).then(res => {
        if (res.data?.success) {
          const u = res.data.data;
          setUserDetails(p => ({
            ...p,
            business_name: u.business_name || "",
            gst_number: u.gst_number || ""
          }));
        }
      }).catch(e => console.error(e));

      // Fetch orders
      orderService.getOrders(user.login_id).then(res => {
        if (res.data?.success) {
          const o = res.data.data.rows || res.data.data;
          setOrders(Array.isArray(o) ? o : []);
        }
      }).catch(e => console.error(e));
    }
  }, [user]);

  // Settings States
  const [newsletter, setNewsletter] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Validation States
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const capitalizeWords = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  const handleDetailsChange = (field: string, value: string) => {
    if (value.trim() === "" && value.length > 0) return;

    let newValue = value;
    if (field === "phone") {
      newValue = value.replace(/[^0-9]/g, "");
    } else if (field === "name") {
      newValue = capitalizeWords(value);
    }
    
    setUserDetails({ ...userDetails, [field]: newValue });
  };

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isAuthLoading, router]);

  if (isAuthLoading || !isLoggedIn) return null; // Prevent flashing while redirecting

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      showToast("Please fill in all required fields.");
      return;
    }

    if (userDetails.phone.length !== 10) {
      showToast("Please Enter Valid Mobile Number (10 digits).");
      return;
    }

    if (!validateEmail(userDetails.email)) {
      showToast("Please Enter Valid Email Address.");
      return;
    }

    if (user) {
      setLoading(true);
      try {
        const payload = {
          full_name: userDetails.name,
          email: userDetails.email,
          mobile: userDetails.phone,
          business_name: userDetails.business_name,
          gst_number: userDetails.gst_number
        };
        const res = await userService.updateUser(user.user_id, payload);
        if (res.data?.success) {
          showToast("Profile details updated successfully.", "success");
          
          // Optionally update local storage context
          const token = localStorage.getItem("auth_token") || "";
          login(token, { ...user, full_name: userDetails.name, email: userDetails.email, mobile: userDetails.phone });
          
          setIsEditing(false);
        } else {
          showToast(res.data?.message || "Update failed", "error");
        }
      } catch (err: any) {
        showToast(err.response?.data?.message || err.message || "Failed to update profile", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "details", label: "Account Details", icon: User },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 relative bg-slate-50 flex justify-center">
      <AnimatedBackgroundLight />
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded shadow-xl border ${
              toast.type === "error" ? "bg-red-500/10 border-red-500/50 text-red-500 bg-white" : "bg-[#39FF14]/10 border-[#39FF14]/50 text-[#00CC44] bg-white"
            }`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            <button type="button" onClick={() => setToast(null)} className="ml-2 hover:opacity-70"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-6xl px-4 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white border border-slate-200 shadow-xl p-6 sticky top-28">
            <div className="text-center mb-8 border-b border-slate-100 pb-6">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                <span className="text-[#39FF14] text-2xl font-bold font-display tracking-widest uppercase">
                  {userDetails.name ? userDetails.name.split(' ').map(n => n?.[0] || '').join('') : 'U'}
                </span>
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900 uppercase tracking-wide">{userDetails.name}</h2>
              <p className="text-slate-500 text-sm mt-1">{userDetails.email}</p>
            </div>

            <nav className="flex flex-col gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative overflow-hidden ${
                      isActive ? "text-[#39FF14] bg-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#39FF14]"
                      />
                    )}
                    <Icon size={18} className={isActive ? "text-[#39FF14]" : "opacity-70"} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 mt-4 text-sm font-semibold tracking-wide uppercase text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200 shadow-xl p-8"
            >
              {/* Dashboard Tab */}
              {activeTab === "dashboard" && (
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-wide mb-6 border-b border-slate-100 pb-4">Dashboard Overview</h1>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center hover:border-[#39FF14]/50 transition-colors">
                      <Package size={28} className="text-slate-400 mb-3" />
                      <span className="text-3xl font-bold text-slate-900 font-display">{orders.length}</span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Total Orders</span>
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center hover:border-[#39FF14]/50 transition-colors">
                      <Truck size={28} className="text-blue-400 mb-3" />
                      <span className="text-3xl font-bold text-slate-900 font-display">{orders.filter(o => o.statusName === 'Shipped').length}</span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">In Transit</span>
                    </div>
                    <div className="p-6 bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(57,255,20,0.1)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.15)_0,transparent_70%)]" />
                      <CreditCard size={28} className="text-[#39FF14] mb-3 relative z-10" />
                      <span className="text-3xl font-bold text-white font-display relative z-10">{userDetails.points}</span>
                      <span className="text-xs font-semibold text-[#39FF14] uppercase tracking-widest mt-1 relative z-10">Reward Points</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {orders.length === 0 ? (
                        <p className="text-sm text-slate-500 p-4 border border-slate-100">No orders found.</p>
                      ) : orders.slice(0, 2).map((order) => (
                        <div key={order.id || order.orderId} className="flex items-center justify-between p-4 border border-slate-100 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                              {order.icon || <Package className="text-blue-500" size={20} />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Order {order.orderNo || order.id}</p>
                              <p className="text-xs text-slate-500">{order.date || new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">₹{order.netpayableAmount || order.total}</p>
                            <p className={`text-xs font-semibold uppercase tracking-wider ${
                              (order.statusName || order.status) === 'Delivered' ? 'text-green-500' :
                              (order.statusName || order.status) === 'Shipped' ? 'text-blue-500' : 'text-orange-500'
                            }`}>{order.statusName || order.status}</p>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => setActiveTab("orders")} className="w-full py-3 text-sm font-semibold text-blue-600 uppercase tracking-widest hover:underline text-center">
                        View All Orders
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-wide mb-6 border-b border-slate-100 pb-4">My Orders</h1>
                  <div className="space-y-6">
                    {orders.length === 0 ? (
                       <p className="text-sm text-slate-500 p-4 border border-slate-200">You haven&apos;t placed any orders yet.</p>
                    ) : orders.map((order) => (
                      <div key={order.id || order.orderId} className="border border-slate-200 bg-white group hover:shadow-lg transition-all duration-300">
                        <div className="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200">
                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1">Order Placed</span>
                            <span className="text-sm font-bold text-slate-900">{order.date || new Date(order.orderDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1">Total Amount</span>
                            <span className="text-sm font-bold text-slate-900">₹{order.netpayableAmount || order.total}</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1">Order ID</span>
                            <span className="text-sm font-bold text-slate-900">{order.orderNo || order.id}</span>
                          </div>
                          <button className="text-xs font-semibold text-blue-600 uppercase tracking-widest hover:underline">
                            View Invoice
                          </button>
                        </div>
                        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                              <Package className="text-slate-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 mb-1">{order.items ? (Array.isArray(order.items) ? order.items.length : order.items) : 1} Item(s) Package</h4>
                              <p className="text-xs text-slate-500 mb-2">Order placed on {new Date(order.orderDate || order.created_at || new Date()).toLocaleDateString()}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm font-display font-bold text-slate-900">₹{order.netpayableAmount?.toLocaleString('en-IN') || order.total?.toLocaleString('en-IN') || '0.00'}</span>
                                <div className="flex items-center gap-2">
                                  {order.icon || <CheckCircle className="text-green-500" size={16} />}
                                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                                    (order.statusName || order.status) === 'Delivered' ? 'text-green-600' :
                                    (order.statusName || order.status) === 'Shipped' ? 'text-blue-600' : 'text-orange-600'
                                  }`}>{order.statusName || order.status || 'PENDING'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-slate-800 transition-colors">
                              Track Order
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-2 border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                              Support
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Details Tab */}
              {activeTab === "details" && (
                <div>
                  <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <h1 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-wide">Account Details</h1>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                    )}
                  </div>
                  
                  <form onSubmit={handleSaveDetails} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={16} className="text-slate-400" />
                          </div>
                          <input 
                            type="text" 
                            disabled={!isEditing}
                            required
                            value={userDetails.name}
                            onChange={(e) => handleDetailsChange("name", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black disabled:opacity-70"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={16} className="text-slate-400" />
                          </div>
                          <input 
                            type="email" 
                            disabled={!isEditing}
                            required
                            value={userDetails.email}
                            onChange={(e) => handleDetailsChange("email", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black disabled:opacity-70"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={16} className="text-slate-400" />
                          </div>
                          <input 
                            type="tel" 
                            disabled={!isEditing}
                            required
                            maxLength={10}
                            value={userDetails.phone}
                            onChange={(e) => handleDetailsChange("phone", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black disabled:opacity-70"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Business Name</label>
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={userDetails.business_name}
                          onChange={(e) => handleDetailsChange("business_name", e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black disabled:opacity-70"
                          placeholder="Your Company Pvt Ltd"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">GST Number</label>
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          maxLength={15}
                          value={userDetails.gst_number}
                          onChange={(e) => handleDetailsChange("gst_number", e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black disabled:opacity-70 uppercase"
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Shipping Address</label>
                      <div className="relative">
                        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                          <MapPin size={16} className="text-slate-400" />
                        </div>
                        <textarea 
                          disabled={!isEditing}
                          required
                          value={userDetails.address}
                          onChange={(e) => handleDetailsChange("address", e.target.value)}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all text-sm text-black disabled:opacity-70 resize-none"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isEditing && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-4 pt-4 border-t border-slate-100"
                        >
                          <button 
                            type="submit" 
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-[#39FF14] font-semibold text-xs uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <span className="w-3 h-3 border-2 border-[#39FF14]/30 border-t-[#39FF14] rounded-full animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Check size={16} /> Save Changes
                              </>
                            )}
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setIsEditing(false)}
                            className="px-8 py-3 border border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-wide mb-6 border-b border-slate-100 pb-4">Preferences & Settings</h1>
                  
                  <div className="space-y-8 max-w-2xl">
                    {/* Notifications */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Notifications</h3>
                      
                      <div className="flex items-center justify-between p-4 border border-slate-200 bg-slate-50">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Email Newsletter</p>
                          <p className="text-xs text-slate-500 mt-1">Receive updates on new drops and exclusive offers.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-slate-200 bg-slate-50">
                        <div>
                          <p className="text-sm font-bold text-slate-900">SMS Order Alerts</p>
                          <p className="text-xs text-slate-500 mt-1">Get instant updates on your order status via SMS.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
                        </label>
                      </div>
                    </div>

                    {/* Appearance */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Appearance</h3>
                      
                      <div className="flex items-center justify-between p-4 border border-slate-200 bg-slate-50">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Dark Mode (Demo)</p>
                          <p className="text-xs text-slate-500 mt-1">Toggle dark theme for your account dashboard.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                        </label>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-4 pt-8 border-t border-slate-100 mt-8">
                      <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4">Danger Zone</h3>
                      <button className="px-6 py-3 border border-red-200 text-red-600 font-semibold text-xs uppercase tracking-widest hover:bg-red-50 hover:border-red-300 transition-colors">
                        Delete Account
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
