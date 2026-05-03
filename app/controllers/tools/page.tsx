import { toolsContent } from '../../data/tools.ts'
import { Layout } from '../../ui/layout.tsx'
import { ToolCloud } from './cloud/tool-cloud.tsx'
import { ToolsHero } from './hero/tools-hero.tsx'

export const ToolsPage = () => {
  return () => (
    <Layout
      currentPath='/tools'
      title={toolsContent.title}
    >
      <ToolsHero />
      <ToolCloud />
    </Layout>
  )
}
