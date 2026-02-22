"use client";
import React, { useState, useEffect } from "react";
import { Trophy, Target, Zap, Clock, ChevronLeft, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AnalyticsPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/daily-progress/history");
        const result = await res.json();
        if (result.success) setHistory(result.data);
      } catch (err) {
        console.error("ডাটা আনতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const totalDays = history.length;
  const perfectDays = history.filter(d => d.progress === 100).length;
  const avgProgress = totalDays > 0 
    ? Math.round(history.reduce((a, b) => a + b.progress, 0) / totalDays) 
    : 0;

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#02040a]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-600 dark:text-slate-400 animate-pulse text-lg">বিশ্লেষণ লোড হচ্ছে...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#02040a] p-4 md:p-8 lg:p-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* উপরের নেভিগেশন */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="group p-3 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="text-right">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
              আপনার <span className="text-indigo-600">অগ্রগতি</span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">পারফরম্যান্স ইনসাইটস</p>
          </div>
        </div>

        {/* স্ট্যাটস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-[#0b0f1a] p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Trophy className="text-orange-600" size={28} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 dark:text-white">{perfectDays} দিন</h4>
            <p className="text-sm font-bold text-slate-500 mt-1">১০০% টাস্ক সম্পন্ন হয়েছে</p>
          </div>

          <div className="bg-white dark:bg-[#0b0f1a] p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Target className="text-indigo-600" size={28} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 dark:text-white">{avgProgress}%</h4>
            <p className="text-sm font-bold text-slate-500 mt-1">গড় সফলতার হার</p>
          </div>

          <div className="bg-white dark:bg-[#0b0f1a] p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="text-yellow-600" size={28} />
            </div>
            <h4 className="text-4xl font-black text-slate-900 dark:text-white">{totalDays * 10}</h4>
            <p className="text-sm font-bold text-slate-500 mt-1">মোট অর্জিত পয়েন্ট (XP)</p>
          </div>
        </div>

        {/* মেইন চার্ট সেকশন */}
        <div className="bg-white dark:bg-[#0b0f1a] rounded-[3rem] p-6 md:p-10 border border-slate-200 dark:border-white/5 mb-10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <TrendingUp className="text-indigo-600" /> দীর্ঘমেয়াদী রিপোর্ট
            </h3>
            <div className="hidden md:block bg-slate-100 dark:bg-white/5 px-4 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
              সর্বশেষ {totalDays} দিন
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={14} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false} 
                  dy={15}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderRadius: '20px', 
                    border: 'none', 
                    color: '#fff', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                  }}
                  itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fill="url(#chartGradient)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* হিস্টোরি টেবিল */}
        <div className="bg-white dark:bg-[#0b0f1a] rounded-[3rem] p-6 md:p-10 border border-slate-200 dark:border-white/5 shadow-sm">
           <h3 className="text-xl font-black mb-8 text-slate-900 dark:text-white flex items-center gap-3">
             <Clock size={24} className="text-indigo-600" /> গত কয়েক দিনের রেকর্ড
           </h3>
           <div className="grid gap-4">
              {history.length > 0 ? history.slice().reverse().map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all group">
                  <div className="mb-3 md:mb-0">
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest block mb-1">তারিখ</span>
                    <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{item.fullDate || item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 md:w-48 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden min-w-[120px]">
                      <div 
                        className={`h-full transition-all duration-1000 ${item.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${item.progress}%` }} 
                      />
                    </div>
                    <span className={`font-black text-xl min-w-[55px] text-right ${item.progress === 100 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                      {item.progress}%
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-slate-500 font-bold">কোনো ডাটা পাওয়া যায়নি।</div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;