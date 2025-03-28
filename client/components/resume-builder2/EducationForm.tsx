
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, GraduationCap } from 'lucide-react';
import { useCV, Education } from '@/context/CVContext';

const EducationForm = () => {
  const { cvData, addEducation, updateEducation, removeEducation } = useCV();
  const { education } = cvData;

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const handleNewEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentChange = (checked: boolean) => {
    setNewEducation((prev) => ({ ...prev, current: checked, endDate: checked ? '' : prev.endDate }));
  };

  const handleAddEducation = () => {
    addEducation(newEducation);
    setNewEducation({
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  const handleExistingEducationChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value });
  };

  const handleExistingCurrentChange = (id: string, checked: boolean) => {
    updateEducation(id, { current: checked, endDate: checked ? '' : cvData.education.find(edu => edu.id === id)?.endDate || '' });
  };

  return (
    <div className="form-section space-y-6">
      {education.length > 0 && (
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="p-4 rounded-lg border bg-card animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">{edu.degree || 'New Education'}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field space-y-2">
                  <Label htmlFor={`${edu.id}-degree`}>Degree</Label>
                  <Input
                    id={`${edu.id}-degree`}
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleExistingEducationChange(edu.id, e)}
                  />
                </div>
                <div className="form-field space-y-2">
                  <Label htmlFor={`${edu.id}-institution`}>Institution</Label>
                  <Input
                    id={`${edu.id}-institution`}
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleExistingEducationChange(edu.id, e)}
                  />
                </div>
              </div>

              <div className="form-field space-y-2 mb-4">
                <Label htmlFor={`${edu.id}-location`}>Location</Label>
                <Input
                  id={`${edu.id}-location`}
                  name="location"
                  value={edu.location}
                  onChange={(e) => handleExistingEducationChange(edu.id, e)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field space-y-2">
                  <Label htmlFor={`${edu.id}-startDate`}>Start Date</Label>
                  <Input
                    id={`${edu.id}-startDate`}
                    name="startDate"
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => handleExistingEducationChange(edu.id, e)}
                  />
                </div>
                <div className="form-field space-y-2">
                  <Label htmlFor={`${edu.id}-endDate`}>End Date</Label>
                  <div className="space-y-2">
                    <Input
                      id={`${edu.id}-endDate`}
                      name="endDate"
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleExistingEducationChange(edu.id, e)}
                      disabled={edu.current}
                      className={edu.current ? "opacity-50" : ""}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${edu.id}-current`}
                        checked={edu.current}
                        onCheckedChange={(checked) => handleExistingCurrentChange(edu.id, checked)}
                      />
                      <Label htmlFor={`${edu.id}-current`} className="text-sm text-muted-foreground">
                        I am currently studying here
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor={`${edu.id}-description`}>Description</Label>
                <Textarea
                  id={`${edu.id}-description`}
                  name="description"
                  value={edu.description}
                  onChange={(e) => handleExistingEducationChange(edu.id, e)}
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
          Add Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-field space-y-2">
            <Label htmlFor="new-degree">Degree</Label>
            <Input
              id="new-degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleNewEducationChange}
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
          <div className="form-field space-y-2">
            <Label htmlFor="new-institution">Institution</Label>
            <Input
              id="new-institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleNewEducationChange}
              placeholder="University of California"
            />
          </div>
        </div>

        <div className="form-field space-y-2 mb-4">
          <Label htmlFor="new-location">Location</Label>
          <Input
            id="new-location"
            name="location"
            value={newEducation.location}
            onChange={handleNewEducationChange}
            placeholder="Berkeley, CA"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-field space-y-2">
            <Label htmlFor="new-startDate">Start Date</Label>
            <Input
              id="new-startDate"
              name="startDate"
              type="month"
              value={newEducation.startDate}
              onChange={handleNewEducationChange}
            />
          </div>
          <div className="form-field space-y-2">
            <Label htmlFor="new-endDate">End Date</Label>
            <div className="space-y-2">
              <Input
                id="new-endDate"
                name="endDate"
                type="month"
                value={newEducation.endDate}
                onChange={handleNewEducationChange}
                disabled={newEducation.current}
                className={newEducation.current ? "opacity-50" : ""}
              />
              <div className="flex items-center space-x-2">
                <Switch
                  id="new-current"
                  checked={newEducation.current}
                  onCheckedChange={handleCurrentChange}
                />
                <Label htmlFor="new-current" className="text-sm text-muted-foreground">
                  I am currently studying here
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
            value={newEducation.description}
            onChange={handleNewEducationChange}
            placeholder="Describe your studies, achievements, and relevant coursework..."
            className="resize-none min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleAddEducation} 
          disabled={!newEducation.degree || !newEducation.institution || !newEducation.startDate}
          className="mt-2 w-full"
        >
          Add Education
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;