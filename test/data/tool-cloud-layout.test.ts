import * as assert from 'remix/assert'
import { it } from 'remix/test'

import { buildToolCloudLayout } from '../../app/data/tool-cloud-layout.ts'
import { tools } from '../../app/data/tools.ts'

it('tool cloud layout includes every tool exactly once', () => {
  const layout = buildToolCloudLayout(tools)
  const ids = layout.positions.map((position) => position.id)
  const react = layout.positions.find((position) => position.id === 'react')
  const typescript = layout.positions.find((position) => position.id === 'typescript')
  const node = layout.positions.find((position) => position.id === 'node')

  assert.equal(layout.positions.length, tools.length)
  assert.equal(new Set(ids).size, tools.length)
  assert.ok(react)

  assert.deepEqual(react, { id: 'react', x: 0, y: 84, size: 170 })
  assert.equal(typescript?.size, 130)
  assert.equal(node?.size, 116)
  assert.ok((typescript?.x ?? 0) < 0)
  assert.ok((node?.x ?? 0) > 0)
  assert.ok((typescript?.y ?? 0) < react.y)
  assert.ok((node?.y ?? 0) < react.y)
})

it('tool cloud layout keeps orbs from overlapping at rest', () => {
  const layout = buildToolCloudLayout(tools)
  const minimumGap = 10
  const roundingTolerance = 1

  for (const [index, position] of layout.positions.entries()) {
    for (const other of layout.positions.slice(index + 1)) {
      const xDistance = position.x - other.x
      const yDistance = position.y - other.y
      const distance = Math.hypot(xDistance, yDistance)
      const minimumDistance = (position.size + other.size) / 2 + minimumGap

      assert.ok(
        distance + roundingTolerance >= minimumDistance,
        `${position.id} overlaps ${other.id}`,
      )
    }
  }
})

it('tool cloud bounds cover the generated positions', () => {
  const layout = buildToolCloudLayout(tools)

  assert.ok(layout.bounds.width >= 1100)
  assert.ok(layout.bounds.height >= 1220)
})
