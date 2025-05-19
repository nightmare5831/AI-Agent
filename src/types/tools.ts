export type ToolCategory = 
  | "assessment"
  | "content-creation"
  | "collaboration"
  | "classroom-management"
  | "productivity"

export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  icon: string
  url: string
  isPremium: boolean
}