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
