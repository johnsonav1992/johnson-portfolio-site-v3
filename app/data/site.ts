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
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/johnsonav1992' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johnsonav/' },
]

export const homeContent = {
  hero: {
    eyebrow: 'Full-stack web developer',
    heading: 'Alex Johnson',
    body: 'I build full-stack web apps with TypeScript, React, Remix, Node.js, and a focus on clean, usable interfaces.',
    primaryAction: { label: 'View Work', href: '#work' },
    secondaryAction: { label: 'Contact', href: '#contact' },
  },
  work: {
    eyebrow: 'Selected work',
    heading: 'A few projects worth highlighting.',
    action: { label: 'More on GitHub', href: 'https://github.com/johnsonav1992' },
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Have a project or role that fits?',
  },
}
