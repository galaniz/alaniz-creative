/**
 * Schema - Parse
 */

import type { SchemaIssue, SchemaResult } from './schemaTypes.js'
import { z } from 'zod'
import { pageSchema } from '../global/globalTypes.js'

/**
 * Turn a dotted and bracketed path into something an editor can locate.
 *
 * @param {PropertyKey[]} path
 * @return {string}
 */
const getIssuePath = (path: PropertyKey[]): string => {
  if (!path.length) {
    return 'the page itself'
  }

  return path.reduce<string>((res, key) => {
    if (typeof key === 'number') {
      return `${res}[${key}]`
    }

    return res ? `${res}.${String(key)}` : String(key)
  }, '')
}

/**
 * Depth of the deepest path in a set of issues.
 *
 * @param {z.core.$ZodIssue[]} issues
 * @return {number}
 */
const getIssueDepth = (issues: z.core.$ZodIssue[]): number => {
  return issues.reduce((res, issue) => Math.max(res, issue.path.length), 0)
}

/**
 * Flatten issues into paths and messages, unwrapping a failed union to the
 * branch that got furthest.
 *
 * @param {z.core.$ZodIssue[]} issues
 * @param {PropertyKey[]} [prefix]
 * @return {SchemaIssue[]}
 */
const flattenIssues = (issues: z.core.$ZodIssue[], prefix: PropertyKey[] = []): SchemaIssue[] => {
  const res: SchemaIssue[] = []

  for (const issue of issues) {
    const path = [...prefix, ...issue.path]

    if (issue.code !== 'invalid_union') {
      res.push({
        path: getIssuePath(path),
        message: issue.message
      })

      continue
    }

    const branches = issue.errors
    let deepest: z.core.$ZodIssue[] | undefined

    for (const branch of branches) {
      if (!deepest || getIssueDepth(branch) > getIssueDepth(deepest)) {
        deepest = branch
      }
    }

    if (!deepest?.length) {
      res.push({
        path: getIssuePath(path),
        message: issue.message
      })

      continue
    }

    res.push(...flattenIssues(deepest, path))
  }

  return res
}

/**
 * Flatten a zod error into paths and messages.
 *
 * @param {z.ZodError} error
 * @return {SchemaIssue[]}
 */
const getSchemaIssues = (error: z.ZodError): SchemaIssue[] => {
  return flattenIssues(error.issues)
}

/**
 * Validate a page against the shared schema.
 *
 * @param {unknown} data
 * @return {SchemaResult}
 */
const parsePage = (data: unknown): SchemaResult => {
  const result = pageSchema.safeParse(data)

  if (result.success) {
    return {
      valid: true,
      page: result.data,
      issues: []
    }
  }

  return {
    valid: false,
    issues: getSchemaIssues(result.error)
  }
}

/**
 * Render issues as a list an editor can act on.
 *
 * @param {SchemaIssue[]} issues
 * @return {string}
 */
const getSchemaIssuesMessage = (issues: SchemaIssue[]): string => {
  return issues.map(issue => `  ${issue.path}: ${issue.message}`).join('\n')
}

export {
  getSchemaIssues,
  getSchemaIssuesMessage,
  parsePage
}
