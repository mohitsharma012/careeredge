"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, Brain, FileText, Zap, Upload, Download, Target, RefreshCcw, FileUp, FileSearch, FileCheck, ChevronRight } from "lucide-react";
import Image from 'next/image'
import Link from 'next/link'
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import ImageCarousel from "@/components/ui/image-carousel";

import SubscriptionPricing from "@/components/subscription/pricing";
import Features from "@/components/index/features";
import Testimonials from "@/components/index/testimonial";
import FAQ from "@/components/index/faq";


const features = [
  {
    icon: <Brain className="h-6 w-6 text-blue-600" />,
    title: "AI-Powered Analysis",
    description: "Our AI analyzes your CV against job descriptions to highlight matching skills and suggest improvements"
  },
  {
    icon: <Target className="h-6 w-6 text-blue-600" />,
    title: "Job-Specific Optimization",
    description: "Get tailored recommendations to match your CV with specific job requirements"
  },
  {
    icon: <RefreshCcw className="h-6 w-6 text-blue-600" />,
    title: "Real-time Adaptation",
    description: "Instantly adapt your CV for different job applications with AI suggestions"
  },
  {
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    title: "Smart Templates",
    description: "Access industry-specific templates optimized by AI for higher success rates"
  }
];

const quickSteps = [
  {
    icon: "1.",
    title: "Upload CV & Job Description",
    description: "AI scans for missing keywords and opportunities",
    animation: "fade-right"
  },
  {
    icon: "2.",
    title: "Get AI Optimization Suggestions",
    description: "Improves content & ATS compliance",
    animation: "fade-up"
  },
  {
    icon: "3.",
    title: "Download Ready-to-Use CV",
    description: "Choose from multiple professional templates",
    animation: "fade-left"
  }
];

const reviews = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop&q=80",
    text: "The AI analysis helped me highlight skills I didn't know were valuable. Landed my dream job within weeks!",
  },
  {
    name: "Marcus Rodriguez",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80",
    text: "The job-specific optimization feature is a game-changer. My response rate increased by 300%.",
  },
  {
    name: "Emily Watson",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop&q=80",
    text: "The AI suggestions are incredibly accurate. It's like having a professional CV consultant available 24/7.",
  },
];

const templatesData = [
  {
    id: 1,
    image: "/templates/template_1.jpg",
    title: 'Item 1'
  },
  {
    id: 2,
    image: "/templates/template_2.jpg",
    title: 'Item 2'
  },
  {
    id: 3,
    image: "/templates/template_3.jpg",
    title: 'Item 3'
  },
  {
    id: 4,
    image: "/templates/template_4.jpg",
    title: 'Item 4'
  },
  {
    id: 5,
    image: "/templates/template_5.jpg",
    title: 'Item 4'
  }
];

export default function Home() {


  return (
    <main className="min-h-screen bg-white">


      {/* Hero Section */}

      <section className="h-screen bg-white flex mt-9 ">
        <div className=" pb-16 px-8 md:px-0 my-auto flex flex-col md:flex-row max-w-7xl mx-auto gap-8 ">

          <div className="max-w-7xl mt-24 md:mt-auto my-auto">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 "></div>
            </div>
            <div className="inline-flex gap-2 px-2 py-1 rounded-full bg-blue-100  border border-blue-100 mb-6 animate-slide-up">
              <Zap className="h-4 w-4 text-blue-700 mt-0.5" />
              <span className="text-sm font-medium text-blue-700 font-sans">AI-Powered Resume Optimization</span>
            </div>
            <h1 className="text-4xl  md:text-6xl  text-left  font-bold md:font-semibold  leading-tight mb-4 animate-scale-in">
              Land Your  <span className="text-custom-darker "> Dream Job </span> <br />
              AI-Powered Resume Enhancement
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 mx-auto  text-left  animate-slide-up">
              Enhance your resume with AI technology to stand out to employers. Our service helps you get noticed and land your dream job.
            </p>
            <div className="flex  gap-4 animate-slide-up">

              <Link href={"/auth/signup"}  className="bg-custom-darker px-5 py-3  rounded-md hover:bg-custom-moreDarker text-white transition-all duration-300">
                Create Your Resume 
              </Link >
              <Link href={"/auth/signup"} className="border-2 text-custom-darker px-5 py-2.5 rounded-md flex hover:text-white hover:bg-custom-darker transition-all duration-300">
                Watch Demo
              </Link >
            </div>
          </div>
          <div className="mx-auto  md:mr-12  mt-20 drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]">
            <Image
              src="/home/heroImage.png"
              width={700}
              height={500}
              alt="Picture of the author"
            />

          </div>
        </div>
      </section>




      <SubscriptionPricing />
      
      {/* Features */}
      <Features/>
      <Testimonials/>
      <FAQ/>







      {/* CTA Section */}
      <section className="py-16  px-4 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="hero-card py-16 px-8 md:p-12 bg-gradient-to-r from-custom-darker to-custom-moreDarker overflow-hidden ">
            <div className=" w-auto text-center">
              <h2 className="text-4xl font-serif mb-4 text-white">
                Ready to Optimize Your CV?
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Join thousands of successful job seekers who have improved their CVs with AI
              </p>

              <Link href={"/auth/signup"} className="bg-white mx-auto w-56 text-center text-sm text-moreDarker px-5 py-3 rounded-lg hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>

      </section>
    </main>
  );

}
