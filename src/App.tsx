/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Star, CheckCircle2, ChevronRight, X, ArrowLeft, Moon, Sun, Download, ShieldCheck } from 'lucide-react';

interface AppProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  icon: string;
  screenshots: string[];
  features: string[];
  isVerified: boolean;
}

const MOCK_APPS: AppProduct[] = [
  {
    id: '1',
    name: 'FlowState',
    category: 'Productivity',
    tagline: 'Deep work, simplified.',
    description: 'A minimalist task manager that uses neural-driven timers to keep you in the zone. Eliminate distractions and conquer your goals with ease.',
    price: 49.99,
    rating: 4.9,
    reviews: 1240,
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=flow',
    screenshots: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
    ],
    features: ['Infinite focus timers', 'Seamless synchronization', 'Biometric security', 'Advanced analytics'],
    isVerified: true,
  },
  {
    id: '2',
    name: 'Lumina Edit',
    category: 'Design',
    tagline: 'The future of photo editing.',
    description: 'AI-powered image enhancement that respects your artistic vision. Professional tools that feel like magic.',
    price: 89.00,
    rating: 4.8,
    reviews: 850,
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=lumina',
    screenshots: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    ],
    features: ['Generative fill', 'Raw engine 2.0', 'Collaborative layers', 'Cloud export'],
    isVerified: true,
  },
  {
    id: '3',
    name: 'VaultKey',
    category: 'Security',
    tagline: 'Your digital data, fortress-sealed.',
    description: 'Next-generation password management with zero-knowledge encryption and hardware-level isolation.',
    price: 29.99,
    rating: 5.0,
    reviews: 2100,
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=vault',
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    ],
    features: ['Zero-knowledge sync', 'Password auditing', 'Family sharing', 'Physical key support'],
    isVerified: true,
  },
  {
    id: '4',
    name: 'Zenith CRM',
    category: 'Business',
    tagline: 'Relationships that scale.',
    description: 'The CRM built for developers and fast-moving teams. Data transparency like never before.',
    price: 199.00,
    rating: 4.7,
    reviews: 560,
    icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=zenith',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    ],
    features: ['Automated pipeline', 'API-first architecture', 'Real-time forecasting', 'Custom webhooks'],
    isVerified: false,
  }
];

