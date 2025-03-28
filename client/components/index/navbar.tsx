import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_NAME } from '@/constants/constant';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import logoSvg from '@/public/logo.svg';





const Navbar: React.FC = () => {
    const router = useRouter();

    const NavbarItems = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Templates",
            href: "/templates",
        },
        {
            name: "Features",
            href: "#",
        },
        {
            name: "How It Works",
            href: "#pricing",
        },
        {
            name: "Pricing",
            href: "#",
        },
        {
            name: "Contact",
            href: "#",
        }
    ];

    return (
        <nav className="fixed top-0 w-full bg-white py-4 z-30" >
            <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={"/"} className="flex items-center gap-2 ms-5 mt-1">
                            <Image src={logoSvg} alt="Logo" width={150}  />
                        </Link>
                        
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {NavbarItems.map((item, index) => (
                            <Link key={index} href={item.href} className="text-sm font-medium text-gray-600 hover:text-custom-darker transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={"/auth/login"}>
                            <Button variant="ghost" className="font-medium text-custom-darker hover:text-custom-moreDarker">Log in</Button>
                        </Link>
                        <Link href={"/auth/signup"} passHref>
                            <Button className="border rounded-3xl border-custom-darker text-custom-darker hover:bg-custom-darker hover:text-white">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;