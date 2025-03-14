"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resumeSchema } from "./schema";
import { useResumeStore } from "./store";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { ResumeData } from "./types";

interface ResumeFormProps {
  activeSection: string;
  onDataChange?: (data: ResumeData) => void;
}

export function ResumeForm({ activeSection, onDataChange }: ResumeFormProps) {
  const { resumeData, updateResumeData } = useResumeStore();
  
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeData,
  });

  // Subscribe to form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Only update if we have valid data
      if (Object.keys(value).length > 0) {
        updateResumeData(value as ResumeData);
        onDataChange?.(value as ResumeData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateResumeData, onDataChange]);

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = 
    useFieldArray({
      control: form.control,
      name: "experience",
    });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } =
    useFieldArray({
      control: form.control,
      name: "education",
    });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } =
    useFieldArray({
      control: form.control,
      name: "skills",
    });

  const onSubmit = (data: ResumeData) => {
    updateResumeData(data);
    onDataChange?.(data);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="personalInfo.fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        );

      case "summary":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Professional Summary</h2>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief overview of your career and key achievements..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case "experience":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendExperience({
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
                  achievements: [],
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <div className="space-y-6">
              {experienceFields.map((field, index) => (
                <div key={field.id} className="relative border rounded-lg p-4">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Job Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your role and responsibilities..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "education":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Education</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendEducation({
                  institution: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                  gpa: "",
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            <div className="space-y-6">
              {educationFields.map((field, index) => (
                <div key={field.id} className="relative border rounded-lg p-4">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="University Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input placeholder="Bachelor's, Master's, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.field`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.gpa`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPA</FormLabel>
                          <FormControl>
                            <Input placeholder="3.8" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "skills":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSkill({
                  name: "",
                  level: "Beginner",
                  category: "Technical",
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
            <div className="space-y-4">
              {skillFields.map((field, index) => (
                <div key={field.id} className="relative border rounded-lg p-4">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input placeholder="JavaScript" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`skills.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proficiency Level</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-3 rounded-md border"
                              {...field}
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`skills.${index}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-3 rounded-md border"
                              {...field}
                            >
                              <option value="Technical">Technical</option>
                              <option value="Soft Skills">Soft Skills</option>
                              <option value="Languages">Languages</option>
                              <option value="Tools">Tools</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {renderSection()}
        
        <div className="sticky bottom-4 bg-white p-4 rounded-lg shadow-lg border">
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}