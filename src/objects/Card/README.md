# Card

## CardMinimal  

**<code>CardMinimal(internalLink: Item, text?: string): string</code>**  

Output minimal card item.

### Parameters  
- **`internalLink`** <code><a href="/src/global/README.md#item">Item</a></code> required  
- **`text`** <code>string</code> optional

### Returns  

<code>string</code> HTMLLIElement

## CardMinimalContainer  

**<code>CardMinimalContainer(output: string): string</code>**  

Output minimal list container.

### Parameters  
- **`output`** <code>string</code> required

### Returns  

<code>string</code> HTMLUListElement

## Card  

**<code>Card(props: CardProps): string</code>**  

Output card item and content.

### Parameters  
- **`props`** <code><a href="#cardprops">CardProps</a></code> required

### Returns  

<code>string</code> HTMLLIElement

## CardContainer  

**<code>CardContainer(output: string, type?: CardType, classes?: string): string</code>**  

Output card list.

### Parameters  
- **`output`** <code>string</code> required  
- **`type`** <code><a href="#cardtype">CardType</a></code> optional  
Default: `'minimal'`  
- **`classes`** <code>string</code> optional

### Returns  

<code>string</code> HTMLUListElement

## Types

### CardType  

**Type:** <code>&#39;minimal&#39; | &#39;alternate&#39; | &#39;cascade&#39;</code>

### CardArgs  

**Type:** <code>object</code>

#### Properties  
- **`internalLink`** <code><a href="/src/global/README.md#item">Item</a></code> optional  
- **`headingLevel`** <code><a href="/src/config/README.md#configheadinglevel">ConfigHeadingLevel</a></code> optional  
Default: `3`  
- **`type`** <code><a href="#cardtype">CardType</a></code> optional  
Default: `'minimal'`  
- **`index`** <code>number</code> optional  
Default: `0`  
- **`length`** <code>number</code> optional  
Default: `1`

### CardProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#cardargs">CardArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional