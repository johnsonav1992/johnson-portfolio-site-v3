import { tools } from './tools.ts'

const technologyLogoAliases: Record<string, string> = {
  mui: 'MUI',
  muijoy: 'MUI',
  postgresql: 'PostgreSQL',
  vscode: 'VS Code',
  vscodetheming: 'VS Code',
}

const normalizeTechnologyName = (technology: string) => {
  return technology.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const toolLogoByName = new Map(
  tools
    .filter((tool) => tool.image)
    .map((tool) => [normalizeTechnologyName(tool.name), tool.image as string]),
)

export const getTechnologyLogo = (technology: string) => {
  const normalizedTechnology = normalizeTechnologyName(technology)
  const aliasedTechnology = technologyLogoAliases[normalizedTechnology]

  if (aliasedTechnology) {
    return toolLogoByName.get(normalizeTechnologyName(aliasedTechnology))
  }

  return toolLogoByName.get(normalizedTechnology)
}
