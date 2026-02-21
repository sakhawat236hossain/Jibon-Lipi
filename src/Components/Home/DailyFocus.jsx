"use client";
import React, { useState, useEffect } from 'react';
// সঠিক লাইব্রেরি ইমপোর্ট: lucide-react
import { CheckCircle2, Circle, Trophy, Calendar, Sparkles, Target, Zap, Heart } from 'lucide-react'; 
import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti'; 

const DailyFocus = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: '৫ ওয়াক্ত নামাজ (জামাতের সাথে)', category: 'ধর্মীয়', done: false, icon: <Heart size={20}/> },
        { id: 2, title: 'ফজরের পর ২০ মিনিট হাঁটা', category: 'স্বাস্থ্য', done: false, icon: <Zap size={20}/> },
        { id: 3, title: '৩ ঘণ্টা ডিপ ওয়ার্ক (কোডিং)', category: 'কাজ', done: false, icon: <Target size={20}/> },
        { id: 4, title: 'কুরআন তিলাওয়াত ও সকালের দোয়া', category: 'ধর্মীয়', done: false, icon: <Sparkles size={20}/> },
        { id: 5, title: 'নতুন ১টি টেক স্কিল শেখা', category: 'লার্নিং', done: false, icon: <Target size={20}/> },
        { id: 6, title: 'রাত ১০:৩০ এর মধ্যে ঘুমানো', category: 'স্বাস্থ্য', done: false, icon: <Zap size={20}/> },
    ]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const completedCount = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const progressPercentage = Math.round((completedCount / totalTasks) * 100);

    // ১০০% সাফল্য হলে কনফেটি এবং বিশেষ বাংলা নোটিফিকেশন
    useEffect(() => {
        if (progressPercentage === 100 && mounted) {
            // কনফেটি এনিমেশন
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            // ১০০% সাফল্যের গ্র্যান্ড নোটিফিকেশন
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-bounce' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 shadow-2xl rounded-[2rem] p-6 flex items-center gap-4 border-2 border-white/20`}>
                    <Trophy className="h-14 w-14 text-white drop-shadow-lg" />
                    <div>
                        <p className="text-2xl font-black text-white">অসাধারণ! ১০০% সম্পন্ন!</p>
                        <p className="text-orange-50 text-sm font-medium">মাশাআল্লাহ, আপনি আজকের সব লক্ষ্য পূরণ করেছেন!</p>
                    </div>
                </div>
            ), { duration: 10000 });
        }
    }, [progressPercentage, mounted]);

    const toggleTask = (id, title, isDone) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, done: !task.done } : task
        ));

        if (!isDone) {
            toast.success(`${title} - সফল হয়েছে!`, {
                icon: '✅',
                style: { borderRadius: '15px', background: '#1e293b', color: '#fff' },
            });
        } else {
            toast('আবার চেষ্টা করুন!', {
                icon: '🔄',
                style: { borderRadius: '15px', background: '#f59e0b', color: '#fff' },
            });
        }
    };

    if (!mounted) return null;

    return (
        <section className="py-16 bg-[#f8fafc] dark:bg-[#02040a] transition-colors duration-700 min-h-screen">
            <Toaster position="top-center" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* শিরোনাম এলাকা */}
                <div className="mb-12 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            দৈনিক <span className="text-indigo-600">লক্ষ্য</span>
                        </h2>
                        <p className="mt-2 text-slate-500 font-medium tracking-wide text-lg">আজকের কাজের অগ্রগতি রিপোর্ট</p>
                    </div>
                    {progressPercentage === 100 && (
                        <div className="px-8 py-3 bg-emerald-500 text-white rounded-full font-black animate-pulse shadow-lg shadow-emerald-500/40 tracking-widest">
                            সব শেষ 🏆
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* টাস্ক লিস্ট */}
                    <div className="flex-[2] space-y-4">
                        {tasks.map((task) => (
                            <div 
                                key={task.id} 
                                onClick={() => toggleTask(task.id, task.title, task.done)}
                                className={`group relative flex items-center justify-between p-6 rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden
                                    ${task.done 
                                        ? 'bg-emerald-50/30 dark:bg-emerald-500/5 border-emerald-500/20 shadow-inner shadow-emerald-500/5' 
                                        : 'bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10'
                                    }`}
                            >
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`transition-all duration-500 ${task.done ? 'text-emerald-500 scale-110' : 'text-slate-300 group-hover:text-indigo-500'}`}>
                                        {task.done ? (
                                            <div className="relative">
                                                <CheckCircle2 size={36} fill="currentColor" className="text-white dark:text-emerald-900" />
                                                <span className="absolute -top-1 -right-1 animate-ping text-rose-500"><Heart size={14} fill="currentColor" /></span>
                                            </div>
                                        ) : <Circle size={36} strokeWidth={1.5} />}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-xl ${task.done ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                                            {task.title}
                                        </h3>
                                        <span className={`text-[11px] font-black uppercase tracking-widest mt-1 block px-2 py-0.5 rounded-lg w-fit ${task.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 dark:bg-white/5'}`}>
                                            {task.category}
                                        </span>
                                    </div>
                                </div>
                                <div className={`font-black text-4xl opacity-5 ${task.done ? 'text-emerald-500' : 'text-slate-900'}`}>০{task.id}</div>
                            </div>
                        ))}
                    </div>

                    {/* ড্যাশবোর্ড সাইডবার */}
                    <div className="flex-1">
                        <div className={`sticky top-24 rounded-[3.5rem] p-10 text-white transition-all duration-1000 overflow-hidden shadow-2xl
                            ${progressPercentage === 100 
                                ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 scale-105' 
                                : 'bg-slate-900'}`}>
                            
                            <div className="relative z-10 text-center">
                                <Trophy size={64} className={`mx-auto mb-6 ${progressPercentage === 100 ? 'animate-bounce text-yellow-300' : 'text-slate-700'}`} />
                                <h3 className="text-7xl font-black tracking-tighter">{progressPercentage}%</h3>
                                <p className="text-sm opacity-80 font-bold uppercase tracking-widest mt-2">দক্ষতা স্কোর</p>
                                
                                <div className="mt-10 h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>

                                <div className="mt-12 flex items-center justify-center gap-3 p-5 bg-white/5 rounded-[2rem] border border-white/10">
                                    <Heart className={progressPercentage === 100 ? "text-rose-400 fill-rose-400 animate-pulse" : "text-white/20"} />
                                    <p className="text-sm font-semibold italic">
                                        {progressPercentage === 100 ? "আজ আপনি সেরা!" : "নিজেকে ছাড়িয়ে যাওয়ার লড়াই!"}
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