
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useCV, Skill } from '@/context/CVContext';

const SkillsForm = () => {
  const { cvData, addSkill, updateSkill, removeSkill } = useCV();
  const { skills } = cvData;

  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 3,
  });

  const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewSkillLevelChange = (value: number[]) => {
    setNewSkill((prev) => ({ ...prev, level: value[0] }));
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({
        name: '',
        level: 3,
      });
    }
  };

  const handleExistingSkillChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    updateSkill(id, { [name]: value });
  };

  const handleExistingSkillLevelChange = (id: string, value: number[]) => {
    updateSkill(id, { level: value[0] });
  };

  return (
    <div className="form-section space-y-6">
      {skills.length > 0 && (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 rounded-lg border bg-card animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="form-field flex-1 mr-4">
                  <Label htmlFor={`${skill.id}-name`} className="sr-only">
                    Skill Name
                  </Label>
                  <Input
                    id={`${skill.id}-name`}
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleExistingSkillChange(skill.id, e)}
                    placeholder="Skill name"
                    className="border-none pl-0 text-base font-medium"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(skill.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[skill.level]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleExistingSkillLevelChange(skill.id, value)}
                    className="mt-2"
                  />
                </div>
                <div className="w-12 text-center text-sm text-muted-foreground">
                  {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                </div>
              </div>
            </div>
          ))}
          <Separator className="my-6" />
        </div>
      )}

      <div className="p-4 rounded-lg border border-dashed bg-card/50">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-muted-foreground" />
          Add Skill
        </h3>

        <div className="form-field space-y-2 mb-4">
          <Label htmlFor="new-skill-name">Skill Name</Label>
          <Input
            id="new-skill-name"
            name="name"
            value={newSkill.name}
            onChange={handleNewSkillChange}
            placeholder="e.g. JavaScript, Project Management, etc."
          />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <Label htmlFor="new-skill-level">Proficiency Level</Label>
            <span className="text-sm text-muted-foreground">
              {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][newSkill.level - 1]}
            </span>
          </div>
          <Slider
            id="new-skill-level"
            value={[newSkill.level]}
            min={1}
            max={5}
            step={1}
            onValueChange={handleNewSkillLevelChange}
            className="mt-2"
          />
        </div>

        <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()} className="w-full">
          Add Skill
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;