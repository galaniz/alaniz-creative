/**
 * Objects - Posts Types
 */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import { headingLevelOption } from '../../config/configTypes.js'

const postsOrderOption = z.enum([
  'date',
  'title'
])

const postsLayoutOption = z.enum([
  'text',
  'minimal',
  'alternate',
  'cascade'
])

export const postsSchema = z.object({
  renderType: z.literal('posts'),
  contentType: z
    .string()
    .describe('Content type to list, for example work.'),
  display: z
    .number()
    .int()
    .describe('How many items to show. Use -1 for all of them.'),
  order: postsOrderOption
    .optional()
    .describe('Sort order. Defaults to date, newest first.'),
  headingLevel: headingLevelOption
    .optional()
    .describe('Heading level for each card title. Pick the one that keeps the page outline correct.'),
  layout: postsLayoutOption
    .optional()
    .describe('How the list is arranged.')
})

/**
 * @typedef {object} PostsSchema
 * @prop {'posts'} renderType
 * @prop {string} contentType
 * @prop {number} display
 * @prop {PostsOrder} [order='date']
 * @prop {ConfigHeadingLevel} [headingLevel=3]
 * @prop {PostsLayout} [layout='minimal']
 */
export type PostsSchema = z.infer<typeof postsSchema>

/**
 * @typedef {'date'|'title'} PostsOrder
 */
export type PostsOrder = z.infer<typeof postsOrderOption>

/**
 * @typedef {'text'|'minimal'|'alternate'|'cascade'} PostsLayout
 */
export type PostsLayout = z.infer<typeof postsLayoutOption>

/**
 * @typedef {object} PostsArgs
 * @prop {string} [contentType]
 * @prop {number} [display=1]
 * @prop {PostsOrder} [order='date']
 * @prop {ConfigHeadingLevel} [headingLevel=3]
 * @prop {PostsLayout} [layout='minimal']
 */
export type PostsArgs = Partial<Omit<PostsSchema, 'renderType'>>

/**
 * @typedef {object} PostsProps
 * @extends {RenderFunctionArgs}
 * @prop {PostsArgs} args
 * @prop {Item} [itemData]
 */
export interface PostsProps extends RenderFunctionArgs {
  args: PostsArgs
  itemData?: Item
}
