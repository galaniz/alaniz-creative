# Image  

**<code>Image(props: ImageProps): string</code>**  

Output image.

## Parameters  
- **`props`** <code><a href="#imageprops">ImageProps</a></code> required

## Returns  

<code>string</code> HTMLDivElement|HTMLElement

## Types

### ImageArgs  

**Type:** <code>object</code>

#### Properties  
- **`image`** <code>RenderFile</code> optional  
- **`alt`** <code>string</code> optional  
- **`aspectRatio`** <code><a href="/src/config/README.md#configaspectratio">ConfigAspectRatio</a></code> optional  
- **`maxWidth`** <code>number</code> optional  
- **`viewportWidth`** <code>number</code> optional  
Default: `80`  
- **`sizes`** <code>string</code> optional  
- **`caption`** <code>RenderRichText[]</code> optional  
- **`lazy`** <code>boolean</code> optional  
Default: `true`  
- **`border`** <code>boolean</code> optional  
Default: `false`  
- **`borderRadius`** <code>&#39;rounded&#39; | &#39;full&#39; | &#39;none&#39;</code> optional  
Default: `'rounded'`  
- **`width`** <code><a href="/src/config/README.md#configsizes">ConfigSizes</a></code> optional  
- **`widthLarge`** <code><a href="/src/config/README.md#configsizes">ConfigSizes</a></code> optional  
- **`contain`** <code>boolean</code> optional  
Default: `false`  
- **`align`** <code>&#39;center&#39;</code> optional  
- **`classes`** <code>string</code> optional

### ImageProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#imageargs">ImageArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional