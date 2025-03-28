"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Info, CreditCard, Shield, Clock, Zap, ChevronRight, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import logoSvg from '@/public/logo.svg';


const Pricing = () => {
    const { toast } = useToast();
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId);
        toast({
            title: "Plan selected",
            description: `You've selected the ${planId} plan. Click subscribe to continue.`,
        });
    };

    const handleSubscribe = () => {
        if (!selectedPlan) {
            toast({
                title: "No plan selected",
                description: "Please select a plan before subscribing",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Processing subscription",
            description: "Redirecting to checkout...",
        });

        // In a real application, this would redirect to a checkout page
        setTimeout(() => {
            window.location.href = '/dashboard?subscribed=true';
        }, 1500);
    };

    const plans = [
        {
            id: 'free',
            name: 'Free',
            description: 'Basic features for starting your job search',
            price: {
                monthly: 0,
                yearly: 0,
            },
            features: [
                'Create up to 2 resumes',
                'Access to 3 basic templates',
                'Standard PDF export',
                'Basic ATS analysis',
            ],
            limitations: [
                'No AI customization',
                'No job description matching',
                'No priority support',
            ],
            color: 'blue',
            popular: false,
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Advanced features for serious job seekers',
            price: {
                monthly: 9.99,
                yearly: 99.99,
            },
            features: [
                'Create unlimited resumes',
                'Access to all templates',
                'Multiple export formats',
                'Advanced ATS analysis',
                'AI resume customization',
                'Job description matching',
                'Email & chat support',
            ],
            limitations: [],
            color: 'purple',
            popular: true,
        },
        {
            id: 'business',
            name: 'Business',
            description: 'Full suite for teams and recruiters',
            price: {
                monthly: 19.99,
                yearly: 199.99,
            },
            features: [
                'Everything in Professional',
                'Team collaboration',
                'Branded exports',
                'API access',
                'Advanced analytics',
                'Priority support',
                'Dedicated account manager',
            ],
            limitations: [],
            color: 'emerald',
            popular: false,
        },
    ];

    const renderPlanCard = (plan: typeof plans[0]) => {
        const isActive = selectedPlan === plan.id;
        const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;

        const colorClasses = {
            blue: {
                bg: 'from-blue-50 to-blue-100',
                border: 'border-blue-200',
                text: 'text-blue-700',
                badge: 'bg-blue-100 text-blue-700 border-blue-200',
                button: isActive ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700',
                icon: 'text-blue-600',
            },
            purple: {
                bg: 'from-purple-50 to-purple-100',
                border: 'border-purple-200',
                text: 'text-purple-700',
                badge: 'bg-purple-100 text-purple-700 border-purple-200',
                button: isActive ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-100 hover:bg-purple-200 text-purple-700',
                icon: 'text-purple-600',
            },
            emerald: {
                bg: 'from-emerald-50 to-emerald-100',
                border: 'border-emerald-200',
                text: 'text-emerald-700',
                badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                button: isActive ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700',
                icon: 'text-emerald-600',
            },
        };

        const colorClass = colorClasses[plan.color as keyof typeof colorClasses];

        return (
            <Card
                className={`bg-white border ${isActive ? `${colorClass.border} ring-2 ring-${plan.color}-500/30 shadow-blue-glow` : 'border-gray-200'} h-full flex flex-col transition-all duration-300 ${isActive ? 'transform scale-[1.02]' : ''}`}
            >
                <CardHeader className="space-y-1">
                    {plan.popular && (
                        <Badge className={`${colorClass.badge} border self-start mb-2`}>
                            Most Popular
                        </Badge>
                    )}
                    <CardTitle className={colorClass.text}>{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                        {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                        <span className="text-3xl font-bold text-gray-800">${price}</span>
                        <span className="text-sm text-gray-500">
                            {price === 0 ? '/forever' : `/${billingCycle === 'monthly' ? 'month' : 'year'}`}
                        </span>
                        {billingCycle === 'yearly' && price > 0 && (
                            <Badge variant="outline" className="ml-2 border-green-200 text-green-700 bg-green-50">
                                Save {Math.round(100 - (plan.price.yearly / (plan.price.monthly * 12)) * 100)}%
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-grow">
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${colorClass.bg} ${colorClass.border}`}>
                        <div className="space-y-3">
                            {plan.features.map((feature, index) => (
                                <div key={`feature-${index}`} className="flex items-start gap-2">
                                    <Check className={`h-5 w-5 ${colorClass.icon} mt-0.5 flex-shrink-0`} />
                                    <p className="text-sm text-gray-700">{feature}</p>
                                </div>
                            ))}

                            {plan.limitations.length > 0 && (
                                <>
                                    <Separator className="my-3 bg-gray-200" />
                                    {plan.limitations.map((limitation, index) => (
                                        <div key={`limitation-${index}`} className="flex items-start gap-2">
                                            <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-500">{limitation}</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className={`w-full ${colorClass.button}`}
                        onClick={() => handlePlanSelect(plan.id)}
                    >
                        {isActive ? 'Selected' : 'Select Plan'}
                    </Button>
                </CardFooter>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pattern-bg text-gray-800">
            

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                <Link href={"/"} className="flex items-center gap-2 w-fit mx-auto mb-2 ">
                                    <Image src={logoSvg} alt="Logo" width={180} />
                                </Link>
                    <h1 className="text-4xl mt-6  font-bold tracking-tight mb-4 text-gray-800">
                    Affordable Plans for a Job-Winning AI CV
                    </h1>
                    

                    <div className="inline-block bg-white p-1 rounded-lg border border-blue-100 shadow-sm">
                        <Tabs value={billingCycle} onValueChange={setBillingCycle} className="w-[300px]">
                            <TabsList className="grid grid-cols-2 w-full bg-custom-lightest">
                                <TabsTrigger value="monthly" className="data-[state=active]:bg-custom-medium">Monthly</TabsTrigger>
                                <TabsTrigger value="yearly" className="data-[state=active]:bg-custom-medium">
                                    Yearly
                                    <Badge variant="outline" className="ml-2 border-green-200 text-green-700 bg-green-50">
                                        Save 20%
                                    </Badge>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {plans.map((plan) => renderPlanCard(plan))}
                </div>

                <div className="flex justify-center">
                    <Button
                        size="lg"
                        onClick={handleSubscribe}
                        disabled={!selectedPlan}
                        className="bg-gradient-to-r text-white from-custom-dark to-custom-darker hover:from-custom-dark/80 hover:to-custom-darker/80 text-lg px-8"
                    >
                        Subscribe Now
                        <ChevronRight size={18} />
                    </Button>
                </div>

                
            </div>

           
        </div>
    );
};

export default Pricing;