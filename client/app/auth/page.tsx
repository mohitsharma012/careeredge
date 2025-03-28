"use client";
import { use, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ProjectLoader } from '@/components/loaders/project-loader';
import { Suspense } from 'react';

import {Brain, Mail, Lock, AlertCircle, User, Gift, ArrowRight, Loader2} from "lucide-react";
import {postWithOutTokenAPI} from '../../utils/apiRequest';
import { LOGIN_API, REGISTER_API } from "../../constants/api";
import toast from 'react-hot-toast';
import { LOGIN, REGISTER, VERIFY } from "../../constants/constant";

type AuthMode = typeof LOGIN | typeof REGISTER | typeof VERIFY ;
type data = {
  email: string;
  password: string;
  name: string;
  referralCode: string;
}

// Separate component that uses useSearchParams
function AuthContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const is_login = searchParams.get("is_login") === "true";
  const referral_code = searchParams.get("referral_code");
  const [mode, setMode] = useState<AuthMode>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formdata, setFormData] = useState<data>({
    email: "",
    password: "",
    name: "",
    referralCode: referral_code ? referral_code : "",
  });

  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem('access')) {
        await router.push("/dashboard");
        return;
      }
      setLoading(false);

      if (is_login) {
        setMode(LOGIN);
      } else {
        setMode(REGISTER);
      }
    };

    initialize();
  }, [router, is_login]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === LOGIN) {
        let successFn = function (result: any) {
            setLoading(false);
            toast.success("Login Success");
            localStorage.setItem("access", result.data.access_token);
            localStorage.setItem("refresh", result.data.refresh_token);
            router.push("/dashboard");
        };    
        let errorFn = function (error: any) {
            toast.error(error.detail.message);
            setLoading(false);
        };
    
        postWithOutTokenAPI(LOGIN_API, formdata, successFn, errorFn);
      
      } else {
        let successFn = function (result: any) {
            setLoading(false);
            localStorage.setItem("access", result.data.access_token);
            localStorage.setItem("refresh", result.data.refresh_token);
            toast.success(result.message);
            router.push("/dashboard");
        };
    
        let errorFn = function (error: any) {
            toast.error(error.detail.message);
            setLoading(false);
        };
    
        postWithOutTokenAPI(REGISTER_API, formdata, successFn, errorFn);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
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

    ):(
    <div className="min-h-screen bg-gradient-to-br from-custom-lightest via-white to-custom-lightest flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-custom-lightest p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Link href={"/"} className="bg-custom-dark rounded-xl p-3">
                <Brain className="h-8 w-8 text-white" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {mode === LOGIN ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {mode === LOGIN
                ? "Sign in to access your account"
                : "Join us and create your professional CV"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 mb-6"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )} 
         

          {/* Auth Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
             
              {mode === REGISTER && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formdata.name}
                      onChange = {(e) => setFormData({...formdata, name: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formdata.email}
                    onChange = {(e) => setFormData({...formdata, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formdata.password}
                    onChange = {(e) => setFormData({...formdata, password: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            {mode === REGISTER && (
                <div>
                  <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Referral Code
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="referralCode"
                      type="text"
                      placeholder="Enter your referral code"
                      value={formdata.referralCode}
                      onChange = {(e) => setFormData({...formdata, referralCode: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

            {mode === LOGIN && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-custom-medium focus:ring-custom-medium border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-custom-medium hover:text-custom-dark"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-custom-dark hover:bg-custom-darker h-11 text-white"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : mode === LOGIN ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
              />

              Continue with Google
            </Button>

            <p className="text-center text-sm text-gray-600">
              {mode === LOGIN ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode(REGISTER)}
                    className="text-custom-medium hover:text-custom-dark font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode(LOGIN)}
                    className="text-custom-medium hover:text-custom-dark font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </form>
        </motion.div>
      </div>
    </div>
    )}
    </>
  );
}

// Main component that wraps the content with Suspense
export default function AuthPage() {
  return (
    <Suspense fallback={<ProjectLoader message="Loading authentication..." />}>
      <AuthContent />
    </Suspense>
  );
}