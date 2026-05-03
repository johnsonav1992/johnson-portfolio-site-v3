import { toolsContent } from '../../data/tools.ts'
import { Layout } from '../../ui/layout.tsx'
import { ToolCloud } from './cloud/tool-cloud.tsx'
import { ToolsHero } from './hero/tools-hero.tsx'
import { ToolsLegend } from './legend/tools-legend.tsx'

export function ToolsPage() {
  return () => (
    <Layout title={toolsContent.title}>
      <ToolsHero />
      <ToolCloud />
      <ToolsLegend />
    </Layout>
  )
}
