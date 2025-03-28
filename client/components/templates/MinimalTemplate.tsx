import React from 'react';
import { useCV } from '@/context/CVContext';
import { Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const MinimalTemplate = ({ isEditing = false, editedData, handleChange }) => {
  const { cvData } = useCV();
  const { personal, experience, education, skills } = cvData;
  
  // Use edited data if we're in editing mode and it's provided
  const personalData = isEditing && editedData ? editedData : personal;

  return (
    <div className="max-w-[800px] mx-auto bg-white p-8 shadow-lg overflow-y-auto h-full border border-gray-100">
      <header className="mb-6 pb-6 border-b border-gray-200">
        <div className="text-center">
          {isEditing ? (
            <div className="mb-2">
              <div className="flex gap-2 justify-center">
                <Input
                  value={personalData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="First Name"
                  className="text-xl font-bold mb-1 border-gray-200 text-center"
                />
                <Input
                  value={personalData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Last Name"
                  className="text-xl font-bold mb-1 border-gray-200 text-center"
                />
              </div>
              <Input
                value={personalData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Professional Title"
                className="text-md mb-3 border-gray-200 text-center"
              />
            </div>
          ) : (
            <>
              {(personalData.firstName || personalData.lastName) ? (
                <h1 className="text-2xl font-bold mb-2 text-gray-800">
                  {personalData.firstName} {personalData.lastName}
                </h1>
              ) : (
                <h1 className="text-2xl font-bold mb-2 text-gray-300">Your Name</h1>
              )}

              {personalData.title ? (
                <p className="text-md text-gray-600 mb-3">{personalData.title}</p>
              ) : (
                <p className="text-md text-gray-300 mb-3">Professional Title</p>
              )}
            </>
          )}

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-2 w-full max-w-md mx-auto">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-gray-500 flex-shrink-0" />
                  <Input
                    value={personalData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email"
                    className="text-xs border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-gray-500 flex-shrink-0" />
                  <Input
                    value={personalData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Phone"
                    className="text-xs border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                  <Input
                    value={personalData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Location"
                    className="text-xs border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-gray-500 flex-shrink-0" />
                  <Input
                    value={personalData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="Website"
                    className="text-xs border-gray-200"
                  />
                </div>
              </div>
            ) : (
              <>
                {personalData.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>{personalData.email}</span>
                  </div>
                )}
                {personalData.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{personalData.phone}</span>
                  </div>
                )}
                {personalData.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{personalData.location}</span>
                  </div>
                )}
                {personalData.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>{personalData.website}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {(personalData.summary || isEditing) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Summary</h2>
          {isEditing ? (
            <Textarea
              value={personalData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Write a professional summary..."
              className="w-full p-2 border-gray-200 text-sm"
              rows={3}
            />
          ) : (
            <p className="text-gray-600 text-sm">{personalData.summary}</p>
          )}
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Experience</h2>
        {experience.length > 0 ? (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <div>
                    <h3 className="font-medium text-gray-800">{exp.title}</h3>
                    <div className="text-gray-600 text-sm">{exp.company}</div>
                  </div>
                  <div className="text-gray-500 text-xs whitespace-nowrap">
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
                {exp.location && <div className="text-xs text-gray-500 mb-1">{exp.location}</div>}
                {exp.description && <p className="text-gray-600 text-xs">{exp.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic text-center text-sm p-2">Add your work experience</div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Education</h2>
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                  <div>
                    <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                    <div className="text-gray-600 text-sm">{edu.institution}</div>
                  </div>
                  <div className="text-gray-500 text-xs whitespace-nowrap">
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
                {edu.location && <div className="text-xs text-gray-500 mb-1">{edu.location}</div>}
                {edu.description && <p className="text-gray-600 text-xs">{edu.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic text-center text-sm p-2">Add your education</div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Skills</h2>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
                {skill.name} 
                <span className="text-gray-500 ml-1">
                  {['•', '••', '•••', '••••', '•••••'][skill.level - 1]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic text-center text-sm p-2">Add your skills</div>
        )}
      </section>
    </div>
  );
};

export default MinimalTemplate;