import React from 'react';
import { useCV } from '@/context/CVContext';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type HandleChangeFunction = (field: string, value: string) => void;

const CreativeTemplate = ({ isEditing = false, editedData, handleChange }: { 
  isEditing?: boolean; 
  editedData?: any; 
  handleChange: HandleChangeFunction 
}) => {
  const { cvData } = useCV();
  const { personal, experience, education, skills } = cvData;
  
  const personalData = isEditing && editedData ? editedData : personal;

  return (
    <div className="max-w-[800px] mx-auto overflow-y-auto h-full">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-t-lg">
        <header className="mb-6">
          {isEditing ? (
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  value={personalData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="First Name"
                  className="text-3xl font-bold mb-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
                <Input
                  value={personalData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Last Name"
                  className="text-3xl font-bold mb-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Input
                value={personalData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Professional Title"
                className="text-xl mb-4 border-white/20 bg-white/10 text-white placeholder:text-white/50"
              />
            </div>
          ) : (
            <>
              {(personalData.firstName || personalData.lastName) ? (
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  {personalData.firstName} {personalData.lastName}
                </h1>
              ) : (
                <h1 className="text-4xl font-bold mb-2 tracking-tight opacity-70">Your Name</h1>
              )}

              {personalData.title ? (
                <p className="text-xl mb-4 opacity-90">{personalData.title}</p>
              ) : (
                <p className="text-xl mb-4 opacity-50">Professional Title</p>
              )}
            </>
          )}

          {isEditing ? (
            <Textarea
              value={personalData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Write a professional summary..."
              className="w-full p-2 border-white/20 bg-white/10 text-white placeholder:text-white/50 text-sm mb-4"
              rows={3}
            />
          ) : (
            personalData.summary && (
              <p className="text-sm opacity-90 max-w-lg">{personalData.summary}</p>
            )
          )}
        </header>

        <div className="flex flex-wrap gap-4 text-sm">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Mail className="h-3 w-3 flex-shrink-0" />
                <Input
                  value={personalData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Email"
                  className="text-xs border-transparent bg-transparent text-white placeholder:text-white/50 h-6 p-0"
                />
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <Input
                  value={personalData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Phone"
                  className="text-xs border-transparent bg-transparent text-white placeholder:text-white/50 h-6 p-0"
                />
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <Input
                  value={personalData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Location"
                  className="text-xs border-transparent bg-transparent text-white placeholder:text-white/50 h-6 p-0"
                />
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Globe className="h-3 w-3 flex-shrink-0" />
                <Input
                  value={personalData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="Website"
                  className="text-xs border-transparent bg-transparent text-white placeholder:text-white/50 h-6 p-0"
                />
              </div>
            </div>
          ) : (
            <>
              {personalData.email && (
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Mail className="h-3 w-3" />
                  <span>{personalData.email}</span>
                </div>
              )}
              {personalData.phone && (
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Phone className="h-3 w-3" />
                  <span>{personalData.phone}</span>
                </div>
              )}
              {personalData.location && (
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{personalData.location}</span>
                </div>
              )}
              {personalData.website && (
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Globe className="h-3 w-3" />
                  <span>{personalData.website}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white p-8 shadow-xl rounded-b-lg">
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
          </div>
          
          {experience.length > 0 ? (
            <div className="space-y-6 pl-6 border-l-2 border-purple-100">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[1.65rem] top-0 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-purple-700">{exp.title}</h3>
                        <div className="text-gray-600 font-medium">{exp.company}</div>
                      </div>
                      <div className="text-purple-500 text-sm whitespace-nowrap mt-1 sm:mt-0">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Start Date'} 
                            {' - '}
                            {exp.current 
                              ? 'Present' 
                              : exp.endDate 
                                ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                                : 'End Date'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    {exp.location && <div className="text-sm text-gray-500 mb-2">{exp.location}</div>}
                    {exp.description && <p className="text-gray-600 text-sm">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 italic p-4 text-center">Add your work experience</div>
          )}
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Education</h2>
          </div>
          
          {education.length > 0 ? (
            <div className="space-y-6 pl-6 border-l-2 border-blue-100">
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  <div className="absolute -left-[1.65rem] top-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-blue-700">{edu.degree}</h3>
                        <div className="text-gray-600 font-medium">{edu.institution}</div>
                      </div>
                      <div className="text-blue-500 text-sm whitespace-nowrap mt-1 sm:mt-0">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Start Date'} 
                            {' - '}
                            {edu.current 
                              ? 'Present' 
                              : edu.endDate 
                                ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                                : 'End Date'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    {edu.location && <div className="text-sm text-gray-500 mb-2">{edu.location}</div>}
                    {edu.description && <p className="text-gray-600 text-sm">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 italic p-4 text-center">Add your education</div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
          </div>
          
          {skills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    {skill.level}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{skill.name}</div>
                    <div className="text-xs text-amber-600">
                      {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 italic p-4 text-center">Add your skills</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CreativeTemplate;