import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FaqItem {
    question: string;
    answer: string;
  }
  
  interface Faq1Props {
    heading?: string;
    items?: FaqItem[];
  }
  
  const FAQ = ({
    heading = "Frequently asked questions",
    items = [
        {
          question: "What is the AI Job Description & Resume Builder?",
          answer:
            "The AI Job Description & Resume Builder is a tool that helps users create professional job descriptions and resumes quickly and efficiently using artificial intelligence.",
        },
        {
          question: "How does the AI Job Description & Resume Builder work?",
          answer:
            "It uses AI algorithms to analyze job roles, extract key skills, and generate well-structured job descriptions and resumes tailored to industry standards.",
        },
        {
          question: "Who can use this tool?",
          answer:
            "This tool is designed for job seekers, recruiters, hiring managers, and HR professionals who want to streamline the job description and resume creation process.",
        },
        {
          question: "Is the AI-generated content customizable?",
          answer:
            "Yes, users can edit and customize the AI-generated job descriptions and resumes to match their specific needs and preferences.",
        },
        {
          question: "Does the tool support multiple industries and job roles?",
          answer:
            "Yes, the AI can generate job descriptions and resumes for a wide range of industries and job roles, from entry-level positions to executive roles.",
        },
        {
          question: "Is my personal information secure?",
          answer:
            "Yes, we prioritize user privacy and security. Your data is encrypted and not shared with third parties.",
        },
        {
          question: "How much does it cost to use the AI Job Description & Resume Builder?",
          answer:
            "Pricing varies based on the plan you choose. We offer free and premium versions with additional features.",
        },
        {
          question: "Can I export my resume or job description?",
          answer:
            "Yes, you can download your resume or job description in various formats, including PDF and Word.",
        },
        {
          question: "Do I need prior experience to use this tool?",
          answer:
            "No, the tool is designed to be user-friendly, and no prior experience is needed to generate high-quality job descriptions and resumes.",
        },
        {
          question: "How accurate is the AI-generated content?",
          answer:
            "The AI leverages advanced natural language processing to create accurate and well-structured content, but users should review and refine it as needed.",
        },
      ],
      
  }: Faq1Props) => {
    return (
      <section className="py-3 px-8 w-full">
        <div className="container mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold md:mb-11 md:text-4xl">
            {heading}
          </h1>
          <Accordion type="single" collapsible>
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className=" text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black/90">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
  export default FAQ;
  