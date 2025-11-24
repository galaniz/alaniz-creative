/**
 * Filters
 */

/* Imports */

import type { Item } from '../global/globalTypes.js'
import type { Filters } from '@alanizcreative/formation-static/filters/filtersTypes.js'
import { RichTextProps, RichTextContentItem } from '../text/RichText/RichText.js'
import { Container } from '../layouts/Container/Container.js'
import { Column } from '../layouts/Column/Column.js'
import { Taxonomy } from '../components/Taxonomy/Taxonomy.js'
import { Term } from '../components/Term/Term.js'
import { Form } from '../objects/Form/Form.js'
import { FormField } from '../objects/Form/FormField.js'

/**
 * Filters to hook into.
 *
 * @type {Filters}
 */
const filters: Partial<Filters> = {
  richTextProps: RichTextProps,
  richTextContentItem: RichTextContentItem,
  containerProps: Container,
  columnProps: Column,
  formProps: Form,
  formFieldProps: FormField,
  renderItemData: (item: Item) => {
    if (item.contentType === 'term') {
      return Term(item)
    }

    if (item.contentType === 'taxonomy') {
      return Taxonomy(item)
    }

    return item
  }
}

/* Exports */

export { filters }
