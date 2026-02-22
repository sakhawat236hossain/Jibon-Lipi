"use client";
import React, { useState, useEffect } from "react";
import { Trophy, Target, Zap, Clock, ChevronLeft, TrendingUp, Calendar as CalendarIcon, Activity } from "lucide-react";
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
        console.error("ডাটা আনতে সমস্যা হয়েছে");
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

  const getDayProgress = (targetDate) => {
    const found = history.find(h => {
        const hDate = new Date(h.fullDate || h.date).toISOString().split('T')[0];
        return hDate === targetDate;
    });
    return found ? found.progress : 0;
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#02040a]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-600 dark:text-slate-400 text-lg">বিশ্লেষণ লোড হচ্ছে...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#02040a] p-4 md:p-8 transition-all">
      <div className="max-w-7xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link href="/" className="p-4 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
              <ChevronLeft size={28} />
            </Link>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                পারফরম্যান্স <span className="text-indigo-600">রিপোর্ট</span>
              </h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 italic">বিস্তারিত বিশ্লেষণ ও ট্র্যাকিং</p>
            </div>
          </div>
          <div className="bg-indigo-600 text-white px-8 py-4 rounded-3xl shadow-xl shadow-indigo-500/20 font-black text-xl flex items-center gap-3">
            <Zap size={24} fill="currentColor" /> XP: {totalDays * 10}
          </div>
        </div>

        {/* মেইন ড্যাশবোর্ড */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ৪টি কার্ডের জন্য স্ট্যাট সেকশন */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            <StatCard icon={<Trophy className="text-orange-500" />} label="সফল দিন (১০০%)" value={`${perfectDays} দিন`} color="orange" />
            <StatCard icon={<Target className="text-indigo-500" />} label="গড় সফলতা" value={`${avgProgress}%`} color="indigo" />
            <StatCard icon={<Activity className="text-emerald-500" />} label="মোট ট্র্যাকিং" value={`${totalDays} দিন`} color="emerald" />
          </div>

          {/* গ্রাফ চার্ট */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0b0f1a] rounded-[3rem] p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 mb-10">
              <TrendingUp className="text-indigo-600" /> অগ্রগতির গ্রাফ
            </h3>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history.slice(-14)}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '20px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={5} fill="url(#colorProgress)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* লম্বা ধারাবাহিকতা ক্যালেন্ডার */}
          <div className="lg:col-span-12 bg-white dark:bg-[#0b0f1a] rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-sm mt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <CalendarIcon size={28} className="text-emerald-500" /> ধারাবাহিকতা ক্যালেন্ডার (৯১ দিন)
              </h3>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                <span>কম</span>
                <div className="flex gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-slate-100 dark:bg-white/5"></div>
                  <div className="w-4 h-4 rounded-md bg-emerald-200"></div>
                  <div className="w-4 h-4 rounded-md bg-emerald-400"></div>
                  <div className="w-4 h-4 rounded-md bg-emerald-600"></div>
                </div>
                <span>বেশি</span>
              </div>
            </div>

            <div className="flex flex-col items-center overflow-x-auto pb-6 custom-scrollbar">
              <div className="grid grid-flow-col grid-rows-7 gap-3 min-w-max">
                {[...Array(91)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (90 - i));
                  const dateStr = d.toISOString().split('T')[0];
                  const progress = getDayProgress(dateStr);

                  let bgColor = "bg-slate-100 dark:bg-white/5"; 
                  if (progress > 0 && progress <= 30) bgColor = "bg-emerald-100 dark:bg-emerald-900/20";
                  if (progress > 30 && progress <= 65) bgColor = "bg-emerald-300 dark:bg-emerald-700/40";
                  if (progress > 65 && progress < 100) bgColor = "bg-emerald-500 dark:bg-emerald-600/70";
                  if (progress === 100) bgColor = "bg-emerald-600 dark:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]";

                  return (
                    <div key={i} className={`relative group w-6 h-6 md:w-8 md:h-8 rounded-[8px] md:rounded-[12px] transition-all hover:scale-125 cursor-pointer ${bgColor}`}>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-30">
                        <div className="bg-slate-900 dark:bg-indigo-950 text-white text-[10px] font-bold py-2 px-3 rounded-xl whitespace-nowrap shadow-2xl border border-white/10">
                          {dateStr} : <span className="text-emerald-400">{progress}%</span>
                        </div>
                        <div className="w-2 h-2 bg-slate-900 dark:bg-indigo-950 rotate-45 mx-auto -mt-1 border-r border-b border-white/10"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* সাম্প্রতিক রেকর্ড তালিকা */}
          <div className="lg:col-span-12 bg-white dark:bg-[#0b0f1a] rounded-[3.5rem] p-10 border border-slate-200 dark:border-white/5 shadow-sm">
             <h3 className="text-2xl font-black mb-10 text-slate-900 dark:text-white flex items-center gap-3">
               <Clock size={28} className="text-indigo-600" /> সাম্প্রতিক রেকর্ড সমূহ
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.slice().reverse().slice(0, 9).map((item, i) => (
                  <div key={i} className="group p-6 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.progress === 100 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                        {item.progress === 100 ? 'সম্পন্ন' : 'চলমান'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl text-slate-800 dark:text-slate-200">{item.progress}%</p>
                      <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-[#0b0f1a] p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm transition-all hover:scale-[1.03]">
    <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 dark:border-white/5">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h4>
  </div>
);

export default AnalyticsPage;