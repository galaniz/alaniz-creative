# Button  

**<code>Button(props: ButtonProps): string</code>**  

Output link button.

## Parameters  
- **`props`** <code><a href="#buttonprops">ButtonProps</a></code> required

## Returns  

<code>string</code> HTMLAnchorElement|HTMLDivElement

## Types

### ButtonSchema  

**Type:** <code>object</code>

#### Properties  
- **`renderType`** <code>&#39;button&#39;</code> required  
- **`title`** <code>string</code> required  
- **`internalLink`** <code>string</code> optional  
- **`externalLink`** <code>string</code> optional  
- **`type`** <code>&#39;primary&#39; | &#39;secondary&#39;</code> optional  
Default: `'primary'`  
- **`size`** <code>&#39;m&#39; | &#39;l&#39;</code> optional  
Default: `'m'`  
- **`justify`** <code><a href="/src/config/README.md#configjustify">ConfigJustify</a></code> optional  
- **`richText`** <code>boolean</code> optional  
- **`paddingTop`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingBottom`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional

### ButtonArgs  

**Type:** <code>object</code>  

**Augments:** <code><a href="#buttonschema">ButtonSchema</a></code>

#### Properties  
- **`title`** <code>string</code> optional  
- **`internalLink`** <code>InternalLink</code> optional  
- **`link`** <code>string</code> optional  
- **`icon`** <code>string</code> optional

### ButtonProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#buttonargs">ButtonArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional