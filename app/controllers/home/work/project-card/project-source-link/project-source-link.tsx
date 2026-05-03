import { appLink } from '../../../../../theme/styles.ts'
import { GithubIcon } from '../../../../../ui/social-icon/github-icon/github-icon.tsx'
import { projectActionLinkStyle } from '../action-link-styles.ts'

export const ProjectSourceLink = () => {
  return ({ href, projectName }: { href: string; projectName: string }) => (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      aria-label={`${projectName} source code on GitHub`}
      data-tooltip='Source'
      mix={[appLink, projectActionLinkStyle]}
    >
      <GithubIcon />
    </a>
  )
}
