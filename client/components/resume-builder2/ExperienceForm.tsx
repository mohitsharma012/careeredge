
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Briefcase } from 'lucide-react';
import { useCV, Experience } from '@/context/CVContext';

const ExperienceForm = () => {
  const { cvData, addExperience, updateExperience, removeExperience } = useCV();
  const { experience } = cvData;

  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const handleNewExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentChange = (checked: boolean) => {
    setNewExperience((prev) => ({ ...prev, current: checked, endDate: checked ? '' : prev.endDate }));
  };

  const handleAddExperience = () => {
    addExperience(newExperience);
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  const handleExistingExperienceChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateExperience(id, { [name]: value });
  };

  const handleExistingCurrentChange = (id: string, checked: boolean) => {
    updateExperience(id, { current: checked, endDate: checked ? '' : cvData.experience.find(exp => exp.id === id)?.endDate || '' });
  };

  return (
    <div className="form-section space-y-6">
      {experience.length > 0 && (
        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.id} className="p-4 rounded-lg border bg-card animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">{exp.title || 'New Experience'}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field space-y-2">
                  <Label htmlFor={`${exp.id}-title`}>Job Title</Label>
                  <Input
                    id={`${exp.id}-title`}
                    name="title"
                    value={exp.title}
                    onChange={(e) => handleExistingExperienceChange(exp.id, e)}
                  />
                </div>
                <div className="form-field space-y-2">
                  <Label htmlFor={`${exp.id}-company`}>Company</Label>
                  <Input
                    id={`${exp.id}-company`}
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExistingExperienceChange(exp.id, e)}
                  />
                </div>
              </div>

              <div className="form-field space-y-2 mb-4">
                <Label htmlFor={`${exp.id}-location`}>Location</Label>
                <Input
                  id={`${exp.id}-location`}
                  name="location"
                  value={exp.location}
                  onChange={(e) => handleExistingExperienceChange(exp.id, e)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field space-y-2">
                  <Label htmlFor={`${exp.id}-startDate`}>Start Date</Label>
                  <Input
                    id={`${exp.id}-startDate`}
                    name="startDate"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleExistingExperienceChange(exp.id, e)}
                  />
                </div>
                <div className="form-field space-y-2">
                  <Label htmlFor={`${exp.id}-endDate`}>End Date</Label>
                  <div className="space-y-2">
                    <Input
                      id={`${exp.id}-endDate`}
                      name="endDate"
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleExistingExperienceChange(exp.id, e)}
                      disabled={exp.current}
                      className={exp.current ? "opacity-50" : ""}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${exp.id}-current`}
                        checked={exp.current}
                        onCheckedChange={(checked) => handleExistingCurrentChange(exp.id, checked)}
                      />
                      <Label htmlFor={`${exp.id}-current`} className="text-sm text-muted-foreground">
                        I currently work here
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor={`${exp.id}-description`}>Description</Label>
                <Textarea
                  id={`${exp.id}-description`}
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleExistingExperienceChange(exp.id, e)}
                  className="resize-none min-h-[100px]"
                />
              </div>
            </div>
          ))}
          <Separator className="my-6" />
        </div>
      )}

      <div className="p-4 rounded-lg border border-dashed bg-card/50">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-muted-foreground" />
          Add Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-field space-y-2">
            <Label htmlFor="new-title">Job Title</Label>
            <Input
              id="new-title"
              name="title"
              value={newExperience.title}
              onChange={handleNewExperienceChange}
              placeholder="Software Engineer"
            />
          </div>
          <div className="form-field space-y-2">
            <Label htmlFor="new-company">Company</Label>
            <Input
              id="new-company"
              name="company"
              value={newExperience.company}
              onChange={handleNewExperienceChange}
              placeholder="Tech Company Inc."
            />
          </div>
        </div>

        <div className="form-field space-y-2 mb-4">
          <Label htmlFor="new-location">Location</Label>
          <Input
            id="new-location"
            name="location"
            value={newExperience.location}
            onChange={handleNewExperienceChange}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-field space-y-2">
            <Label htmlFor="new-startDate">Start Date</Label>
            <Input
              id="new-startDate"
              name="startDate"
              type="month"
              value={newExperience.startDate}
              onChange={handleNewExperienceChange}
            />
          </div>
          <div className="form-field space-y-2">
            <Label htmlFor="new-endDate">End Date</Label>
            <div className="space-y-2">
              <Input
                id="new-endDate"
                name="endDate"
                type="month"
                value={newExperience.endDate}
                onChange={handleNewExperienceChange}
                disabled={newExperience.current}
                className={newExperience.current ? "opacity-50" : ""}
              />
              <div className="flex items-center space-x-2">
                <Switch
                  id="new-current"
                  checked={newExperience.current}
                  onCheckedChange={handleCurrentChange}
                />
                <Label htmlFor="new-current" className="text-sm text-muted-foreground">
                  I currently work here
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-field space-y-2 mb-4">
          <Label htmlFor="new-description">Description</Label>
          <Textarea
            id="new-description"
            name="description"
            value={newExperience.description}
            onChange={handleNewExperienceChange}
            placeholder="Describe your responsibilities and achievements..."
            className="resize-none min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleAddExperience} 
          disabled={!newExperience.title || !newExperience.company || !newExperience.startDate}
          className="mt-2 w-full"
        >
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;