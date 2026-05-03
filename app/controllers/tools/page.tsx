import { toolsContent } from '../../data/tools.ts'
import { Layout } from '../../ui/layout.tsx'
import { ToolsHero } from './hero/tools-hero.tsx'
import { ToolsExperience } from './tools-experience.client.tsx'

export const ToolsPage = () => {
  return () => (
    <Layout title={toolsContent.title}>
      <ToolsHero />
      <ToolsExperience />
    </Layout>
  )
}
