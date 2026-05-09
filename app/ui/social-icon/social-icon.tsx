import type { Handle } from 'remix/ui'

import type { SocialIconName } from '../../types/types.ts'
import { GithubIcon } from './github-icon/github-icon.tsx'
import { LinkedinIcon } from './linkedin-icon/linkedin-icon.tsx'

export const SocialIcon = (handle: Handle<{ name: SocialIconName }>) => {
  return () => {
    const { name } = handle.props

    if (name === 'github') {
      return <GithubIcon />
    }

    return <LinkedinIcon />
  }
}
