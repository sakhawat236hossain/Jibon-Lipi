"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  Trophy,
  Heart,
  Send,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

const DailyFocus = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "৫ ওয়াক্ত নামাজ (জামাতের সাথে)", category: "ধর্মীয়", done: false },
    { id: 2, title: "ফজরের পর ২০ মিনিট হাঁটা", category: "স্বাস্থ্য", done: false },
    { id: 3, title: "৩ ঘণ্টা ডিপ ওয়ার্ক (কোডিং)", category: "কাজ", done: false },
    { id: 4, title: "কুরআন তিলাওয়াত ও সকালের দোয়া", category: "ধর্মীয়", done: false },
    { id: 5, title: "নতুন ১টি টেক স্কিল শেখা", category: "লার্নিং", done: false },
    { id: 6, title: "রাত ১০:৩০ এর মধ্যে ঘুমানো", category: "স্বাস্থ্য", done: false },
  ]);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTodayId = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    setMounted(true);
    const fetchProgress = async () => {
      try {
        // GET রিকোয়েস্ট পাঠিয়ে আজকের ডাটা আছে কিনা চেক করা
        const response = await fetch(`/api/daily-progress/post?date=${getTodayId()}`);
        const result = await response.json();
        if (result.success && result.data) {
          setTasks(result.data.tasks);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const progressPercentage = Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  // ডাটাবেসে পোস্ট/সেভ করার মেইন লজিক
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/daily-progress/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: getTodayId(),
          tasks: tasks,
          progress: progressPercentage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("মাশাআল্লাহ! ডাটাবেসে সেভ হয়েছে।");
        if (progressPercentage === 100) triggerConfetti();
      } else {
        throw new Error(data.error || "Failed to save");
      }
    } catch (error) {
      toast.error("সেভ করতে সমস্যা হয়েছে। নেটওয়ার্ক চেক করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  if (!mounted) return null;

  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#02040a] min-h-screen transition-colors duration-700">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              দৈনিক <span className="text-indigo-600">লক্ষ্য</span>
            </h2>
          </div>
          <p className="text-slate-400 font-bold bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full italic uppercase">
             {getTodayId()}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <div className="space-y-4">
              {loading ? (
                <div className="p-20 text-center animate-pulse italic text-slate-400">লোড হচ্ছে...</div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`group flex items-center justify-between p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer 
                      ${task.done ? "bg-emerald-500/5 border-emerald-500/20 shadow-inner" : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-indigo-500/30 shadow-sm"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`transition-all ${task.done ? "text-emerald-500 scale-110" : "text-slate-300"}`}>
                        {task.done ? <CheckCircle2 size={32} fill="currentColor" className="text-white dark:text-emerald-900" /> : <Circle size={32} strokeWidth={1.5} />}
                      </div>
                      <h3 className={`font-bold text-lg ${task.done ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}>{task.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!loading && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-6 rounded-[2rem]  flex items-center justify-center gap-3 font-black text-xl transition-all shadow-xl
                  ${isSubmitting ? "bg-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-1 shadow-indigo-500/20"}`}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} />} 
                আজকের প্রগ্রেস সাবমিট করুন
              </button>
            )}
          </div>

          <div className="lg:w-1/3">
             <div className={`sticky top-24 p-8 rounded-[3.5rem] text-white transition-all duration-700 shadow-2xl ${progressPercentage === 100 ? "bg-gradient-to-br from-indigo-600 to-rose-500" : "bg-slate-900"}`}>
              <div className="text-center space-y-6">
                <Trophy size={60} className={`mx-auto ${progressPercentage === 100 ? "text-yellow-300 animate-bounce" : "text-slate-700"}`} />
                <h3 className="text-7xl font-black">{progressPercentage}%</h3>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm font-bold italic opacity-80">
                    {progressPercentage === 100 ? "আজ আপনি সেরা!" : "বাকিগুলো শেষ করে সাবমিট করুন।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyFocus;