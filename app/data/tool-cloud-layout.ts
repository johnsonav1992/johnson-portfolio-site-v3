import type { ToolCategory, ToolItem } from '../types/types.ts'

export interface ToolCloudPosition {
  id: string
  x: number
  y: number
  size: number
}

export interface ToolCloudBounds {
  width: number
  height: number
}

interface ToolCloudLayout {
  bounds: ToolCloudBounds
  positions: ToolCloudPosition[]
}

interface PositionedTool extends ToolCloudPosition {
  isPinned?: boolean
  targetRadius: number
}

const featuredToolLayout = [
  {
    id: 'react',
    x: 0,
    y: 84,
  },
  {
    id: 'typescript',
    x: -88,
    y: -48,
  },
  {
    id: 'node',
    x: 88,
    y: -48,
  },
]
const categoryOrder: ToolCategory[] = ['frontend', 'backend', 'data', 'tooling']

const desktopLayout = {
  angleJitterRatio: 0.12,
  gapJitter: 10,
  hoverScale: 1.44,
  innerRingInwardLimit: 8,
  itemGap: 14,
  minHeight: 1220,
  minRingItems: 6,
  minWidth: 1100,
  radialJitter: 36,
  relaxationPasses: 36,
  ringGap: 44,
  ringStartRadius: 214,
  ringStaggerDivisor: 2,
  settleStrength: 0.06,
  verticalScale: 1.04,
}

const hashValue = (value: string) => {
  let hash = 0

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }

  return hash
}

const getCenteredUnit = (value: string) => {
  const hash = hashValue(value)

  return hash / 0xffffffff - 0.5
}

const buildCategorySequence = (tools: ToolItem[]) => {
  const buckets = new Map<ToolCategory, ToolItem[]>(
    categoryOrder.map((category) => [category, tools.filter((tool) => tool.category === category)]),
  )

  const orderedTools: ToolItem[] = []

  while (true) {
    let didAddTool = false

    for (const category of categoryOrder) {
      const tool = buckets.get(category)?.shift()

      if (!tool) {
        continue
      }

      orderedTools.push(tool)
      didAddTool = true
    }

    if (!didAddTool) {
      return orderedTools
    }
  }
}

const buildRing = (tools: ToolItem[], radius: number) => {
  const circumference = Math.PI * 2 * radius
  const ringTools: ToolItem[] = []
  let occupiedArc = 0

  for (const tool of tools) {
    const arcLength = tool.size + desktopLayout.itemGap
    const nextOccupiedArc = occupiedArc + arcLength

    if (ringTools.length >= desktopLayout.minRingItems && nextOccupiedArc > circumference) {
      break
    }

    ringTools.push(tool)
    occupiedArc = nextOccupiedArc
  }

  return ringTools
}

const rebalanceRings = (rings: ToolItem[][]) => {
  for (let index = rings.length - 2; index >= 0; index -= 1) {
    const currentRing = rings[index]
    const nextRing = rings[index + 1]

    while (currentRing.length > nextRing.length) {
      const tool = currentRing.pop()

      if (!tool) {
        break
      }

      nextRing.unshift(tool)
    }
  }

  return rings
}

const getBounds = (positions: ToolCloudPosition[]): ToolCloudBounds => {
  const orbPadding = 36
  const labelPadding = 58
  const hoverScale = desktopLayout.hoverScale

  let left = 0
  let right = 0
  let top = 0
  let bottom = 0

  for (const position of positions) {
    const hoveredRadius = (position.size * hoverScale) / 2

    left = Math.min(left, position.x - hoveredRadius - orbPadding)
    right = Math.max(right, position.x + hoveredRadius + orbPadding)
    top = Math.min(top, position.y - hoveredRadius - orbPadding)
    bottom = Math.max(bottom, position.y + hoveredRadius + labelPadding)
  }

  return {
    width: Math.max(desktopLayout.minWidth, Math.ceil(right - left)),
    height: Math.max(desktopLayout.minHeight, Math.ceil(bottom - top)),
  }
}

