import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Welcome to Jibon Lipi</h1>
    <h4 className="text-lg text-zinc-700 dark:text-zinc-300 mt-4">Your digital library for Bengali literature</h4>
    </div>
  );
}
