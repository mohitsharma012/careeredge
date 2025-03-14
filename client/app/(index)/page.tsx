"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, Brain, FileText, Zap, Upload, Download, Target, RefreshCcw, FileUp, FileSearch, FileCheck, ChevronRight } from "lucide-react";
import Image from 'next/image'
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import ImageCarousel from "@/components/ui/image-carousel";



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
      <section className="pt-32 pb-16 px-8 min-h-screen flex flex-col max-w-5xl mx-auto gap-8">
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 "></div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full  border border-blue-100 mb-6 animate-slide-up">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI-Powered CV Optimization</span>
          </div>
          <h1 className="text-4xl  md:text-6xl  text-left md:text-center font-bold md:font-medium  leading-tight mb-4 animate-scale-in">
            Create a  Job-Ready <br /> <span className="text-custom-dark "> Professional Resume </span>
            in Minutes
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 mx-auto max-w-2xl text-left md:text-center animate-slide-up">
            Enhance your resume with AI technology to stand out to employers. Our service helps you get noticed and land your dream job.
          </p>
          <div className="flex justify-center gap-4 animate-slide-up">
            <Button size="lg" className="bg-custom-dark hover:bg-custom-darker text-white transition-all duration-300">
              Analyze Your CV <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 hover:bg-custom-lightest transition-all duration-300">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="mx-auto drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
          <Image
            src="/home/heroImage.png"
            width={900}
            height={900}
            alt="Picture of the author"
          />

        </div>
      </section>

      {/* Quick Steps */}
      <section className="md:py-14 px-4 max-w-5xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold  leading-tight mb-2">How It Works ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your CV into an interview-winning document in three simple steps
            </p>
          </div>
          <div className="grid  md:grid-cols-3 gap-8 ">
            {quickSteps.map((step, index) => (
              <div key={index} className="step-card md:px-8 py-10 flex md:flex-col gap-6 px-4">
                <div className="md:mb-8 md:px-8 p-5 md:py-6 my-auto md:me-auto bg-white font-sans text-custom-medium md:text-3xl font-semibold rounded-xl">
                  {step.icon}
                </div>
                <div className="flex  flex-col my-auto">
                  <h3 className="md:text-2xl text-white font-bold md:font-medium md:mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-base font-sans">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Templates */}
      <div className="relative overflow-hidden  py-20 max-w-5xl mx-auto">
        <div className="mx-auto flex flex-col mb-10">
          <span className="text-sm mx-auto font-medium text-blue-800 mb-4">OPTIMIZED DESIGN</span>
          <div className="text-center mb-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl mb-4 font-bold">Make your Resume with Proven Professional Templates</h2>
            <p className="text-gray-600 px-8 text-base mx-auto">
              Used one of our field-tested resume templates, designed by a team of HR experts and typographers.
            </p>
          </div>
        </div>
        <div className="">
          <ImageCarousel items={templatesData} />
        </div>
      </div>



      {/* Features
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Powered by Advanced AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI technology analyzes thousands of successful CVs and job descriptions
              to provide you with the most effective optimization suggestions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                <div className="feature-icon mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}



      {/* Success Stories */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-4xl font-serif mb-4">Success Stories</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="font-medium">4.9</span>
              <span className="text-gray-600">out of 5</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 md:gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="feature-card p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full ring-2 ring-blue-100"
                  />
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-gray-600">{review.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="hero-card py-16 px-8 md:p-12 bg-gradient-to-r bg-custom-medium overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjMzczAxMiAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMnptMC0yYzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-serif mb-4 text-white">
                Ready to Optimize Your CV?
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Join thousands of successful job seekers who have improved their CVs with AI
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-custom-darkest hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );

}
