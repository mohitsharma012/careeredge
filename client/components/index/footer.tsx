import Link from 'next/link';
import { useRouter } from "next/navigation";
import logoSvg from '@/public/logo.svg';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { COMPANY_NAME } from '@/constants/constant';


const SocialMedia = [
    {
        name: "Facebook",
        icon: <Facebook />,
        href: "#"
    },
    {
        name: "Twitter",
        icon: <Twitter />,
        href: "#"
    },
    {
        name: "Instagram",
        icon: <Instagram />,
        href: "#"
    },
    {
        name: "LinkedIn",
        icon: <Linkedin />,
        href: "#"
    }
]


export const Footer = () => {
    return (
        <>
            <footer className="w-full py-14 bg-white/90">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className=" mx-auto flex flex-col">
                        <div className='flex justify-between items-center'>

                        <Link href={"/"} className=" items-center gap-2  w-auto">
                            <Image src={logoSvg} alt="Logo" width={150} />
                        </Link>
                        <ul className="text-sm flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
                            <li><a href="#" className="text-gray-800 hover:text-gray-900">Pagedone</a></li>
                            <li><a href="#" className=" text-gray-800 hover:text-gray-900">Products</a></li>
                            <li><a href="#" className=" text-gray-800 hover:text-gray-900">Resources</a></li>
                            <li><a href="#" className=" text-gray-800 hover:text-gray-900">Blogs</a></li>
                            <li><a href="#" className=" text-gray-800 hover:text-gray-900">Support</a></li>
                        </ul>
                        <div className="flex space-x-10 justify-center items-center mb-14">
                            {SocialMedia.map((item, index) => (
                                
                                <Link href={"#"} key={index} className="block  text-gray-900 transition-all duration-500 hover:text-indigo-600 ">
                                    {item.icon}
                                </Link>
                            ))}

                        </div>
                            </div>
                        <span className="text-sm text-gray-500 text-center block">Copyright ©2024 {COMPANY_NAME}, All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </>
    )
};
