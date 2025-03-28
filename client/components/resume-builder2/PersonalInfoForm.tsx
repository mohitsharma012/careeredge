
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCV } from '@/context/CVContext';
import { AtSign, MapPin, Globe, Phone, User, FileText, Zap } from 'lucide-react';


const PersonalInfoForm = () => {
  const { cvData, updatePersonal } = useCV();
  const { personal } = cvData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonal({ [name]: value });
  };

  return (
    <div className="form-section space-y-6">
         {/* Title and description */}
         <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-bold text-blue-800">Personal Details</h2>
        </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="form-field flex-1 space-y-2">
          <Label htmlFor="firstName" className="text-blue-800 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            First Name
          </Label>
          <div className="relative">
            <Input
              id="firstName"
              name="firstName"
              value={personal.firstName}
              onChange={handleChange}
              placeholder="John"
              className="transition-all duration-300 focus:border-blue-500 pr-3 pl-3 focus:ring-2 focus:ring-blue-200"
            />
            <div className="form-field-glow"></div>
          </div>
        </div>
        <div className="form-field flex-1 space-y-2">
          <Label htmlFor="lastName" className="text-blue-800 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            Last Name
          </Label>
          <div className="relative">
            <Input
              id="lastName"
              name="lastName"
              value={personal.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
            />
            <div className="form-field-glow"></div>
          </div>
        </div>
      </div>

      <div className="form-field space-y-2">
        <Label htmlFor="title" className="text-blue-800 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Professional Title
        </Label>
        <div className="relative">
          <Input
            id="title"
            name="title"
            value={personal.title}
            onChange={handleChange}
            placeholder="Software Engineer"
            className="transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
          />
          <div className="form-field-glow"></div>
        </div>
      </div>

      <div className="form-field space-y-2">
        <Label htmlFor="email" className="text-blue-800 flex items-center gap-1.5">
          <AtSign className="h-3.5 w-3.5" />
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
          />
          <div className="form-field-glow"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="form-field flex-1 space-y-2">
          <Label htmlFor="phone" className="text-blue-800 flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            Phone
          </Label>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              value={personal.phone}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
              className="transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
            />
            <div className="form-field-glow"></div>
          </div>
        </div>
        <div className="form-field flex-1 space-y-2">
          <Label htmlFor="location" className="text-blue-800 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </Label>
          <div className="relative">
            <Input
              id="location"
              name="location"
              value={personal.location}
              onChange={handleChange}
              placeholder="New York, NY"
              className="transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
            />
            <div className="form-field-glow"></div>
          </div>
        </div>
      </div>

      <div className="form-field space-y-2">
        <Label htmlFor="website" className="text-blue-800 flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5" />
          Website (Optional)
        </Label>
        <div className="relative">
          <Input
            id="website"
            name="website"
            value={personal.website}
            onChange={handleChange}
            placeholder="https://johndoe.com"
            className="transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
          />
          <div className="form-field-glow"></div>
        </div>
      </div>

      <div className="form-field space-y-2">
        <Label htmlFor="summary" className="text-blue-800 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Professional Summary
        </Label>
        <div className="relative">
          <Textarea
            id="summary"
            name="summary"
            value={personal.summary}
            onChange={handleChange}
            placeholder="A brief summary of your professional background and career goals."
            className="resize-none min-h-[150px] transition-all duration-300 focus:border-blue-500 pl-3 focus:ring-2 focus:ring-blue-200"
          />
          <div className="form-field-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
