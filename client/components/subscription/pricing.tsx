"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ArrowUpRight, CircleCheck, CircleHelp } from "lucide-react";
import { useState } from "react";

const tooltipContent = {
  styles: "Choose from a variety of styles to suit your preferences.",
  filters: "Choose from a variety of filters to enhance your portraits.",
  credits: "Use these credits to retouch your portraits.",
};

const YEARLY_DISCOUNT = 20;
const plans = [
  {
    name: "Starter",
    price: 20,
    type: "MONTHLY",
    isRecommended: false,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      "3-hour turnaround time",
      "20 AI portraits",
      "Choice of 2 styles",
      "Choice of 2 filters",
      "2 retouch credits",
    ],
  },
  {
    name: "Advanced",
    price: 40,
    type: "MONTHLY",
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      "2-hour turnaround time",
      "50 AI portraits",
      "Choice of 5 styles",
      "Choice of 5 filters",
      "5 retouch credits",
      
    ],
    isPopular: true,
  },
  {
    name: "Advanced",
    price: 40,
    type: "MONTHLY",
    isRecommended: false,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      "2-hour turnaround time",
      "50 AI portraits",
      "Choice of 5 styles",
      "Choice of 5 filters",
      "5 retouch credits",
      
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: 80,
    type: "YEARLY",
    isRecommended: false,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      "1-hour turnaround time",
      "100 AI portraits",
      "Choice of 10 styles",
      "Choice of 10 filters",
      "10 retouch credits",
    ],
  },
];

const SubscriptionPricing = () => {
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("MONTHLY");

  return (
    <section className="py-24 mt-64 md:mt-0">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-manrope text-4xl text-center font-bold text-gray-900 mb-4">Choose your plan </h2>
          <p className="text-gray-500 text-center leading-6 mb-7 text-sm">7 Days free trial. No credit card required.</p>
          <div className="flex justify-center items-center">

            <label className="min-w-[3.5rem] text-base relative text-gray-900 mr-4 font-medium">Bill Monthly</label>
            <input type="checkbox" id="basic-with-description" onClick={() => setSelectedBillingPeriod(selectedBillingPeriod === "MONTHLY" ? "YEARLY" : "MONTHLY")}
              className="relative shrink-0 w-11 h-6 p-0.5 bg-indigo-100 checked:bg-none checked:bg-indigo-100 rounded-full cursor-pointer transition-colors ease-in-out duration-200  focus:border-custom-moreDarker  appearance-none 

                    before:inline-block before:w-5 before:h-5 before:bg-custom-darker checked:before:bg-custom-darker   before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform  before:transition before:ease-in-out before:duration-200 "/>
            <label className="relative min-w-[3.5rem] font-medium text-base text-gray-500 ml-4 ">
              Bill Yearly
            </label>
          </div>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:space-y-0 lg:items-center">



          {plans.map((plan, index) => 
            selectedBillingPeriod === plan.type && (

              <div key={index} className="flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl bg-indigo-50 transition-all duration-500 hover:bg-indigo-100 ">
                {plan.isRecommended && (
                  <div className="uppercase bg-gradient-to-r from-custom-darker to-custom-moreDarker rounded-t-2xl p-3 text-center text-white">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6 xl:py-9 xl:px-12">
                  <h3 className="font-manrope text-xl font-bold mb-3">{plan.name}</h3>
                  <div className="flex items-center mb-6">
                    <span className="font-manrope mr-2 text-4xl font-semibold text-custom-moreDarker">$150</span>
                    <span className="text-base text-gray-500 ">/ month</span>
                  </div>
                  <ul className="mb-12 space-y-6 text-left text-base ">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-4">
                      <svg className="flex-shrink-0 w-6 h-6 text-custom-darker" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" stroke="currentColor"strokeWidth="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                    ))}
                    
                  </ul>
                  <a href="javascript:;" className="py-2.5 px-5 bg-custom-darker shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit block mx-auto hover:bg-custom-moreDarker">Purchase Plan</a>
                </div>
              </div>
            )
          )}


        </div>

      </div>
    </section>
  );
};

export default SubscriptionPricing;
