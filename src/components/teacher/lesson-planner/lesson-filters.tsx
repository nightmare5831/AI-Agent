"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LessonFilters() {
  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Class</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="class1">Class 1</SelectItem>
              <SelectItem value="class2">Class 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Skills Focus</Label>
          <RadioGroup defaultValue="all">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-skills" />
                <Label htmlFor="all-skills">All Skills</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oral" id="oral" />
                <Label htmlFor="oral">Oral Skills</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="written" id="written" />
                <Label htmlFor="written">Written Skills</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Duration</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Duration</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}