import React from 'react';
import { useCV } from '@/context/CVContext';
import { Briefcase, GraduationCap, Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ModernTemplate = ({ isEditing = false, editedData, handleChange }) => {
  const { cvData } = useCV();
  const { personal, experience, education, skills } = cvData;
  
  const personalData = isEditing && editedData ? editedData : personal;

  return (
    <div className="max-w-[800px] mx-auto bg-white p-8 shadow-lg rounded-lg overflow-y-auto h-full border border-blue-50 interactive-card">
      <header className="mb-8 relative">
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-50 opacity-30 floating-element -z-10" />
        
        {isEditing ? (
          <div className="mb-4">
            <div className="flex gap-2">
              <Input
                value={personalData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="First Name"
                className="text-2xl font-bold mb-1 border-blue-200"
              />
              <Input
                value={personalData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Last Name"
                className="text-2xl font-bold mb-1 border-blue-200"
              />
            </div>
            <Input
              value={personalData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Professional Title"
              className="text-lg mb-4 border-blue-200"
            />
          </div>
        ) : (
          <>
            {(personalData.firstName || personalData.lastName) ? (
              <h1 className="text-3xl font-bold mb-1 tracking-tight text-blue-900">
                {personalData.firstName} {personalData.lastName}
              </h1>
            ) : (
              <h1 className="text-3xl font-bold mb-1 tracking-tight text-gray-300">Your Name</h1>
            )}

            {personalData.title ? (
              <p className="text-lg text-blue-700 mb-4">{personalData.title}</p>
            ) : (
              <p className="text-lg text-gray-300 mb-4">Professional Title</p>
            )}
          </>
        )}

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <Input
                  value={personalData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Email"
                  className="text-sm border-blue-200"
                />
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <Input
                  value={personalData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Phone"
                  className="text-sm border-blue-200"
                />
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <Input
                  value={personalData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Location"
                  className="text-sm border-blue-200"
                />
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <Input
                  value={personalData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="Website"
                  className="text-sm border-blue-200"
                />
              </div>
            </div>
          ) : (
            <>
              {personalData.email && (
                <div className="flex items-center gap-1 text-blue-800 hover:text-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>{personalData.email}</span>
                </div>
              )}
              {personalData.phone && (
                <div className="flex items-center gap-1 text-blue-800 hover:text-blue-600 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>{personalData.phone}</span>
                </div>
              )}
              {personalData.location && (
                <div className="flex items-center gap-1 text-blue-800 hover:text-blue-600 transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span>{personalData.location}</span>
                </div>
              )}
              {personalData.website && (
                <div className="flex items-center gap-1 text-blue-800 hover:text-blue-600 transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>{personalData.website}</span>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {(personalData.summary || isEditing) && (
        <section className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-2 pb-1 border-b border-blue-100 text-blue-800">Professional Summary</h2>
          {isEditing ? (
            <Textarea
              value={personalData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Write a professional summary..."
              className="w-full p-2 border-blue-200"
              rows={4}
            />
          ) : (
            <p className="text-gray-700">{personalData.summary}</p>
          )}
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-1 border-b border-blue-100 text-blue-800">Work Experience</h2>
        {experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="animate-fade-in hover:bg-blue-50/50 p-3 -mx-3 rounded-md transition-colors group">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">{exp.title}</h3>
                    <div className="text-blue-600">{exp.company}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-500 whitespace-nowrap bg-blue-50 px-2 py-1 rounded-full">
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
                {exp.location && <div className="text-sm text-blue-400 mb-2">{exp.location}</div>}
                {exp.description && <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic bg-blue-50/30 p-4 rounded-md text-center">Add your work experience</div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-1 border-b border-blue-100 text-blue-800">Education</h2>
        {education.length > 0 ? (
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="animate-fade-in hover:bg-blue-50/50 p-3 -mx-3 rounded-md transition-colors group">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">{edu.degree}</h3>
                    <div className="text-blue-600">{edu.institution}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-500 whitespace-nowrap bg-blue-50 px-2 py-1 rounded-full">
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
                {edu.location && <div className="text-sm text-blue-400 mb-2">{edu.location}</div>}
                {edu.description && <p className="text-gray-700 text-sm whitespace-pre-line">{edu.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic bg-blue-50/30 p-4 rounded-md text-center">Add your education</div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 pb-1 border-b border-blue-100 text-blue-800">Skills</h2>
        {skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="animate-fade-in bg-blue-50/50 p-3 rounded-md hover:shadow-blue-inner transition-all">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-blue-800">{skill.name}</span>
                  <span className="text-xs text-blue-500 px-2 py-0.5 bg-white rounded-full">
                    {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-gradient h-1.5 rounded-full" 
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic bg-blue-50/30 p-4 rounded-md text-center">Add your skills</div>
        )}
      </section>
    </div>
  );
};

export default ModernTemplate;