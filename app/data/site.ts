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
    href: '/tools',
  },
  {
    label: 'Work',
    href: '/#work',
  },
  {
    label: 'Contact',
    href: '/#contact',
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
    body: 'Fullstack developer building modern applications for the web with AI integration and a focus on performance and a powerful user experience.',
    primaryAction: {
      label: 'View Work',
      href: '#work',
    },
    secondaryAction: {
      label: 'Contact',
      href: '#contact',
    },
  },
  work: {
    eyebrow: 'Selected work',
    heading: 'A few projects worth highlighting.',
    action: {
      label: 'More on GitHub',
      href: 'https://github.com/johnsonav1992',
    },
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Looking to bring your project to life?',
  },
}
