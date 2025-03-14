"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Brain,
  Mail,
  Lock,
  AlertCircle,
  User,
  Gift,
  ArrowRight,
  Loader2,
} from "lucide-react";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReferralDialog, setShowReferralDialog] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/dashboard");
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (signUpError) throw signUpError;

        setShowReferralDialog(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleReferralSubmit = async () => {
    setLoading(true);
    try {
      // Here you would validate and process the referral code
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <div className="bg-custom-dark rounded-xl p-3">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {mode === "login"
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
              {mode === "signup" && (
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {mode === "login" && (
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
              ) : mode === "login" ? (
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
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
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
                    onClick={() => setMode("login")}
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

      {/* Referral Code Dialog */}
      <Dialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you have a referral code?</DialogTitle>
            <DialogDescription>
              Enter your referral code to get special benefits
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-custom-lightest/30 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 bg-custom-lightest rounded-lg">
                <Gift className="h-5 w-5 text-custom-medium" />
              </div>
              <div>
                <div className="font-medium">Get Started with Benefits</div>
                <div className="text-sm text-gray-600">
                  Use a referral code to unlock special features
                </div>
              </div>
            </div>
            <Input
              placeholder="Enter referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowReferralDialog(false);
                router.push("/dashboard");
              }}
            >
              Skip
            </Button>
            <Button
              className="bg-custom-medium hover:bg-custom-dark"
              onClick={handleReferralSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}