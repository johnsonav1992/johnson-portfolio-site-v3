import { Layout } from '../../ui/layout.tsx'
import { Contact } from './contact/contact.tsx'
import { Hero } from './hero/hero.tsx'
import { Projects } from './projects/projects.tsx'

export const HomePage = () => {
  return () => (
    <Layout currentPath='/'>
      <Hero />
      <Projects />
      <Contact />
    </Layout>
  )
}
