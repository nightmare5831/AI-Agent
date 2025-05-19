"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, BookOpen } from "lucide-react"

export function LessonActivitiesForm() {
  const [activities, setActivities] = useState([{ id: '1' }])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.div 
      className="space-y-6 pt-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      {activities.map((activity, index) => (
        <motion.div key={activity.id} variants={itemVariants}>
          <Card className="p-4 border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <BookOpen className="h-5 w-5 text-[#9333ea]" />
                </motion.div>
                <h3 className="text-lg font-semibold gradient-text">Activity {index + 1}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#8b5cf6] font-medium">Activity Title</Label>
                  <Input placeholder="Enter activity title" className="border-[#9333ea]/30 focus-visible:ring-[#9333ea]/50" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#8b5cf6] font-medium">Duration (minutes)</Label>
                  <Input type="number" min="1" className="border-[#9333ea]/30 focus-visible:ring-[#9333ea]/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#8b5cf6] font-medium">Activity Type</Label>
                <Select>
                  <SelectTrigger className="border-[#9333ea]/30 focus-visible:ring-[#9333ea]/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warmup">Warm-up</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#8b5cf6] font-medium">Instructions</Label>
                <Textarea placeholder="Enter activity instructions" className="border-[#9333ea]/30 focus-visible:ring-[#9333ea]/50" />
              </div>

              <div className="space-y-2">
                <Label className="text-[#8b5cf6] font-medium">Grouping</Label>
                <Select>
                  <SelectTrigger className="border-[#9333ea]/30 focus-visible:ring-[#9333ea]/50">
                    <SelectValue placeholder="Select grouping" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="pairs">Pairs</SelectItem>
                    <SelectItem value="small-groups">Small Groups</SelectItem>
                    <SelectItem value="whole-class">Whole Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button 
            variant="outline" 
            className="w-full border-[#ec4899]/30 text-[#ec4899] hover:bg-[#ec4899]/10 hover:text-[#ec4899] hover:border-[#ec4899]/50 transition-all duration-300"
            onClick={() => setActivities([...activities, { id: String(activities.length + 1) }])}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}