"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;
    const [category, setCategory] = React.useState("All");

    const totalItems = user?.cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
    const address = user?.addresses?.find((address) => address.isDefault);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900/90 to-[#0F172A]/90 backdrop-blur-lg border-b border-cyan-400/20">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="w-28">
                    <Logo />
                </Link>

                {/* Address */}
                <div className="hidden md:flex items-center gap-2 text-sm text-cyan-300/90 flex-shrink-0">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    <span className="truncate max-w-[150px] font-medium">
                        {address ? address.label : "Select delivery address"}
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex-grow max-w-2xl">
                    <div className="flex gap-1.5 w-full">
                        {/* Category Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="rounded-xl bg-slate-800/50 border-cyan-400/20 text-cyan-300 hover:bg-slate-700/50 hover:text-cyan-200 px-4"
                                >
                                    <span>{category}</span>
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800/80 border-cyan-400/20 backdrop-blur-lg">
                                {['Electronics', 'Clothing', 'Books'].map((item) => (
                                    <DropdownMenuItem 
                                        key={item}
                                        className="text-cyan-200 focus:bg-slate-700/50"
                                        onSelect={() => setCategory(item)}
                                    >
                                        {item}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Search Input */}
                        <Input
                            type="search"
                            placeholder={`Search ${category.toLowerCase()}...`}
                            className="bg-slate-800/50 border-cyan-400/20 text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400/40 rounded-xl"
                        />
                        <Button 
                            size="icon" 
                            className="bg-cyan-600/80 hover:bg-cyan-500/90 rounded-xl border border-cyan-400/30"
                        >
                            <Search className="h-4 w-4 text-cyan-100" />
                        </Button>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="text-cyan-300 hover:bg-slate-800/50 hover:text-cyan-200 gap-2"
                            >
                                <div className="text-left">
                                    <p className="text-xs font-light text-cyan-400/80">Welcome</p>
                                    <p className="font-medium truncate max-w-[120px] bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                        {user ? user.name : "Sign in"}
                                    </p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-cyan-400/80" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800/80 border-cyan-400/20 backdrop-blur-lg min-w-[180px]">
                            <DropdownMenuItem 
                                className="text-cyan-200 hover:bg-slate-700/50"
                                onSelect={() => router.push('/profile')}
                            >
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-cyan-200 hover:bg-slate-700/50"
                                onSelect={() => router.push('/settings')}
                            >
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-cyan-200 hover:bg-slate-700/50 sm:hidden"
                                onSelect={() => router.push('/cart')}
                            >
                                Cart
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-red-400 hover:bg-slate-700/50"
                                onSelect={handleSignOut}
                            >
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Orders Link */}
                    <Link 
                        href="/orders" 
                        className="text-sm text-cyan-300/90 hover:text-cyan-200 hidden sm:block"
                    >
                        Orders & Returns
                    </Link>

                    {/* Cart Icon */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                        href="/cart" 
                        className=" ml-3 relative p-2 hover:bg-slate-800/50 rounded-xl transition-colors me-2" // Added margin-right
                        >
                        <ShoppingCart className="h-6 w-6 text-cyan-300" />
                        <span className="absolute top-2 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {totalItems}
                        </span>
                    </Link>

                    </motion.div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
