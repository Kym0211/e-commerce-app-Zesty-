"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <nav className="bg-white shadow-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-[#1E3A8A] flex-shrink-0 mr-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Zesty
                </Link>

                {/* Address */}
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 flex-shrink-0 mr-2">
                    <MapPin className="h-4 w-4 text-[#1E3A8A]" />
                    <span className="truncate max-w-[150px]">
                        {address ? address.label : "Select address"}
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-2 flex-grow justify-end">
                    <div className="flex-grow max-w-xl">
                        <div className="flex">
                            {/* Category Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-r-none px-2 sm:px-4 bg-[#F3F4F6] text-[#1E3A8A] border-[#1E3A8A]">
                                        <span className="hidden sm:inline">{category}</span>
                                        <ChevronDown className="h-4 w-4 sm:ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onSelect={() => setCategory("Electronics")}>
                                        Electronics
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setCategory("Clothing")}>
                                        Clothing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setCategory("Books")}>
                                        Books
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Search Input */}
                            <Input
                                type="search"
                                placeholder={`Search ${category}...`}
                                className="w-full rounded-l-none rounded-r-none border-x-0 focus:ring-[#1E3A8A]"
                            />
                            <Button type="submit" className="rounded-l-none px-2 sm:px-4 bg-[#1E3A8A] text-white hover:bg-[#2A4A9A]">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-sm px-2 sm:px-4 text-[#1E3A8A]">
                                <div className="flex flex-col items-start">
                                    <span className="text-xs">Hello</span>
                                    <span className="font-semibold truncate max-w-[100px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                        {user ? user.name : "Sign in"}
                                    </span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => router.push('/profile')}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => router.push('/settings')}>Settings</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => router.push('/cart')} className="sm:hidden">Cart</DropdownMenuItem>
                            <DropdownMenuItem onSelect={handleSignOut}>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Orders Link */}
                    <Link href="/orders" className="text-sm hover:text-[#FF6B6B] hidden sm:inline-block">
                        Returns & Orders
                    </Link>

                    {/* Cart Icon */}
                    <Link href="/cart" className="relative p-2 hidden sm:inline-flex">
                        <ShoppingCart className="h-6 w-6 text-[#1E3A8A]" />
                        <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {totalItems}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
