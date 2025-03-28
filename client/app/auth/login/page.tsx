"use client";
import Link from 'next/link';
import Image from 'next/image';
import logoSvg from '@/public/logo.svg';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';

import { ProjectLoader } from '@/components/loaders/project-loader';
import { Button } from "@/components/ui/button";
import { postWithOutTokenAPI } from '@/utils/apiRequest';
import { LOGIN_API, REGISTER_API } from "@/constants/api";
import { set } from 'lockr';

type data = {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const [formdata, setFormData] = useState<data>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('access')) {
            router.push("/dashboard");
            return;
        }

        setLoading(false);
    }, [router]);


    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let successFn = function (result: any) {
                localStorage.setItem("access", result.data.access_token);
                localStorage.setItem("refresh", result.data.refresh_token);
                toast.success(result.message);
                router.push("/dashboard");
            };

            let errorFn = function (error: any) {
                toast.error(error.detail.message);
            };

            postWithOutTokenAPI(LOGIN_API, formdata, successFn, errorFn);
            setLoading(false);


        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    };


    const handleGoogleLogin = async () => {
        // Google login implementation
    };

    return (
        <>
        {loading ? (
        <ProjectLoader message="Welcome to CareerEdge" />
      ) : (
            <section className="bg-white max-h-screen">
                <div className="flex w-full min-h-screen">
                    <div className="flex items-center my-auto w-full md:w-1/2 justify-center px-8  bg-white sm:px-6 lg:px-8">
                        <div className="w-full max-w-sm  xl:mx-auto">
                            <div className="text-center mx-auto">

                                <Link href={"/"} className="flex items-center gap-2 w-fit mx-auto mb-2 ">
                                    <Image src={logoSvg} alt="Logo" width={150} />
                                </Link>
                                <h2 className="text-3xl  font-roboto leading-tight text-black">Welcome Back to CareerEdge</h2>
                                <p className="mt-2 text-sm text-gray-600">Don't have an account? <Link href="/auth/signup" className="font-medium text-custom-darker">Signup</Link>
                                </p>
                            </div>

                            <form className="mt-5" onSubmit={handleAuth}>
                                <div className="space-y-3">
                                    

                                    <div>
                                        <label className="text-sm font-roboto text-gray-700"> Email address </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formdata.email}

                                                onChange={(e) => setFormData({ ...formdata, email: e.target.value })} placeholder="Enter email to get started"
                                                className="block w-full py-2 text-sm px-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-roboto text-gray-700"> Password </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formdata.password}

                                                onChange={(e) => setFormData({ ...formdata, password: e.target.value })} placeholder="Enter your password"
                                                className="block w-full py-2 text-sm px-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>
                                    </div>



                                    <div>
                                        <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-3 mt-5 text-sm  text-white/90 transition-all duration-200 bg-custom-darker font-roboto rounded-xl focus:outline-none hover:bg-custom-darker/90 focus:bg-blue-700">
                                            {loading ? (
                                                "Login in..."

                                            ) : ("Login")}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                                <hr className="border bg-black/50" />
                                <span className="text-black/80 text-xs">Or continue With</span>
                                <hr className="border bg-black/50" />
                            </div>

                            <div className="mt-3 w-full">
                                <Button type="button" disabled={loading} className="w-full border py-3 hover:bg-gray-100 border-black/30 rounded-xl" variant="outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                                        <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                        <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                        <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                        <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                    </svg>
                                    <span>Google</span>
                                </Button>

                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex md:w-1/2 items-center justify-center px-4  bg-gray-50 sm:px-6 lg:px-8">
                        <div>
                            <img className="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="" />

                            <div className="w-full max-w-md mx-auto xl:max-w-xl">
                                <h3 className="text-2xl font-bold text-center text-black">Design your own card</h3>
                                <p className="leading-relaxed text-center text-gray-500 mt-2.5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>

                                <div className="flex items-center justify-center mt-10 space-x-3">
                                    <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                                    <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                                    <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}
        </>


    )
}