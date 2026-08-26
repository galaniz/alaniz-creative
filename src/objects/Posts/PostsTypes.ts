/**
 * Objects - Posts Types
 */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import { headingLevelOption } from '../../config/configTypes.js'

/**
 * An automatic list of the most recent items of a content type.
 *
 * @type {z.ZodObject}
 */
export const postsSchema = z.object({
  renderType: z.literal('posts'),
  contentType: z
    .string()
    .describe('Content type to list, for example work.'),
  display: z
    .number()
    .int()
    .describe('How many items to show. Use -1 for all of them.'),
  order: z
    .enum(['date', 'title'])
    .optional()
    .describe('Sort order. Defaults to date, newest first.'),
  headingLevel: headingLevelOption
    .optional()
    .describe('Heading level for each card title. Pick the one that keeps the page outline correct.'),
  layout: z
    .enum(['text', 'minimal', 'alternate', 'cascade'])
    .optional()
    .describe('How the list is arranged.')
})

/**
 * @typedef {object} PostsSchema
 * @prop {'posts'} renderType
 * @prop {string} contentType
 * @prop {number} display
 * @prop {'date'|'title'} [order='date']
 * @prop {ConfigHeadingLevel} [headingLevel=3]
 * @prop {'text'|'minimal'|'alternate'|'cascade'} [layout='minimal']
 */
export type PostsSchema = z.infer<typeof postsSchema>

/**
 * @typedef {object} PostsArgs
 * @prop {string} [contentType]
 * @prop {number} [display=1]
 * @prop {'date'|'title'} [order='date']
 * @prop {ConfigHeadingLevel} [headingLevel=3]
 * @prop {'text'|'minimal'|'alternate'|'cascade'} [layout='minimal']
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
