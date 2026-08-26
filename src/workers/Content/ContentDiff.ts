/**
 * Workers - Content Diff
 */

import type { SchemaPage } from '../../schema/schemaTypes.js'
import { serializePage } from './ContentGithub.js'

/**
 * Most changed lines shown before the diff is replaced by a summary.
 *
 * @type {number}
 */
const diffMaxLines: number = 400

/**
 * Lines of unchanged content kept either side of a change.
 *
 * @type {number}
 */
const diffContext: number = 2

/**
 * Longest common subsequence of two line ranges, as a set of matched pairs.
 *
 * @param {string[]} a
 * @param {string[]} b
 * @return {number[][]}
 */
const getCommonLines = (a: string[], b: string[]): number[][] => {
  const rows = a.length
  const cols = b.length
  const table: number[][] = Array.from({ length: rows + 1 }, () => new Array<number>(cols + 1).fill(0))

  for (let i = rows - 1; i >= 0; i -= 1) {
    const row = table[i]
    const next = table[i + 1]

    if (!row || !next) {
      continue
    }

    for (let j = cols - 1; j >= 0; j -= 1) {
      row[j] = a[i] === b[j] ? (next[j + 1] ?? 0) + 1 : Math.max(next[j] ?? 0, row[j + 1] ?? 0)
    }
  }

  const pairs: number[][] = []

  let i = 0
  let j = 0

  while (i < rows && j < cols) {
    if (a[i] === b[j]) {
      pairs.push([i, j])
      i += 1
      j += 1
      continue
    }

    if ((table[i + 1]?.[j] ?? 0) >= (table[i]?.[j + 1] ?? 0)) {
      i += 1
    } else {
      j += 1
    }
  }

  return pairs
}

/**
 * A unified diff between two versions of a page, compared as formatted JSON.
 *
 * @param {SchemaPage|undefined} before
 * @param {SchemaPage} after
 * @return {string}
 */
const getPageDiff = (before: SchemaPage | undefined, after: SchemaPage): string => {
  if (!before) {
    return 'This page is new, so everything in it is an addition.'
  }

  const a = serializePage(before).split('\n')
  const b = serializePage(after).split('\n')

  /* Trim the parts that match, from both ends */

  let head = 0

  while (head < a.length && head < b.length && a[head] === b[head]) {
    head += 1
  }

  let tail = 0

  while (
    tail < a.length - head &&
    tail < b.length - head &&
    a[a.length - 1 - tail] === b[b.length - 1 - tail]
  ) {
    tail += 1
  }

  const aMid = a.slice(head, a.length - tail)
  const bMid = b.slice(head, b.length - tail)

  if (!aMid.length && !bMid.length) {
    return 'Nothing changed.'
  }

  if (aMid.length + bMid.length > diffMaxLines * 2) {
    return `This change is too large to show line by line — ${aMid.length} lines replaced by ${bMid.length}. Open the preview to see it.`
  }

  /* Walk the matched pairs, turning what falls between them into edits */

  const pairs = getCommonLines(aMid, bMid)
  const ops: string[] = []

  let ai = 0
  let bi = 0

  for (const pair of [...pairs, [aMid.length, bMid.length]]) {
    const [aEnd, bEnd] = pair as [number, number]

    for (const line of aMid.slice(ai, aEnd)) {
      ops.push(`- ${line}`)
    }

    for (const line of bMid.slice(bi, bEnd)) {
      ops.push(`+ ${line}`)
    }

    if (aEnd < aMid.length) {
      ops.push(`  ${aMid[aEnd] ?? ''}`)
    }

    ai = aEnd + 1
    bi = bEnd + 1
  }

  /* Keep only what sits near a change */

  const keep = new Set<number>()

  ops.forEach((op, index) => {
    if (op.startsWith('  ')) {
      return
    }

    for (let i = index - diffContext; i <= index + diffContext; i += 1) {
      keep.add(i)
    }
  })

  const lines: string[] = []

  let skipped = false

  ops.forEach((op, index) => {
    if (!keep.has(index)) {
      skipped = true
      return
    }

    if (skipped) {
      lines.push('  …')
      skipped = false
    }

    lines.push(op)
  })

  return lines.join('\n')
}

export { getPageDiff }
