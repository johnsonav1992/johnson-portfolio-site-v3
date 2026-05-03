import { css } from 'remix/ui'
import { Glyph } from 'remix/ui/glyph'

import { appLink } from '../../../../../theme/styles.ts'
import { projectActionLinkStyle } from '../action-link-styles.ts'

export function ProjectLiveLink() {
  return ({ href, projectName }: { href: string; projectName: string }) => (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      aria-label={`Open ${projectName} live site`}
      data-tooltip='Live site'
      mix={[appLink, projectActionLinkStyle]}
    >
      <Glyph
        name='open'
        aria-hidden='true'
        mix={css({
          width: '17px',
          height: '17px',
          flex: '0 0 auto',
        })}
      />
    </a>
  )
}
