import DailyFocus from "@/Components/Home/DailyFocus";
import Hero from "@/Components/Home/Hero";

export default function Home() {
  return (
  
    <main className="min-h-screen bg-zinc-50 dark:bg-[#05070a] font-sans transition-colors duration-500">
      
      {/* Hero Section */}
      <Hero />

      {/* Daily Focus Section */}
      <DailyFocus />
      

      
    </main>
  );
}