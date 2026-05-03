import type { WorkItem } from '../types/types.ts'

export const largeProjects: WorkItem[] = [
  {
    id: 'dupre-music-designs',
    name: 'Dupre Music Designs',
    route: 'dupre-music-designs',
    image: 'dupre-music-designs.png',
    featured: true,
    prodLink: 'https://dupremusicdesigns.com',
    technologies: ['React', 'Next.js', 'Panda CSS', 'Base UI', 'Strapi CMS'],
    description: 'Official site for Scott Dupre, Arranger and Composer.',
  },
  {
    id: 'yardvark',
    name: 'Yardvark',
    route: 'yardvark',
    image: 'yardvark.png',
    featured: true,
    prodLink: 'https://yardvark.app',
    technologies: [
      'Angular',
      'PrimeNG',
      'Open-Meteo API',
      'MapBox API',
      'Nest.js',
      'Chart.js',
      'TypeScript',
    ],
    description: 'A fully-fledged lawncare tracking app for avid Lawn Care Nuts!',
  },
  {
    id: 'a1-sprinkler-repair',
    name: 'A1 Sprinkler Repair',
    route: 'a1-sprinkler-repair',
    image: 'a1-sprinkler-repair.png',
    featured: true,
    repoLink: 'https://github.com/johnsonav1992/a1-sprinkler-repair',
    prodLink: 'https://www.a1sprinklerrepair.com',
    technologies: ['Astro', 'TypeScript'],
    description:
      'A modern website for a local sprinkler repair company built with Astro and TypeScript.',
  },
  {
    id: 'formularity',
    name: 'Formularity - React Form Library',
    route: 'formularity',
    image: 'formularity_logo_orig.png',
    repoLink: 'https://github.com/johnsonav1992/formularity',
    technologies: ['React', 'TypeScript'],
    description:
      'A React library for building forms with ease! Currently in dev with alpha pre-releases happening frequently!',
  },
  {
    id: 'babybright',
    name: 'BabyBright',
    route: 'babybright',
    image: 'babybright.png',
    videoLink: 'https://www.youtube.com/watch?v=U2v_vwOJ8nI',
    repoLink: 'https://github.com/johnsonav1992/baby-app',
    technologies: [
      'React',
      'ReactRouter',
      'JavaScript',
      'HTML',
      'CSS',
      'Node.js',
      'Express',
      'postgreSQL',
      'Sequelize',
      'JWT',
      'bcrypt',
    ],
    description:
      'A React application for users to track essential daily baby activities such as feedings, diaper changes and sleep.',
    objectPosition: 'left top',
  },
  {
    id: 'cocktailcentral',
    name: 'Cocktail Central App',
    route: 'cocktailcentral',
    image: 'cocktail-central-screenshot.png',
    prodLink: 'https://cocktail-central.up.railway.app/',
    videoLink: 'https://www.youtube.com/watch?v=uLWQw6ePprc',
    technologies: ['JavaScript', 'HTML', 'CSS', 'jQuery', 'Node.js', 'Express', 'postgreSQL'],
    description:
      'A cocktail recipe app for users to find, save, and organize cocktail recipes for an easy drink-mixing experience using the Cocktail DB API.',
  },
]

export const smallProjects: WorkItem[] = [
  {
    id: 'battleship',
    name: 'Battleship',
    route: 'battleship',
    image: 'battleship.png',
    repoLink: 'https://github.com/johnsonav1992/ts-battleship',
    prodLink: 'https://ts-battleship.netlify.app/',
    technologies: ['React', 'TypeScript', 'MUI Joy', 'Jotai'],
    description:
      'A fully-fledged battleship game with a computer AI that can potentially beat human players!',
  },
  {
    id: 'memory-fun',
    name: 'Memory Fun',
    route: 'memory-fun',
    image: 'memory.png',
    prodLink: 'https://memoryfun.netlify.app',
    repoLink: 'https://github.com/johnsonav1992/memory-fun',
    technologies: ['React', 'TypeScript', 'MUI Joy', 'Jotai'],
    description:
      'A fun memory game for one or two players. Can choose between different card sets!',
  },
  {
    id: 'tungsten-carbide',
    name: 'Tungsten Carbide VSC Theme',
    route: 'tungsten-carbide',
    image: 'tungsten-carbide.png',
    prodLink: 'https://marketplace.visualstudio.com/items?itemName=johnsonav.tungsten-carbide',
    repoLink: 'https://github.com/johnsonav1992/tungsten-carbide-vscode-theme',
    technologies: ['JSON', 'VS Code Theming'],
    description: 'My first theme for VS Code - A sleek dark theme with a pop of neon',
    objectPosition: 'left top',
    featured: true,
  },
  {
    id: 'calc',
    name: 'TI-108 Calculator',
    route: 'calc',
    image: 'calc.png',
    prodLink: 'https://ti108.netlify.app/',
    repoLink: 'https://github.com/johnsonav1992/ti-108-calculator',
    technologies: ['React', 'HTML', 'CSS'],
    description:
      'A custom-built replica of the old-school TI-108 school calculator built with React and CSS',
  },
  {
    id: 'reactmetronome',
    name: 'React Metronome',
    route: 'reactmetronome',
    image: 'metronome.png',
    prodLink: 'https://johnson-react-metronome.netlify.app/',
    technologies: ['React', 'HTML', 'CSS'],
    description: 'Working metronome built with React',
  },
  {
    id: 'giffinder',
    name: 'Gif Finder App',
    route: 'giffinder',
    image: 'gif-finder.png',
    prodLink: 'https://johnson-gif-finder.netlify.app/',
    technologies: ['React', 'HTML', 'CSS'],
    description: 'An app that allows a user to search for gifs, powered by the Giphy API.',
  },
  {
    id: 'tictactoe',
    name: 'React Tic Tac Toe',
    route: 'tictactoe',
    image: 'react-tictactoe.png',
    prodLink: 'https://johnson-react-tictactoe.netlify.app/',
    technologies: ['React', 'HTML', 'CSS'],
    description: 'Tic Tac Toe with a React flair!',
  },
  {
    id: 'rps',
    name: 'Rock, Paper, Scissors',
    route: 'rps',
    image: 'rps.png',
    prodLink: 'https://johnson-rockpaperscissors.netlify.app/',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    description:
      'A classic rock, paper, scissors game where a user can play the computer in three-round matches. The game resets after someone has won so it can be played again.',
  },
]

export const projects = [...largeProjects, ...smallProjects]

export const featuredProjects = projects.filter((project) => project.featured)
