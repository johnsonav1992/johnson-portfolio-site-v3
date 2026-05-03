export interface WorkItem {
  id: string
  name: string
  route: string
  image: string
  /**
   * Optional field to mark featured projects that should be highlighted on the homepage
   */
  featured?: boolean
  prodLink?: string
  repoLink?: string
  videoLink?: string
  technologies: string[]
  description: string
  objectPosition?: string
}

export type SocialIconName = 'github' | 'linkedin'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIconName
}

export type ToolCategory = 'frontend' | 'backend' | 'data' | 'tooling'

export interface ToolItem {
  id: string
  name: string
  category: ToolCategory
  image?: string
  monogram?: string
  size: number
  lift: number
  tilt: number
  glow: string
}
