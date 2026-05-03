import type { SocialIconName } from '../../types/types.ts'
import { GithubIcon } from './github-icon/github-icon.tsx'
import { LinkedinIcon } from './linkedin-icon/linkedin-icon.tsx'

export function SocialIcon() {
  return ({ name }: { name: SocialIconName }) => {
    if (name === 'github') {
      return <GithubIcon />
    }

    return <LinkedinIcon />
  }
}
