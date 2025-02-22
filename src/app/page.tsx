"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Logo } from "@/components/logo";

const LandingPage = () => {
  const [ctaText, setCtaText] = React.useState("Sign Up");
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if(session?.user) {
      setCtaText("Shop Now");
    }
  }, [session]);

  const handleSubmit = () => {
    if(session?.user) {
      router.push("/v1");
    } else {
      router.push("/sign-up");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0F172A] to-[#1E293B] text-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center h-screen text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-slate-900/80 to-slate-900 animate-pulse-slow" />
        
        {/* Logo */}
        <div className="w-96">
          <Logo />
        </div>

        {/* Hero Text */}
        <motion.h1 
          className="text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Welcome to Zesty
          <span className="block mt-4 text-xl lg:text-2xl font-medium text-cyan-200">
            Shop freely with Zesty
          </span>
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-8 flex space-x-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button 
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] group"
            onClick={handleSubmit}
          >
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-100">
              {ctaText}
            </span>
            <div className="mt-1 h-[2px] w-0 bg-cyan-300 group-hover:w-full transition-all duration-300" />
          </button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose Zesty?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "lorem ipsum",
                content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
                color: "from-purple-600 to-blue-600"
              },
              {
                title: "lorem ipsum",
                content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
                color: "from-emerald-600 to-cyan-600"
              },
              {
                title: "lorem ipsum",
                content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
                color: "from-rose-600 to-pink-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-lg border border-white/10 hover:border-cyan-400/30 transition-all`}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Product Showcase */}
      <motion.section
        className="py-20 bg-slate-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Some Heading™
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos fuga adipisci nisi ipsa officiis iusto saepe.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['lorem ipsum', 'lorem ipsum', 'lorem ipsum', 'lorem ipsum'].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-cyan-400/30 transition-all">
                    <span className="text-cyan-400">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full" />
              <Image
                src="/product-showcase.png"
                alt="Zesty Products"
                width={600}
                height={400}
                className="relative z-10 rounded-2xl shadow-2xl hover:scale-[1.01] transition-transform"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900/80 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Made by Kavyam.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
