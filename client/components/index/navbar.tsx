import React from 'react';
import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_NAME } from '@/lib/constants';

const Navbar: React.FC = () => {

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
        <nav className="fixed top-0 w-full bg-white z-30" >
            <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href={"/"} className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-custom-dark gradient" />
                        <span className="font-bold text-xl"> {COMPANY_NAME} </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">

                        {NavbarItems.map((item, index) => (
                            <Link key={index} href={item.href} className="text-sm font-medium text-gray-600 hover:text-custom-darker transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={"/auth?is_login=true"}>
                        <Button variant="ghost" className="font-medium text-custom-dark hover:text-custom-moreDarker">Log in</Button>
                        </Link>
                        <Link href={"/auth?is_login=false"} passHref>
                        <Button className="border rounded-3xl border-custom-dark text-custom-dark hover:bg-custom-dark hover:text-white">
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