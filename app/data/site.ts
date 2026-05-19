import { routes } from '../routes.ts'
import type { SocialLink } from '../types/types.ts'

export const site = {
  name: 'Alex Johnson',
  title: 'Alex Johnson - Web Developer',
  description:
    'Portfolio for Alex Johnson, a full-stack web developer building resilient, useful web software.',
  tagline: 'Full-stack developer',
  businessName: 'AJ Web Development',
  email: 'johnsonav1992@gmail.com',
  logo: {
    image: 'logo-icon.svg',
    alt: 'AJ Web Development logo',
  },
  portrait: {
    image: 'headshot-transparent-bg.png',
    alt: 'Alex Johnson',
  },
}

export const navigation = [
  {
    label: 'Tools',
    href: routes.tools.href(),
  },
  {
    label: 'Projects',
    href: routes.projects.index.href(),
  },
  {
    label: 'Contact',
    href: routes.contact.index.href(),
  },
]

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/johnsonav1992',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/johnsonav/',
    icon: 'linkedin',
  },
]

export const homeContent = {
  hero: {
    eyebrow: 'Full-stack web developer',
    heading: 'Alex Johnson',
    body: 'Fullstack developer building modern applications for the web with AI integration and a focus on performance and powerful user experiences.',
    primaryAction: {
      label: 'View Projects',
      href: '#projects',
    },
    secondaryAction: {
      label: 'Contact',
      href: routes.contact.index.href(),
    },
  },
  projects: {
    eyebrow: 'Selected projects',
    heading: 'A few projects worth highlighting.',
    action: {
      label: 'View all projects',
      href: routes.projects.index.href(),
    },
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Looking to bring your project to life?',
  },
}

export const notFoundContent = {
  title: 'Page not found - Alex Johnson',
  eyebrow: '404',
  heading: 'Looks like this page slipped away.',
  body: 'That link does not lead anywhere right now. You can head back home or jump into the projects that are still very much online.',
  primaryAction: {
    label: 'Go home',
    href: routes.home.href(),
  },
  secondaryAction: {
    label: 'View projects',
    href: routes.projects.index.href(),
  },
}
