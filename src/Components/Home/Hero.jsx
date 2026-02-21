"use client";
import React from 'react';
import { Sparkles, PenLine, Lock, Moon, Home, Target, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#030508] pt-24 pb-16 transition-colors duration-700">
            
            {/* dynamic background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* বাম পাশ: কন্টেন্ট */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-xl animate-fade-in">
                            <div className="flex -space-x-1.5">
                                <div className="w-5 h-5 rounded-full bg-indigo-500 border-2 border-white dark:border-[#0a0c10]"></div>
                                <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white dark:border-[#0a0c10]"></div>
                            </div>
                            <span className="text-slate-500 dark:text-indigo-300 text-[10px] font-black uppercase tracking-[0.15em] ml-1">
                                আপনার ব্যক্তিগত ডিজিটাল আর্কাইভ
                            </span>
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                আপনার গল্প, <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500">
                                    আপনার ইতিহাস
                                </span>
                            </h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                                পারিবারিক মুহূর্ত, পড়াশোনা বা আধ্যাত্মিক যাত্রা—সবই থাকুক একটি নিরাপদ এবং সুন্দর ডিজিটাল ডায়েরিতে। 
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="group relative flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-500/20 active:scale-95 overflow-hidden">
                                <PenLine size={18} className="group-hover:rotate-12 transition-transform" />
                                আজকের ডায়েরি লিখুন
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                            
                            <button className="flex items-center justify-center gap-2 text-slate-700 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95">
                                ইতিহাস দেখুন
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* ডান পাশ: মকআপ কার্ড (সাইজ কিছুটা ছোট করা হয়েছে) */}
                    <div className="relative hidden lg:block scale-95 origin-right">
                        <div className="relative z-10 bg-white dark:bg-slate-900/50 p-1.5 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-white dark:border-white/10 transform rotate-2 hover:rotate-0 transition-all duration-700 backdrop-blur-3xl">
                            <div className="bg-[#fcfcfc] dark:bg-[#0a0c10] rounded-[2.2rem] overflow-hidden border border-slate-100 dark:border-white/5 p-7 space-y-6">
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                            <Sparkles size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="h-2.5 w-20 bg-slate-200 dark:bg-white/10 rounded-full mb-1.5"></div>
                                            <div className="h-2 w-12 bg-slate-100 dark:bg-white/5 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                                        <Lock size={12} className="text-slate-400" />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="h-10 w-full bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5"></div>
                                    <div className="h-10 w-[85%] bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5"></div>
                                </div>

                                <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-500/5 dark:to-transparent border border-indigo-100 dark:border-indigo-500/10 rounded-2xl p-5">
                                    <p className="text-[13px] text-indigo-900/60 dark:text-indigo-200/50 leading-relaxed font-bold italic">
                                        "আজকের দিনটি ছিল স্বপ্নের মতো। আলহামদুলিল্লাহ, পরিবারের সবাই মিলে যে সময়টুকু কাটালাম..."
                                    </p>
                                </div>

                                <div className="flex gap-2.5">
                                    <div className="h-12 w-full bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider">সংরক্ষণ করুন</div>
                                    <div className="h-12 w-14 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                        <Moon size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ফিচার গ্রিড সেকশন (সাইজ কিছুটা ছোট করা হয়েছে) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
                    {[
                        { label: 'ব্যক্তিগত স্মৃতি', icon: <Lock />, desc: 'আপনার গোপনীয়তা আমাদের কাছে সর্বোচ্চ', color: 'indigo' },
                        { label: 'ধর্মীয় উন্নতি', icon: <Moon />, desc: 'ইবাদত ও আধ্যাত্মিক ট্র্যাকার সিস্টেম', color: 'purple' },
                        { label: 'পারিবারিক বন্ধন', icon: <Home />, desc: 'প্রজন্মের জন্য ইতিহাস সংরক্ষণ করুন', color: 'pink' },
                        { label: 'ভবিষ্যৎ লক্ষ্য', icon: <Target />, desc: 'সাফল্যের দিকে আপনার প্রতিদিনের যাত্রা', color: 'emerald' },
                    ].map((item, index) => (
                        <div key={index} className="group p-7 rounded-[2rem] bg-white dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 hover:border-indigo-500/20 transition-all duration-500 shadow-sm hover:shadow-xl backdrop-blur-xl">
                            <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-500 text-${item.color}-600 dark:text-${item.color}-400`}>
                                {React.cloneElement(item.icon, { size: 22 })}
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1.5">{item.label}</h3>
                            <p className="text-slate-500 dark:text-slate-500 text-[13px] leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;