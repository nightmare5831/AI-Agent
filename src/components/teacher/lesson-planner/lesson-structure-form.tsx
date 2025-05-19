"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export function LessonStructureForm() {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <Label>Lesson Structure Type</Label>
        <RadioGroup defaultValue="scripted">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scripted" id="scripted" />
            <Label htmlFor="scripted">Scripted</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unscripted" id="unscripted" />
            <Label htmlFor="unscripted">Unscripted</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="has-ritual" />
          <Label htmlFor="has-ritual">Include Opening Ritual</Label>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Introduction Type</Label>
        <RadioGroup defaultValue="text">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text">Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video" />
              <Label htmlFor="video">Video</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="audio" id="audio" />
              <Label htmlFor="audio">Audio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="image" id="image" />
              <Label htmlFor="image">Image</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}