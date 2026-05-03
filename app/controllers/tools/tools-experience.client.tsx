import { clientEntry, type Handle } from 'remix/ui'

import type { ToolCategory } from '../../types/types.ts'
import { ToolCloud } from './cloud/tool-cloud.tsx'
import { ToolsLegend } from './legend/tools-legend.tsx'

type ToolFilter = ToolCategory | 'all'

export const ToolsExperience = clientEntry(
  `${import.meta.url}#ToolsExperience`,
  (handle: Handle) => {
    let activeCategory: ToolFilter = 'all'

    const selectCategory = (category: ToolFilter) => {
      activeCategory = activeCategory === category ? 'all' : category
      handle.update()
    }

    return () => (
      <>
        <ToolsLegend
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
        />
        <ToolCloud
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
        />
      </>
    )
  },
)
