import React from 'react';
import { Sparkles, PenLine, ChevronRight, Lock, Moon, Home, Target } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#05070a] pt-20 pb-16 transition-colors duration-500">
            
            {/* Background Glows - লাইট মোডে হালকা এবং ডার্ক মোডে উজ্জ্বল */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side: Content */}
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                            <Sparkles size={16} className="text-yellow-500" />
                            <span>আপনার ব্যক্তিগত ডিজিটাল আর্কাইভ</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                            আপনার গল্প, <br /> 
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                                আপনার অনন্য ইতিহাস
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                            পারিবারিক সমস্যা থেকে শুরু করে পড়াশোনা বা ধর্মীয় উন্নতি—আপনার জীবনের প্রতিটি ছোট বড় মুহূর্তকে সুন্দরভাবে সাজিয়ে রাখুন চিরকাল।
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 dark:shadow-indigo-600/20 active:scale-95">
                                <PenLine size={20} />
                                আজকের ডায়েরি লিখুন
                            </button>
                            <button className="flex items-center gap-2 text-slate-700 dark:text-white/80 hover:text-indigo-600 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-sm shadow-sm dark:shadow-none">
                                ইতিহাস দেখুন
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Mockup Card */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10 bg-gradient-to-tr from-slate-200 to-white dark:from-slate-900 dark:to-slate-800 p-1 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-white dark:bg-[#0a0c10] rounded-[2.3rem] overflow-hidden border border-slate-100 dark:border-white/5 p-6 space-y-6">
                                {/* Mockup content */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                                        <Sparkles size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="h-4 w-32 bg-slate-100 dark:bg-white/10 rounded-full"></div>
                                </div>
                                <div className="space-y-3 pt-4">
                                    <div className="h-8 w-full bg-slate-50 dark:bg-white/5 rounded-xl"></div>
                                    <div className="h-8 w-[80%] bg-slate-50 dark:bg-white/5 rounded-xl"></div>
                                </div>
                                <div className="h-32 w-full bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 rounded-2xl p-4">
                                    <p className="text-xs text-indigo-600/60 dark:text-indigo-300/50 leading-relaxed italic">
                                        "আজকের দিনটি অসাধারণ ছিল। পরিবার নিয়ে অনেকদিন পর..."
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-10 w-full bg-indigo-600/10 dark:bg-indigo-600/20 rounded-xl border border-indigo-200 dark:border-indigo-600/30"></div>
                                    <div className="h-10 w-12 bg-slate-100 dark:bg-white/5 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-400/10 dark:bg-indigo-600/20 rounded-full blur-[100px] -z-10"></div>
                    </div>
                </div>

                {/* Bottom Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
                    {[
                        { label: 'ব্যক্তিগত স্মৃতি', icon: <Lock className="text-indigo-600 dark:text-indigo-400" />, desc: 'সবসময় সুরক্ষিত' },
                        { label: 'ধর্মীয় ট্র্যাকার', icon: <Moon className="text-purple-600 dark:text-purple-400" />, desc: 'আধ্যাত্মিক উন্নতি' },
                        { label: 'পারিবারিক হিস্টরি', icon: <Home className="text-pink-600 dark:text-pink-400" />, desc: 'শেকড়ের গল্প' },
                        { label: 'লক্ষ্য ও পড়াশোনা', icon: <Target className="text-emerald-600 dark:text-emerald-400" />, desc: 'সাফল্যের পথে' },
                    ].map((item, index) => (
                        <div key={index} className="group p-8 rounded-[2rem] bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/5 hover:border-indigo-200 dark:hover:border-white/10 transition-all duration-300 text-center space-y-4 shadow-sm dark:shadow-none backdrop-blur-sm">
                            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-white/10 transition-all duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">{item.label}</h3>
                                <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;