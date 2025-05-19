"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "@/types/progress"
import { formatDistanceToNow } from "date-fns"
import { BookOpen, Trophy, PenTool, GraduationCap, Clock, Activity as ActivityIcon } from "lucide-react"
import { motion } from "framer-motion"

export function RecentActivities() {
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const activities: Activity[] = [
    {
      id: "1",
      type: "quiz",
      title: "Vocabulary Quiz",
      description: "Travel vocabulary mastery",
      timestamp: new Date("2024-01-30T10:00:00"),
      score: 85,
      xpGained: 100
    },
    {
      id: "2",
      type: "practice",
      title: "Speaking Practice",
      description: "Conversation simulation",
      timestamp: new Date("2024-01-29T15:30:00"),
      xpGained: 50
    },
    {
      id: "3",
      type: "achievement",
      title: "Streak Master",
      description: "15 days study streak",
      timestamp: new Date("2024-01-29T09:00:00"),
      xpGained: 200
    }
  ]

  const getActivityIcon = (type: Activity["type"]) => {
    const icons = {
      assignment: BookOpen,
      quiz: PenTool,
      practice: GraduationCap,
      achievement: Trophy
    }
    return icons[type]
  }
  
  const getActivityColor = (type: Activity["type"]) => {
    const colors = {
      assignment: "#63B3ED",
      quiz: "#8b5cf6",
      practice: "#ec4899",
      achievement: "#d32f2f"
    }
    return colors[type] || "#63B3ED"
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
    <Card className="border border-[#d32f2f]/10 bg-background/80 backdrop-blur-sm shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-[#d32f2f]/10 p-2"
          >
            <ActivityIcon className="h-5 w-5 text-[#d32f2f]" />
          </motion.div>
          <CardTitle className="text-xl font-bold gradient-text">Recent Activities</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-5" variants={containerVariants}>
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type)
          return (
            <motion.div 
              key={activity.id} 
              className="flex items-start gap-3 p-3 rounded-lg border border-[#63B3ED]/10 hover:border-[#63B3ED]/30 transition-colors duration-300 group"
              variants={itemVariants}
              whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <motion.div 
                className={`rounded-full bg-[${getActivityColor(activity.type)}]/10 p-2 mt-1`}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Icon className={`h-4 w-4 text-[${getActivityColor(activity.type)}]`} />
              </motion.div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between group-hover:translate-x-1 transition-transform duration-300">
                  <div>
                    <motion.h3 
                      className="font-medium text-[#8b5cf6] group-hover:text-[#63B3ED] transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      {activity.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {activity.description}
                    </motion.p>
                  </div>
                  {activity.score && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Badge variant="outline" className={`bg-[${getActivityColor(activity.type)}]/10 text-[${getActivityColor(activity.type)}] border-[${getActivityColor(activity.type)}]/20 px-2 py-0.5`}>
                        {activity.score}%
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#d32f2f]" />
                    <motion.span 
                      className="text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </motion.span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <motion.span
                    className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#63B3ED]/10 text-[#63B3ED]"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    +{activity.xpGained} XP
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )
        })}
        </motion.div>
      </CardContent>
    </Card>
    </motion.div>
  )
}