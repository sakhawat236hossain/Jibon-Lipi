"use client";
import React, { useEffect, useRef, useState } from "react";
import { Trophy, Medal, Download, ChevronLeft, Star, Heart, Target, Award, ShieldCheck, CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";

const AchievementsPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/daily-progress/history");
        const result = await res.json();
        if (result.success) setHistory(result.data);
      } catch (err) {
        console.error("ডাটা লোড হয়নি");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const last7Days = history.slice(-7);
  const avg7Days = last7Days.length > 0 
    ? Math.round(last7Days.reduce((a, b) => a + b.progress, 0) / last7Days.length) 
    : 0;

  const getRewardInfo = () => {
    if (avg7Days >= 90) return {
      title: "এলিট পারফরম্যান্স সার্টিফিকেট",
      summary: "আপনার অবিশ্বাস্য ধারাবাহিকতা এবং কর্মদক্ষতা আপনাকে শীর্ষ ১% ব্যবহারকারীর কাতারে নিয়ে এসেছে। এই অর্জন আপনার অদম্য ইচ্ছাশক্তির বহিঃপ্রকাশ।",
      declaration: "এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, গত ৭ দিনে উক্ত ব্যবহারকারী তার নির্ধারিত লক্ষ্যমাত্রার গড়ে ৯০% এর বেশি অর্জন করতে সক্ষম হয়েছেন। তার এই ধারাবাহিকতা ভবিষ্যৎ সাফল্যের এক অনন্য মাইলফলক হিসেবে গণ্য হবে।",
      icon: <Trophy size={100} className="text-yellow-500" />,
      theme: "#f59e0b",
      color: "linear-gradient(135deg, #fbbf24, #d97706)",
      badge: "গোল্ড মেডেলিস্ট (Elite)",
      rank: "Distinction"
    };
    if (avg7Days >= 60) return {
      title: "অ্যাডভান্সড প্রগ্রেস রিপোর্ট",
      summary: "আপনি অত্যন্ত সফলভাবে আপনার লক্ষ্যমাত্রা পূরণ করছেন। আপনার এই সুশৃঙ্খল জীবনধারা এবং কাজের প্রতি মনোযোগ সত্যিই প্রশংসনীয়।",
      declaration: "বিগত এক সপ্তাহের ডাটা বিশ্লেষণ করে দেখা গেছে যে, ব্যবহারকারী অত্যন্ত সন্তোষজনকভাবে ৬০% এর বেশি প্রগ্রেস নিশ্চিত করেছেন। নিয়মিত এই অনুশীলন তাকে একজন প্রো-লেভেল পারফর্মার হিসেবে গড়ে তুলছে।",
      icon: <Medal size={100} className="text-slate-400" />,
      theme: "#64748b",
      color: "linear-gradient(135deg, #94a3b8, #475569)",
      badge: "সিলভার মেডেলিস্ট (Pro)",
      rank: "First Class"
    };
    return {
      title: "রাইজিং স্টার এচিভমেন্ট",
      summary: "আপনি একটি সুন্দর শুরুর পথে আছেন। প্রতিটি ছোট জয়ই বড় সাফল্যের ভিত্তি। আপনার এই প্রচেষ্টাকে আমরা সম্মান জানাই।",
      declaration: "প্রাথমিক ডাটা অনুযায়ী, ব্যবহারকারী তার প্রগ্রেস ট্র্যাকিং শুরু করেছেন এবং ধারাবাহিকভাবে এগিয়ে যাওয়ার সংকল্প প্রদর্শন করেছেন। নিয়মিত অভ্যাসের মাধ্যমে এই হার দ্রুত বৃদ্ধি পাওয়া সম্ভব।",
      icon: <Target size={100} className="text-indigo-500" />,
      theme: "#6366f1",
      color: "linear-gradient(135deg, #818cf8, #4f46e5)",
      badge: "রাইজিং মেম্বার",
      rank: "Passing"
    };
  };

  const reward = getRewardInfo();

  useEffect(() => {
    if (!loading) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: [reward.theme, '#10b981', '#ffffff']
      });
    }
  }, [loading, reward.theme]);

  const downloadPDF = async () => {
    const element = certificateRef.current;
    if (!element) return;
    try {
      const dataUrl = await domtoimage.toPng(element, {
        quality: 1,
        bgcolor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Official-Report-${avg7Days}.pdf`);
    } catch (error) {
      console.error("PDF failed", error);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <Link href="/analytics" className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
            <ChevronLeft size={24} className="text-slate-600 dark:text-slate-200" />
          </Link>
          <button 
            onClick={downloadPDF} 
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Download size={20} /> অফিসিয়াল পিডিএফ সেভ করুন
          </button>
        </div>

        {/* মেইন সার্টিফিকেট ডিজাইন */}
        <div 
          ref={certificateRef} 
          className="bg-white dark:bg-[#0b0f1a] rounded-none md:rounded-[1rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border-[16px] border-double border-slate-200 dark:border-slate-800"
          style={{ minHeight: '297mm' }} // A4 Ratio
        >
          {/* ডিজাইন এলিমেন্টস */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-indigo-600 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-indigo-600 opacity-20"></div>

          <div className="relative z-10">
            {/* হেডার */}
            <div className="flex flex-col items-center mb-10">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4">
                <ShieldCheck size={48} className="text-indigo-600" />
              </div>
              <h2 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.6em] mb-2">Verified Performance Certificate</h2>
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 h-[2px] bg-slate-100 dark:bg-slate-800"></div>
                <div className="text-slate-300"><Star size={16} fill="currentColor" /></div>
                <div className="flex-1 h-[2px] bg-slate-100 dark:bg-slate-800"></div>
              </div>
            </div>

            {/* মেইন টাইটেল */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                {reward.title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
                "{reward.summary}"
              </p>
            </div>

            {/* মেডেল ও ব্যাজ */}
            <div className="flex justify-center items-center gap-8 mb-12">
               <div className="animate-bounce-slow">{reward.icon}</div>
               <div className="text-left border-l-4 border-indigo-600 pl-6">
                 <p className="text-sm font-black text-slate-400 uppercase">অর্জিত স্ট্যাটাস</p>
                 <p className="text-2xl font-black text-slate-800 dark:text-white">{reward.badge}</p>
                 <div className="flex items-center gap-2 mt-1 text-emerald-500 font-bold">
                   <CheckCircle2 size={16} /> Verified Achievement
                 </div>
               </div>
            </div>

            {/* ডিক্লারেশন টেক্সট - যা প্রফেশনাল দেখাবে */}
            <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-2xl text-left mb-12 border-l-8 border-indigo-500">
               <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-4 flex items-center gap-2">
                 <TrendingUp size={18} /> বিস্তারিত বিশ্লেষণ ও ঘোষণা:
               </h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-md">
                 {reward.declaration}
               </p>
            </div>

            {/* ডাটা সামারি টেবিল স্টাইল */}
            <div className="grid grid-cols-3 gap-4 mb-16">
               <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">গড় প্রগ্রেস</p>
                 <p className="text-3xl font-black text-indigo-600">{avg7Days}%</p>
               </div>
               <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">মোট দিন</p>
                 <p className="text-3xl font-black text-slate-700 dark:text-slate-200">০৭</p>
               </div>
               <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-2">রেটিং</p>
                 <p className="text-xl font-black text-orange-500 uppercase">{reward.rank}</p>
               </div>
            </div>

            {/* ফুটোার ও সিগনেচার */}
            <div className="mt-auto pt-10 border-t-2 border-slate-100 dark:border-slate-800 flex justify-between items-center text-left">
              <div>
                <div className="flex items-center gap-2 mb-2 font-black text-slate-800 dark:text-slate-200">
                  <Calendar size={18} className="text-indigo-600" />
                  Issue Date: {new Date().toLocaleDateString('en-GB')}
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Authentication ID: PR-2024-AI-{avg7Days}</p>
              </div>
              
              <div className="text-right">
                <div className="mb-2 italic font-serif text-2xl text-slate-800 dark:text-slate-200">AI Progress Tracker</div>
                <div className="w-48 h-[1px] bg-slate-300 dark:bg-slate-700 ml-auto mb-2"></div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Authorized Digital Signature</p>
              </div>
            </div>
          </div>

          {/* ওয়াটারমার্ক প্যাটার্ন */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-sm italic">
          "এই সার্টিফিকেটটি আপনার কঠোর পরিশ্রম এবং সংকল্পের একটি ডিজিটাল প্রমাণ।"
        </p>
      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AchievementsPage;