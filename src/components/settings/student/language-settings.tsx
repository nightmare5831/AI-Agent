"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languageLevels, languageSkills } from "@/lib/data/language-levels"
import { Progress } from "@/components/ui/progress"

export function StudentLanguageSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Language Proficiency</h2>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Current CEFR Level</Label>
              <Select defaultValue="b1">
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {languageLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Language Skills Progress</Label>
              {languageSkills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{skill.label}</span>
                    <span className="text-muted-foreground">{skill.level}</span>
                  </div>
                  <Progress value={skill.progress} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Update Level</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}