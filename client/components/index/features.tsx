import {
    Brain,
    MousePointerClick,
    TvMinimal,
    UserRoundPen,
    FileUser,
    ShieldCheck,
    Download,
    ArrowRight,
    Percent

} from "lucide-react";

import Link from "next/link";

const FeaturesList = [
    {
        name: "AI-Powered Keyword Analysis",
        description: "Advanced algorithms analyze job descriptions to identify critical keywords and requirements, highlighting matches and gaps between your CV and target positions.",
        icon: <Brain />
    },
    {
        name: "One-Click CV Optimization",
        description: "Automatically enhance your CV with a single button press, intelligently incorporating missing keywords while maintaining your professional tone and experience context.",
        icon: <MousePointerClick />
    },
    {
        name: "ATS Compliance Enhancement",
        description: "Ensures your CV passes through Applicant Tracking Systems by implementing formatting best practices and proper keyword placement.",
        icon: <TvMinimal />
    },
    {
        name: "Multiple Professional Profile Management",
        description: "Maintain up to three distinct professional profiles, allowing you to target different career paths or industries without starting from scratch.",
        icon: <UserRoundPen />
    },
    {
        name: "Match Score Percentage",
        description: "Receive a quantitative alignment score showing exactly how well your current CV matches the requirements of your target job position.",
        icon: <Percent />
    },
    {
        name: "Customizable CV Templates",
        description: "Choose from various professional templates before downloading your optimized CV, allowing you to maintain consistent branding across applications.",
        icon: <FileUser />
    },
    {
        name: "Job Description Detection",
        description: "Automatically fetch job descriptions from popular job portals or manually input them for analysis and optimization.",
        icon: <ShieldCheck />
    },
    {
        name: "Flexible Download Options",
        description: "Export your optimized CV in multiple formats (Word or PDF) and receive via email, with intelligent file naming that includes job title and company for easy reference.",
        icon: <Download />
    }

]


export default function Features() {


    return (
        <section className="py-2">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 lg:mb-8 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row  max-md:max-w-lg max-md:mx-auto">
                    <div className="relative w-full text-center lg:text-left lg:w-2/4">
                        <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">Boost Your Resume with Cutting-Edge AI Features</h2>
                    </div>
                    <div className="relative w-full text-center lg:text-left lg:w-2/4 -mt-4">
                        <p className="text-lg font-normal text-gray-500 mb-5">We provide all the AI-driven enhancements to make your resume stand out effortlessly, with no extra effort required</p>
                        <Link href={"/auth/signup"} className="flex flex-row -mt-3 items-center justify-center gap-2 text-base font-semibold text-custom-darker lg:justify-start hover:text-custom-moreDarker ">Try now <ArrowRight className="h-5 w-5 text-custom-darker" />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center mx-6 gap-x-16 gap-y-8 lg:gap-y-10 flex-wrap md:flex-wrap  lg:flex-row  ">
                    {FeaturesList.map((feature, index) => (
                        <div key={index} className="group relative w-full h-full bg-custom-lightest shadow-xl rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5  xl:p-7 xl:w-1/4 hover:bg-custom-darker">
                            <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                                {feature.icon}

                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">{feature.name}</h4>
                            <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}