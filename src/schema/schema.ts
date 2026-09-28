/**
 * Schema
 */

import type { SchemaContent } from './schemaTypes.js'
import { z } from 'zod'
import { buttonSchema } from '../objects/Button/ButtonTypes.js'
import { imageSchema } from '../objects/Image/ImageTypes.js'
import { mediaSchema } from '../objects/Media/MediaTypes.js'
import { postsSchema } from '../objects/Posts/PostsTypes.js'
import { formSchema, formFieldSchema } from '../objects/Form/FormTypes.js'
import { richTextSchema } from '../text/RichText/RichTextTypes.js'
import { containerSchema } from '../layouts/Container/ContainerTypes.js'
import { columnSchema } from '../layouts/Column/ColumnTypes.js'
import { aspectRatioSchema } from '../layouts/AspectRatio/AspectRatioTypes.js'

/**
 * Layouts hold content, so container, column and aspect ratio import this list
 * while it imports them. Lazy delays reading it until every import has finished.
 */
const contentSchema: z.ZodType<SchemaContent> = z.lazy(() => z.discriminatedUnion('renderType', [
  containerSchema,
  columnSchema,
  aspectRatioSchema,
  richTextSchema,
  imageSchema,
  mediaSchema,
  buttonSchema,
  postsSchema,
  formSchema,
  formFieldSchema
]))

export { contentSchema }
