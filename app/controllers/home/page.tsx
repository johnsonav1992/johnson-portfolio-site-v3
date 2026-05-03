import { Layout } from '../../ui/layout.tsx'
import { Contact } from './contact/contact.tsx'
import { Hero } from './hero/hero.tsx'
import { Work } from './work/work.tsx'

export const HomePage = () => {
  return () => (
    <Layout>
      <Hero />
      <Work />
      <Contact />
    </Layout>
  )
}