export default function App() {
  const [selectedApp, setSelectedApp] = useState<AppProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const categories = ['All', 'Productivity', 'Design', 'Security', 'Business', 'Entertainment'];

  const filteredApps = MOCK_APPS.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-brand-secondary text-brand-primary'}`}>
      
      {/* Navbar */}
      <nav className="glass-header px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setSelectedApp(null)}
          id="logo"
        >
          <div className="w-8 h-8 bg-brand-primary dark:bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-brand-secondary dark:border-zinc-900 rounded-full" />
          </div>
          <span className="font-bold text-xl tracking-tight">Appify</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium opacity-70 hover:opacity-100 transition-opacity">
          <a href="#" className="hover:text-brand-accent transition-colors">Browse</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Categories</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Sell</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Help</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            id="dark-mode-toggle"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors relative"
            onClick={() => setIsCartOpen(true)}
            id="cart-button"
          >
            <ShoppingCart size={20} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-brand-accent text-white text-[10px] flex items-center justify-center rounded-full">2</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-brand-primary/10 dark:border-white/10">
            <div className="w-8 h-8 rounded-full bg-brand-primary/5 dark:bg-white/5 border border-brand-primary/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedApp ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero */}
              <section className="text-center py-16 space-y-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]"
                >
                  Upgrade your digital life. <br />
                  <span className="text-brand-primary/40 dark:text-zinc-500 italic">Premium apps, curated for you.</span>
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl mx-auto relative group"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/30 dark:text-zinc-500 group-focus-within:text-brand-accent transition-colors" size={24} />
                  <input 
                    type="text" 
                    placeholder="Search for productivity, design, security..."
                    className="w-full bg-white dark:bg-zinc-900 border border-brand-primary/10 dark:border-zinc-800 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all shadow-xl shadow-brand-primary/5 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="search-input"
                  />
                </motion.div>
              </section>

              {/* Collections */}
              <section className="space-y-8">
                <div className="flex items-center justify-between overflow-x-auto pb-4 gap-4 no-scrollbar">
                  <div className="flex gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                          activeCategory === cat 
                            ? 'bg-brand-primary text-white dark:bg-white dark:text-zinc-900' 
                            : 'bg-white dark:bg-zinc-900 border border-brand-primary/10 dark:border-zinc-800 hover:border-brand-primary/30'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredApps.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="premium-card group cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
                      onClick={() => setSelectedApp(app)}
                      id={`app-card-${app.id}`}
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <img src={app.icon} alt={app.name} className="w-14 h-14 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500" />
                          <div className="text-right">
                            <span className="text-sm font-bold text-brand-accent">${app.price}</span>
                            <div className="flex items-center gap-1 text-[10px] opacity-50 mt-1">
                              <Star size={10} className="fill-brand-accent text-brand-accent" />
                              <span>{app.rating} ({app.reviews})</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg leading-tight">{app.name}</h3>
                            {app.isVerified && <ShieldCheck size={16} className="text-brand-accent" />}
                          </div>
                          <p className="text-sm opacity-60 line-clamp-2 mt-1">{app.tagline}</p>
                        </div>
                      </div>
                      <div className="px-6 py-4 border-t border-brand-primary/5 dark:border-zinc-800 flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
                        <span className="text-[11px] font-bold uppercase tracking-widest opacity-40">{app.category}</span>
                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredApps.length === 0 && (
                  <div className="text-center py-24 opacity-40 italic">
                    No results found for your search.
                  </div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Back Button */}
              <div className="lg:col-span-12">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="flex items-center gap-2 font-medium opacity-60 hover:opacity-100 transition-opacity"
                  id="back-button"
                >
                  <ArrowLeft size={18} />
                  <span>Back to Browse</span>
                </button>
              </div>

              {/* Left Column - Gallery & Info */}
              <div className="lg:col-span-8 space-y-12">
                <div className="flex items-center gap-6">
                  <img src={selectedApp.icon} alt={selectedApp.name} className="w-24 h-24 rounded-3xl shadow-2xl" />
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">{selectedApp.name}</h1>
                    <p className="text-xl opacity-60 font-medium">{selectedApp.tagline}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 px-3 py-1 bg-brand-accent/10 rounded-full text-brand-accent text-sm font-bold">
                        <Star size={14} className="fill-brand-accent" />
                        <span>{selectedApp.rating}</span>
                      </div>
                      <span className="text-sm font-medium opacity-40">{selectedApp.reviews} reviews</span>
                      {selectedApp.isVerified && (
                        <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-sm font-bold">
                          <CheckCircle2 size={14} />
                          <span>Verified Security</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-2xl border border-brand-primary/5 dark:border-zinc-800">
                  <img src={selectedApp.screenshots[0]} alt="Screenshot" className="w-full aspect-video object-cover" />
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Overview</h2>
                  <p className="text-lg leading-relaxed opacity-80">{selectedApp.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                  {selectedApp.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-brand-primary/5 dark:border-zinc-800 rounded-2xl">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="font-medium opacity-80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Purchase Panel */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <div className="bg-white dark:bg-zinc-900 border border-brand-primary/10 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-widest opacity-40">Price</span>
                    <span className="text-3xl font-extrabold text-brand-accent">${selectedApp.price}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="btn-primary w-full py-4 text-lg" id="buy-button">Get Access Now</button>
                    <button className="btn-secondary w-full py-4 flex items-center justify-center gap-2" id="add-to-cart">
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                  </div>

                  <div className="p-4 bg-brand-primary/5 dark:bg-white/5 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold opacity-60">
                      <Download size={16} />
                      <span>Instant Delivery</span>
                    </div>
                    <p className="text-xs opacity-50 leading-relaxed">System automatically sends license key to your dashboard after successful payment.</p>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60">Category</span>
                      <span className="font-bold">{selectedApp.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60">Version</span>
                      <span className="font-bold">v3.4.2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60">Last Updated</span>
                      <span className="font-bold">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 z-[101] shadow-2xl p-8 flex flex-col"
              id="cart-drawer"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight">Your Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
                {[MOCK_APPS[0], MOCK_APPS[1]].map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-brand-primary/5 dark:border-zinc-800 rounded-2xl relative group">
                    <img src={item.icon} alt={item.name} className="w-16 h-16 rounded-xl shadow-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs opacity-40 uppercase tracking-widest font-bold mt-1">{item.category}</p>
                      <p className="text-brand-accent font-extrabold mt-2">${item.price}</p>
                    </div>
                    <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-brand-primary/10 dark:border-zinc-800 mt-auto space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm opacity-60">
                    <span>Subtotal</span>
                    <span>$138.99</span>
                  </div>
                  <div className="flex justify-between text-sm opacity-60">
                    <span>Processing Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-extrabold pt-2">
                    <span>Total</span>
                    <span>$138.99</span>
                  </div>
                </div>
                <button className="btn-primary w-full py-4 text-lg">Checkout Now</button>
                <p className="text-[10px] text-center opacity-40 uppercase tracking-widest font-bold">Secure point to point encryption</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto px-6 py-24 mt-24 border-t border-brand-primary/5 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary dark:bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-brand-secondary dark:border-zinc-900 rounded-full" />
            </div>
            <span className="font-bold text-xl tracking-tight">Appify</span>
          </div>
          <p className="text-lg opacity-60 max-w-sm">The digital boutique for high-performance software. Hand-picked, security-verified, and built to last.</p>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold uppercase tracking-widest text-[10px] opacity-40">Marketplace</h5>
          <div className="flex flex-col gap-2 font-medium opacity-70">
            <a href="#" className="hover:text-brand-accent transition-colors">Featured</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Categories</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Gift Cards</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Requests</a>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold uppercase tracking-widest text-[10px] opacity-40">Support</h5>
          <div className="flex flex-col gap-2 font-medium opacity-70">
            <a href="#" className="hover:text-brand-accent transition-colors">Help Center</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Security</a>
            <a href="#" className="hover:text-brand-accent transition-colors">API Status</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms</a>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-xs font-bold uppercase tracking-[0.2em]">
          <p>© 2026 APPIFY CO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">TWITTER</a>
            <a href="#">GITHUB</a>
            <a href="#">DRIBBLER</a>
          </div>
        </div>
      </footer>
    </div>
  );
}