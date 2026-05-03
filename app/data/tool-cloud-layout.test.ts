import assert from 'node:assert/strict'
import test from 'node:test'

import { buildToolCloudLayout } from './tool-cloud-layout.ts'
import { tools } from './tools.ts'

test('tool cloud layout includes every tool exactly once', () => {
  const layout = buildToolCloudLayout(tools)
  const ids = layout.positions.map((position) => position.id)
  const react = layout.positions.find((position) => position.id === 'react')
  const typescript = layout.positions.find((position) => position.id === 'typescript')
  const node = layout.positions.find((position) => position.id === 'node')

  assert.equal(layout.positions.length, tools.length)
  assert.equal(new Set(ids).size, tools.length)

  assert.deepEqual(react, {
    id: 'react',
    x: 0,
    y: 100,
    size: 138,
  })
  assert.deepEqual(typescript, {
    id: 'typescript',
    x: -96,
    y: -52,
    size: 116,
  })
  assert.deepEqual(node, {
    id: 'node',
    x: 96,
    y: -52,
    size: 116,
  })
})

test('tool cloud layout keeps orbs from overlapping at rest', () => {
  const layout = buildToolCloudLayout(tools)
  const minimumGap = 10

  for (const [index, position] of layout.positions.entries()) {
    for (const other of layout.positions.slice(index + 1)) {
      const xDistance = position.x - other.x
      const yDistance = position.y - other.y
      const distance = Math.hypot(xDistance, yDistance)
      const minimumDistance = (position.size + other.size) / 2 + minimumGap

      assert.ok(distance >= minimumDistance, `${position.id} overlaps ${other.id}`)
    }
  }
})

test('tool cloud bounds cover the generated positions', () => {
  const layout = buildToolCloudLayout(tools)

  assert.ok(layout.bounds.width >= 1100)
  assert.ok(layout.bounds.height >= 1220)
})