const resolveOverlaps = (positions: PositionedTool[]) => {
  for (let pass = 0; pass < desktopLayout.relaxationPasses; pass += 1) {
    for (const [index, position] of positions.entries()) {
      for (const other of positions.slice(index + 1)) {
        const xDistance = other.x - position.x
        const yDistance = other.y - position.y
        const distance = Math.hypot(xDistance, yDistance) || 1
        const minimumDistance = (position.size + other.size) / 2 + 10
        const overlap = minimumDistance - distance

        if (overlap <= 0) {
          continue
        }

        const pushX = (xDistance / distance) * overlap
        const pushY = (yDistance / distance) * overlap

        if (position.isPinned) {
          other.x += pushX
          other.y += pushY
          continue
        }

        if (other.isPinned) {
          position.x -= pushX
          position.y -= pushY
          continue
        }

        position.x -= pushX / 2
        position.y -= pushY / 2
        other.x += pushX / 2
        other.y += pushY / 2
      }
    }

    for (const position of positions) {
      if (position.isPinned) {
        continue
      }

      const angle = Math.atan2(position.y / desktopLayout.verticalScale, position.x)
      const targetX = Math.cos(angle) * position.targetRadius
      const targetY = Math.sin(angle) * position.targetRadius * desktopLayout.verticalScale

      position.x += (targetX - position.x) * desktopLayout.settleStrength
      position.y += (targetY - position.y) * desktopLayout.settleStrength
    }
  }

  return positions.map(({ id, size, x, y }) => ({
    id,
    x: Math.round(x),
    y: Math.round(y),
    size,
  }))
}

export const buildToolCloudLayout = (tools: ToolItem[]): ToolCloudLayout => {
  const featuredIds = new Set(featuredToolLayout.map(({ id }) => id))
  const remainingTools = buildCategorySequence(tools.filter((tool) => !featuredIds.has(tool.id)))
  const positions: PositionedTool[] = featuredToolLayout.flatMap(({ id, x, y }) => {
    const tool = tools.find((item) => item.id === id)

    if (!tool) {
      return []
    }

    return [
      {
        id: tool.id,
        isPinned: true,
        targetRadius: Math.hypot(x, y / desktopLayout.verticalScale),
        x,
        y,
        size: tool.size,
      },
    ]
  })
  let cursor = 0
  let radius = desktopLayout.ringStartRadius
  const rings: ToolItem[][] = []

  while (cursor < remainingTools.length) {
    const ringTools = buildRing(remainingTools.slice(cursor), radius)
    rings.push(ringTools)
    cursor += ringTools.length
    radius += Math.max(...ringTools.map((tool) => tool.size)) + desktopLayout.ringGap
  }

  radius = desktopLayout.ringStartRadius

  for (const [ringIndex, ringTools] of rebalanceRings(rings).entries()) {
    const averageAngleSpan = (Math.PI * 2) / ringTools.length
    const offset =
      -Math.PI / 2 +
      ((ringIndex % desktopLayout.ringStaggerDivisor) * averageAngleSpan) / 2 +
      getCenteredUnit(`ring-offset-${ringIndex}`) * 0.28
    const weightedSpans = ringTools.map((tool) => {
      const jitter = getCenteredUnit(`${tool.id}-gap-${ringIndex}`) * desktopLayout.gapJitter

      return Math.max(tool.size + desktopLayout.itemGap + jitter, tool.size + 8)
    })
    const totalWeightedSpan = weightedSpans.reduce((sum, span) => sum + span, 0)
    let consumedRatio = 0

    for (const [itemIndex, tool] of ringTools.entries()) {
      const angleJitter =
        getCenteredUnit(`${tool.id}-angle-${ringIndex}`) *
        averageAngleSpan *
        desktopLayout.angleJitterRatio
      const radialJitter =
        getCenteredUnit(`${tool.id}-radius-${ringIndex}`) * desktopLayout.radialJitter
      const radialOffset =
        ringIndex === 0 ? Math.max(radialJitter, -desktopLayout.innerRingInwardLimit) : radialJitter
      const spanRatio = weightedSpans[itemIndex] / totalWeightedSpan
      const toolRadius = radius + radialOffset
      const angle = offset + (consumedRatio + spanRatio / 2) * Math.PI * 2 + angleJitter

      positions.push({
        id: tool.id,
        targetRadius: toolRadius,
        x: Math.cos(angle) * toolRadius,
        y: Math.sin(angle) * toolRadius * desktopLayout.verticalScale,
        size: tool.size,
      })

      consumedRatio += spanRatio
    }

    radius += Math.max(...ringTools.map((tool) => tool.size)) + desktopLayout.ringGap
  }

  const settledPositions = resolveOverlaps(positions)

  return {
    positions: settledPositions,
    bounds: getBounds(settledPositions),
  }
}
