import { css } from 'remix/ui'

import { mediaPath } from '../../../../data/media.ts'
import { site } from '../../../../data/site.ts'

export function Portrait() {
  return () => (
    <div
      mix={css({
        alignSelf: 'end',
        justifySelf: 'center',
        width: 'min(100%, 500px)',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '@media (max-width: 880px)': {
          minHeight: '320px',
          maxWidth: '430px',
        },
      })}
    >
      <img
        src={mediaPath(site.portrait.image)}
        alt={site.portrait.alt}
        mix={css({
          position: 'relative',
          zIndex: 1,
          display: 'block',
          width: 'min(100%, 470px)',
          height: 'auto',
          filter: 'drop-shadow(0 22px 34px rgba(0, 0, 0, 0.48))',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 76%, rgba(0, 0, 0, 0.72) 87%, transparent 100%)',
        })}
      />
    </div>
  )
}
